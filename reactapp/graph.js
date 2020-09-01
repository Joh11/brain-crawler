import * as React from 'react';
import { View, Text, Button, Switch, TextInput, FlatList, SectionList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GLView } from 'expo-gl';


import { styles } from './styles.js'
import { SearchHeaderComponent, SearchScreen } from './search.js'
import { ViewerScreen } from './viewer.js'

const Stack = createStackNavigator();

function GraphView() {
    function onContextCreate(gl) {
	const vertSrc = `
void main(void) {
  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
  gl_PointSize = 100.0;
}
`;
	const fragSrc = `
void main(void) {
  gl_FragColor = vec4(1.0,0.0,0.0,1.0);
}
`;

	gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
	gl.clearColor(0, 0, 1, 1);
	
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
	gl.useProgram(program);


	function render(now) {
	    gl.clear(gl.COLOR_BUFFER_BIT);
	    gl.drawArrays(gl.POINTS, 0, 1);
	    gl.flush();
	gl.endFrameEXP();
	}

	render(0);
	requestAnimationFrame(render);
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
