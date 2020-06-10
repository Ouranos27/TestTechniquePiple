import React, { Component } from 'react';
import {Animated, PanResponder, StyleSheet, Text, View} from "react-native";

export default class App extends Component {
    pan = new Animated.ValueXY();
    panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            this.pan.setOffset({
                x: this.pan.x._value,
                y: this.pan.y._value
            });
            this.pan.setValue({x: 0, y: 0});
        },
        onPanResponderMove: Animated.event([
            null,
            {dx: this.pan.x, dy: this.pan.y}
        ]),
        onPanResponderRelease: () => {
            //this.pan.flattenOffset();
            Animated.spring(this.pan, {
                toValue: 0,
                tension: 8,
                friction: 3
            }).start();
        }
    });

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>This is a cube. Drag it arround!</Text>x
                <Animated.View
                    style={{
                        transform: [{ translateX: this.pan.x }, { translateY: this.pan.y }]
                    }}
                    {...this.panResponder.panHandlers}
                >
                    <View style={styles.box} />
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontSize: 20,
        lineHeight: 24,
    },
    box: {
        height: 75,
        width: 75,
        backgroundColor: "darkmagenta",
        borderRadius: 20,
    }
});

