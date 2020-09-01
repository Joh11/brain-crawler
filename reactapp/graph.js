import * as React from 'react';
import { View, Text, Button, Switch, TextInput, FlatList, SectionList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GLView } from 'expo-gl';


import { styles } from './styles.js'
import { SearchHeaderComponent, SearchScreen } from './search.js'
import { ViewerScreen } from './viewer.js'

const Stack = createStackNavigator();

function GraphView(props) {
    function onContextCreate(gl) {
	const vertSrc = `
attribute vec2 position;
varying vec2 uv;
void main() {
  gl_Position = vec4(position.x, -position.y, 0.0, 1.0);
  uv = vec2(0.5, 0.5) * (position+vec2(1.0, 1.0));
}`;
	const fragSrc = `
precision highp float;
varying vec2 uv;
void main () {
  gl_FragColor = vec4(uv.x, uv.y, 0.5, 1.0);
}`;

	// Compile vertex and fragment shader
	const vert = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vert, vertSrc);
	gl.compileShader(vert);
	const frag = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(frag, fragSrc);
	gl.compileShader(frag);

	// Link together into a program
	const program = gl.createProgram();
	gl.attachShader(program, vert);
	gl.attachShader(program, frag);
	gl.linkProgram(program);

	// Save position attribute
	const positionAttrib = gl.getAttribLocation(program, 'position');

	// Create buffer
	const buffer = gl.createBuffer();
	
	function animate(now) {
	    try {
		// Clear
		gl.clearColor(0, 0, 1, 1);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		
		// Bind buffer, program and position attribute for use
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.useProgram(program);
		gl.enableVertexAttribArray(positionAttrib);
		gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);

		// Buffer data and draw!
		const speed = props.speed || 0.5;
		const a = 0.48 * Math.sin(0.001 * speed * now) + 0.5;
		const verts = new Float32Array([-a, -a, a, -a, -a, a, -a, a, a, -a, a, a]);
		gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
		gl.drawArrays(gl.TRIANGLES, 0, verts.length / 2);

		// Submit frame
		gl.flush();
		gl.endFrameEXP();
	    } finally {
		gl.enableLogging = false;
		requestAnimationFrame(animate);
	    }
	};
	animate();
    }
    
    return (<View>
	    <Text>Je suis le graphe</Text>
	    <GLView style={{width: 300, height: 300}}
	    onContextCreate={onContextCreate} />
	    </View>);
}

function MainGraphScreen({ navigation }) {
    React.useEffect(() => {
	navigation.setOptions({
	    headerRight: () => (
		    <SearchHeaderComponent
		onFocus={() => navigation.navigate('Search')}/>
	    ),
	});
    });

    return (
	    <View style={styles.mainView}>
	    <GraphView />
	    </View>
    );
}

export function GraphScreen() {
    return (
	    <Stack.Navigator>
	    <Stack.Screen name="Main" component={MainGraphScreen}
	options={({route, navigation}) => ({headerTitle: "",
					    route: {route},
					    navigation: {navigation}})} />
	    <Stack.Screen name="Search" component={SearchScreen} options={{headerTitle: ""}} />
	    <Stack.Screen name="Viewer" component={ViewerScreen} options={{headerTitle: ""}} />
	    </Stack.Navigator>
    );
}
