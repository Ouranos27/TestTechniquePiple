import React, {Component} from 'react';
import {Animated, PanResponder, StyleSheet, Text, View, Dimensions} from "react-native";
import Svg, {Path} from 'react-native-svg'
import {BoxShadow} from 'react-native-shadow'

export default class App extends Component {
    midWidth = Dimensions.get("window").width / 2;
    midHeight = Dimensions.get("window").height / 2;
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
        const shadowOpt = {
            width: 80,
            height: 80,
            color:"#000",
            border:2,
            radius:20,
            opacity:0.15,
            x:-2,
            y:0,
            style:{marginVertical:5}
        }
        return (
            <View style={styles.container}>
                <Text style={styles.text}>This is a cube. Drag it arround!</Text>
                <Svg width="24" height="24">
                    <Path
                        d="M11 21.883l-6.235-7.527-.765.644 7.521 9 7.479-9-.764-.645-6.236 7.529v-21.884h-1v21.883z"
                        fill="none"
                        stroke="grey"
                    />
                </Svg>
                <Animated.View
                    style={{
                        transform: [{ translateX: this.pan.x }, { translateY: this.pan.y }]
                    }}
                    {...this.panResponder.panHandlers}
                >
                    <BoxShadow setting={shadowOpt}>
                        <View style={styles.box}/>
                    </BoxShadow>
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
        color: "grey"
    },
    box: {
        height: 75,
        width: 75,
        backgroundColor: "darkmagenta",
        borderRadius: 20,
    }
});

