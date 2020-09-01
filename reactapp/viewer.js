import * as React from 'react';
import { View, Text, Button, Switch, ActivityIndicator, FlatList, SectionList } from 'react-native';

export function ViewerScreen({ route, navigation }) {
    // Only info that the list API call can retrieve, but good enough
    // before the rest is fetched
    const [node, setNode] = React.useState(route.params.partialNode);

    // Change the title
    React.useLayoutEffect(() => {
	navigation.setOptions({headerTitle: node.title});
    });
    
    // Retrieve the full node infos
    React.useEffect(() => { // Ugly trick to make sure the async
			    // function does not return anything
	(async () => {
	    // If already loaded, do nothing
	    if (node.content) {
		return;
	    }

	    
	    let headers = {headers: {Authorization: 'Basic am9oYW46MDAwMA=='}};
	    let response = await fetch(node.url, headers);
	    let json = await response.json();

	    setNode((oldNode) => ({...oldNode, ...json}));
	})();}
		   );
    
    return (
	    <View>
	    {node.content ?
	     (
		     <Text>{node.content}</Text>
	     ) : (
		     <ActivityIndicator/>
	     )}
	</View>
    );
}
