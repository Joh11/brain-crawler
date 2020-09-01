import * as React from 'react';
import { ActivityIndicator, View, Text, Button, Switch, TextInput, FlatList, SectionList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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

    async function fetchData(query, url, setData, setLoading) {
	try {
	    let headers = {headers: {Authorization: 'Basic am9oYW46MDAwMA=='}};
	    let response = await fetch(url + '?search=' + query, headers);
	    let json = await response.json();

	    // Now grab all the results, and call the setter
	    // console.log(json);
	    if(json.results) {
		setData(json.results);
	    } else {
		console.log('Wrong results : ');
		console.log(json);
	    }

	    if (json.next) {
		// Do the same thing for the rest of the objects
		// fetchData(json.next, setter);
	    }
	    
	} catch (error) {
	    console.error(error);
	}

	setLoading(false);
    }

    function searchItemComponent(navigation, item) {
	return (
		<Button
	    title={item.title}
	    onPress={() => {navigation.navigate('Viewer', {partialNode: item})}}/>
	);
    }
    
    const [data, setData] = React.useState([]);
    const [isLoading, setLoading] = React.useState(true);
    
    React.useEffect(() => {
	fetchData(props.query, url, setData, setLoading);
    }, [props.query]);
    console.log(data);
    
    const navigation = useNavigation();
    
    return (<>
	    {isLoading ? (<ActivityIndicator/>) : (<></>)}
	    <FlatList
	    data={data}
	    keyExtractor={(item, index) => item.title}
	    renderItem={({item})=> searchItemComponent(navigation, item)}
	    />
	    </>);
}

export function SearchScreen({ navigation }) {
    const [query, setQuery] = React.useState('');

    React.useEffect(() => {
	navigation.setOptions({
	    headerRight: () => (
		    <SearchHeaderComponent
		autoFocus={true}
		value={query}
		onChangeText={text => {setQuery(text);}}
		    />
	    ),
	});
    });

    // If no query, display the search history
    // Else display the suggestions
    return (
	    <View style={styles.mainView}>
	    {
		(query == '') ?
		    (<></>)
		    : (<SearchResults query={query} />)
	    }
	</View>
    );
}

