import React from 'react';
import {Animated, ScrollView, StyleSheet, View} from 'react-native';


const HEADER_MIN_HEIGHT = 60;
const HEADER_MAX_HEIGHT = 160;
const ROOT_CHILDREN_HEIGHT = 60;

export default class AnimatedHeaderScrollView extends React.Component {

    data = {
        scrollY: new Animated.Value(0),
    };

    constructor(props) {
        super(props);

        this.conf = {
            headerMaxHeight: this.props.headerMaxHeight || HEADER_MAX_HEIGHT,
            headerMinHeight: this.props.headerMinHeight || HEADER_MIN_HEIGHT,
            rootChildrenHeight: this.props.rootChildrenHeight || ROOT_CHILDREN_HEIGHT,
        };
        this.conf.headerScrollDistance = this.conf.headerMaxHeight - this.conf.headerMinHeight;

        let {scrollY} = this.data;
        this.headerY = scrollY.interpolate({
            inputRange: [0, this.conf.headerScrollDistance],
            outputRange: [0, -this.conf.headerScrollDistance],
            extrapolate: 'clamp',
        });
        this.controlsY = scrollY.interpolate({
            inputRange: [0, this.conf.headerScrollDistance],
            outputRange: [
                this.conf.headerMaxHeight - this.conf.rootChildrenHeight / 2,
                this.conf.headerMinHeight - this.conf.rootChildrenHeight / 2
            ],
            extrapolate: 'clamp',
        });
    }

    getScroll() {
        return this.data.scrollY;
    }

    getConfig() {
        return this.conf;
    }

    render() {
        let {onScroll} = this.props;
        let {scrollY} = this.data;

        return (<View style={styles.container}>
            <Animated.ScrollView style={styles.container}
                                 scrollEventThrottle={1}
                                 onScroll={Animated.event(
                                     [{nativeEvent: {contentOffset: {y: scrollY}}}],
                                     {useNativeDriver: true}
                                     // {listener: () => onScroll ? onScroll() : null}
                                 )}>
                <View style={{height: this.conf.headerMaxHeight}}/>
                {this.props.children}
            </Animated.ScrollView>
            <Animated.View style={[styles.resizingHeader,
                {height: this.conf.headerMaxHeight, transform: [{translateY: this.headerY}]}]}>
            </Animated.View>
            <View style={[styles.headerChildren, {height: this.conf.headerMaxHeight}]}>
                {this.props.headerChildren}
            </View>
            <Animated.View style={[styles.floatingControls, {transform: [{translateY: this.controlsY}]}]}>
                {this.props.rootChildren}
            </Animated.View>
        </View>);
    }
}

const styles = StyleSheet.create({
    container: {flex: 1},
    resizingHeader: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,

        backgroundColor: '#48e',
        elevation: 10,
    },
    headerChildren: {
        position: 'absolute',
        left: 0, right: 0,

        elevation: 11,
    },
    floatingControls: {
        position: 'absolute',
        left: 0, right: 0,

        elevation: 12,
    },
});
