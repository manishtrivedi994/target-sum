import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Game from './components/Game'

class App extends Component {
  state = {
    gameId: 1,
  }

  resetGame = () => {
    this.setState((prevState) => {
      return {gameId: prevState.gameId+1};
    })
  }

  render(){
    return (
      <View style={styles.container}>
        <Game key={this.state.gameId} 
              onPlayAgain={this.resetGame}
              randomNumberCount={6}
              initialSeconds={10}/>
        <StatusBar style='auto'/>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: 'blue',

  },
});

export default App;