import { StyleSheet, TouchableOpacity, Text } from "react-native"
import React, { Component } from 'react'
import PropTypes from 'prop-types'


class RandomNumber extends Component {
    static propTypes = {
        number: PropTypes.number.isRequired,
        isDisabled: PropTypes.bool.isRequired,
        onPress: PropTypes.func.isRequired,
        id: PropTypes.number.isRequired,
    }
    handlePress = () => {
        if(this.props.isDisabled) {return;}
        this.props.onPress(this.props.id);
    }

    render() {
        return(
            <TouchableOpacity onPress={this.handlePress}>
                <Text style={[styles.random, this.props.isDisabled && styles.selected]}>
                    {this.props.number}
                </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    random: {
        backgroundColor: '#999',
        width: 100,
        marginHorizontal: 20,
        fontSize: 35,
        marginVertical: 35,
        textAlign: 'center',
    },
    selected: {
        opacity: 0.3,
    }
})

export default RandomNumber;