import * as React from 'react';
import { View, Text, Button, Switch, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { styles } from './styles.js'

const Stack = createStackNavigator();

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
	    <Text>Je suis le graphe</Text>
	    </View>
    );
}

function SearchHeaderComponent(props) {
    return (
	    <TextInput
	style={styles.textInput}
	placeholder="Search"
	{...props}/>
    );
}

function SearchScreen({ navigation }) {
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
		    (<>
		     <Text>Search history</Text>
		     </>)
		    :
		    (<>
		     <Text>Suggestions</Text>
		     </>)
	    }
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
	    <Stack.Screen name="Search" component={SearchScreen} />
	    </Stack.Navigator>
    );
}
