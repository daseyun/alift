import React from 'react';
import { ScrollView, StyleSheet, View,Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class LinksScreen extends React.Component {
    static navigationOptions = {
        title: 'Programs',
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                {/* Go ahead and delete ExpoLinksView and replace it with your
                * content, we just wanted to provide you with some helpful links */}
                <ExpoLinksView />
                <View>
                    <Text>
                        Signed in?
                    </Text>
                </View>
            </ScrollView>
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff'
    },
});