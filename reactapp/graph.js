import * as React from 'react';
import { View, Text, Button, Switch, TextInput, FlatList, SectionList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { styles } from './styles.js'
import { SearchHeaderComponent, SearchScreen } from './search.js'
import { ViewerScreen } from './viewer.js'

const Stack = createStackNavigator();

function GraphView(props) {
    return (
	    <Text>
	    Bonjour
	    </Text>);
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
