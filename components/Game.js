import { StyleSheet, View, Text, Button } from "react-native"
import { StatusBar } from 'expo-status-bar'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RandomNumber from './RandomNumber'
import shuffle from 'lodash.shuffle';
import ProgressBar from 'react-native-progress/Bar';
//import * as Progress from 'react-native-progress';

class Game extends Component {
    static propTypes = {
        randomNumberCount: PropTypes.number.isRequired,
        initialSeconds: PropTypes.number.isRequired,
        onPlayAgain: PropTypes.func.isRequired,
    }

    state = {
        selectedIds: [],
        remainingSeconds: this.props.initialSeconds,
    }

    gameStatus = 'PLAYING';
    randomNumbers = Array
                    .from({ length: this.props.randomNumberCount })
                    .map(() => 1 + Math.floor(10*Math.random()))

    target = this.randomNumbers
                 .slice(0, this.props.randomNumberCount-2)
                 .reduce((acc, curr) => acc + curr, 0);

    shuffledRandomNumbers = shuffle(this.randomNumbers);

    isNumberSelected = (numberIndex) => {
        return this.state.selectedIds.indexOf(numberIndex) >= 0;
    }

    selectNumber = (numberIndex) => {
        this.setState((prevState) => ({
            selectedIds: [...prevState.selectedIds, numberIndex],
        }))
    }

    UNSAFE_componentWillUpdate(nextProps, nextState) {
        if(nextState.selectedIds !== this.state.selectedIds || nextState.remainingSeconds === 0){
            this.gameStatus = this.calcGameStatus(nextState);
        }
        if(this.gameStatus!=='PLAYING'){
            clearInterval(this.intervalId);
        }
    }

    //gameStatus: PLAYING, WON, LOST
    calcGameStatus = (nextState) => {
        const sumSelected = nextState.selectedIds.reduce((acc, curr) => {
            return acc + this.shuffledRandomNumbers[curr];
        }, 0)
        if(nextState.remainingSeconds === 0){
            return 'LOST';
        }
        if(sumSelected<this.target){
            return 'PLAYING';
        }
        if(sumSelected==this.target){
            return 'WON';
        }
        if(sumSelected>this.target) {
            return 'LOST';
        }
    }

    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.setState((prevState) => {
                return {remainingSeconds: prevState.remainingSeconds-1};
            }, () => {
                if(this.state.remainingSeconds === 0){
                    clearInterval(this.intervalId);
                }
            })
        }, 1000);
    }

    componentWillUnMount() {
        clearInterval(this.intervalId);
    }


    render() {
        const gameStatus = this.gameStatus;
        return (
            <View style={styles.container}>
                <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>{this.target}</Text>
                <View style={styles.randomContainer}>
                    {this.shuffledRandomNumbers.map((randomNumber, index) => 
                        <RandomNumber 
                        key={index} 
                        id={index}
                        number={randomNumber}
                        isDisabled={this.isNumberSelected(index) || gameStatus !== 'PLAYING'}
                        onPress={this.selectNumber}/>
                    )}
                </View>
                {this.gameStatus!=='PLAYING' &&  
                (<Button 
                title="Play Again"
                onPress={this.props.onPlayAgain}/>)}
                <Text style={styles.target}>{this.state.remainingSeconds}</Text>
                <ProgressBar progress={this.state.remainingSeconds} width={null} useNativeDriver={true}/>
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
      marginBottom: 35, 
      marginTop: 120,
      textAlign: 'center',  
    },
    randomContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    STATUS_PLAYING: {
        backgroundColor: '#bbb',
    },
    STATUS_WON: {
        backgroundColor: 'green',
    },
    STATUS_LOST: {
        backgroundColor: 'red',
    }
})

export default Game;