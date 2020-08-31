import * as React from 'react';
import { StyleSheet, View, Text, Button, Switch, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { SettingsScreen } from './settings.js'
import { styles } from './styles.js'

function GraphScreen() {
    return (
	    <View style={styles.mainView}>
	    <TextInput style={styles.textInput} placeholder="Search" editable={false} />
	    </View>
    );
}


const Tab = createBottomTabNavigator();

function App() {
    return (
	    <NavigationContainer>
	    <Tab.Navigator>
	    <Tab.Screen name="Graph" component={GraphScreen} />
	    <Tab.Screen name="Settings" component={SettingsScreen} />
	    </Tab.Navigator>
	    </NavigationContainer>
    );
}

export default App;
