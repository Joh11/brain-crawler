import * as React from 'react';
import { View, Text, Button, Switch, TextInput, FlatList, SectionList } from 'react-native';

import { styles } from './styles.js'

export function SearchHeaderComponent(props) {
    return (
	    <TextInput
	style={styles.searchHeader}
	placeholder="Search"
	{...props}/>
    );
}

// Use the query props to put in the query
function SearchResults(props) {
    const url = 'http://127.0.0.1:8000/api/nodes/';
    const username = 'johan';
    const password = '0000';

    const [req, setReq] = React.useState({});

    // fetch(url, {headers: {Authorization: 'Basic am9oYW46MDAwMA=='}})
    // 	.then((response) => {
    // 	    let json = response.json()
    // 	    setReq(json);
    // 	})
    // 	.catch((error) => {console.error(error); });

    const data = ['Michel Atyiah', props.query, 'Dark Vador', 'Gandalf'];

    function itemComponent({ item }) {
	return (
		<Text>{item.key}</Text>
	);
    }
    
    return (<FlatList
	    data={data.map((item) => ({key: item}))}
	    renderItem={itemComponent}
	    />);
}

function SearchHistory() {
    const data = ['Dark Vador', 'Gandalf', 'Why is the Earth flat', 'Au revoir. '];

    function itemComponent({ item }) {
	return (
		<View>
		<Text>{item}</Text>
		<Button title="x"/>
		</View>
	);
    }
    
    return (<SectionList
	    sections={[{title: 'Search history', data: data}]}
	    renderItem={itemComponent}
	    renderSectionHeader={({section}) => <Text>{section.title}</Text>}
	    />);
}

export function SearchScreen({ navigation }) {
    const [query, setQuery] = React.useState('');

    React.useEffect(() => {
	navigation.setOptions({
	    headerRight: () => (
		    <SearchHeaderComponent
		autoFocus={true}
		value={query}
		onChangeText={text => setQuery(text)}/>
	    ),
	});
    });

    // If no query, display the search history
    // Else display the suggestions
    return (
	    <View style={styles.mainView}>
	    {
		(query == '') ?
		    (<SearchHistory />)
		    : (<SearchResults query={query} />)
	    }
	</View>
    );
}

