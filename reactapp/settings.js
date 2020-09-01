import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text, Button, Switch, TextInput } from 'react-native';

import { styles } from './styles.js'

function CustomPortComponent() {
    const [customPort, setCustomPort] = useState(false);
    const toggleCustomPort = () => {setCustomPort(port => !port)}
    return (
	    <>
	    <Text>Custom Port</Text>
	    <Switch value={customPort} onValueChange={toggleCustomPort}/>
	    {customPort ? (<TextInput style={styles.textInput} keyboardType="numeric" />) : (<></>)}
	    </>
    );
}

export function SettingsScreen() {
    return (
	    <View style={styles.mainView}>
	    <View>
	    <Text>Account</Text>
	    <Text>Logged in as ...</Text>
	    <Button title="Log out" />
	    </View>

	    <View>
	    <Text>Server</Text>
	    <Text>URL</Text>
	    <TextInput style={styles.textInput} textContentType="URL"/>
	    <CustomPortComponent />
	    </View>
	    </View>
    );
}
