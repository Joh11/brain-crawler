// Utility functions to use the Canvas API

// Taken from https://gist.github.com/bgrayburn/44fa018b94222590f618
function wrapWord(long_string, max_char){
    var sum_length_of_words = function(word_array){
	var out = 0;
	if (word_array.length!=0){
	    for (var i=0; i<word_array.length; i++){
		var word = word_array[i];
		out = out + word.length;
	    }
	};
	return out;
    };


    var chunkString = function (str, length){
	return str.match(new RegExp('.{1,' + length + '}', 'g'));
    };

    var splitLongWord = function (word, maxChar){
	var out = [];
	if( maxChar >= 1){
	    var wordArray = chunkString(word, maxChar-1);// just one under maxChar in order to add the innerword separator '-'
	    if(wordArray.length >= 1){
		// Add every piece of word but the last, concatenated with '-' at the end
		for(var i=0; i<(wordArray.length-1); i++){
		    var piece = wordArray[i] + "-";
		    out.push(piece);
		}
		// finally, add the last piece
		out.push(wordArray[wordArray.length-1]);
	    }
	}
	// If nothing done, just use the same word
	if(out.length == 0) {
	    out.push(word);
	}
	return out;
    }

    var split_out = [[]];
    var split_string = long_string.split(' ');
    for(var i=0; i<split_string.length; i++){
	var word = split_string[i];

	// If the word itself exceed the max length, split it,
	if(word.length > max_char){
	    var wordPieces = splitLongWord(word, max_char);
	    for(var i=0;i<wordPieces.length;i++){
		var wordPiece = wordPieces[i];
		split_out = split_out.concat([[]]);
		split_out[split_out.length-1] = split_out[split_out.length-1].concat(wordPiece);
	    }

	} else {
	    // otherwise add it if possible
	    if ((sum_length_of_words(split_out[split_out.length-1]) + word.length) > max_char){
		split_out = split_out.concat([[]]);
	    }

	    split_out[split_out.length-1] = split_out[split_out.length-1].concat(word);
	}
    }

    for (var i=0; i<split_out.length; i++){
	split_out[i] = split_out[i].join(" ");
    }

    return split_out.join('\n');
};

// Add newlines when necessary ; if too long, crop it and add
// "..."
function prepareText(text) {
    const maxLength = 100;
    if (text.length > maxLength) {
	text = text.substring(0, maxLength) + "...";
    }
    return wrapWord(text, 20);
}


export function improveContext(ctx) {
    ctx.fillCircle = (x, y, radius) => {
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2 * Math.PI);
	ctx.fill();
    };

    ctx.strokeCircle = (x, y, radius) => {
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2 * Math.PI);
	ctx.stroke();
    };

    ctx.fillTextMultiline = (text, x, y) => {
	const lines = text.split('\n');
	const lineHeight = 15;

	for (var i = 0; i<lines.length; i++)
	    ctx.fillText(lines[i], x, y + (i*lineHeight));
    }

    ctx.drawNode = (x, y, text, color) => {
	ctx.fillStyle = color;
	ctx.fillCircle(x, y, 10);

	ctx.strokeStyle = 'black';
	ctx.strokeCircle(x, y, 10);

	ctx.textAlign = 'center';
	ctx.fillStyle = 'black';
	ctx.fillTextMultiline(prepareText(text), x, y+20);
    };
}
