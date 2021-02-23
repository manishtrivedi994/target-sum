import { StyleSheet, View, Text } from "react-native"
import { StatusBar } from 'expo-status-bar'
import React, { Component } from 'react'

class Game extends Component {
    target = 10 + Math.floor(40*Math.random());
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.target}>{this.target}</Text>
                <StatusBar style='auto'/>
            </View> 
        );
    }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ddd',
        flex: 1,
    },
    target: {
      fontSize: 40,
      backgroundColor: '#aaa',
      marginHorizontal: 50,
      marginTop: 100,
      textAlign: 'center',  
    },
})

export default Game;