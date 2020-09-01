import * as React from 'react';
import { StyleSheet, View, Text, Button, Switch, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { SettingsScreen } from './settings.js'
import { GraphScreen } from './graph.js'
import { styles } from './styles.js'

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
