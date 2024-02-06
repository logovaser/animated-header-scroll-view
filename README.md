# Animated header ScrollView

### IN DEVELOPMENT.

Built on `<Animated>` using `useNativeDriver=true`, runs on 60fps, so it's very smooth, comparing to regular Animated.
Works, but has funky boilerplate (I'm working on it). Check out the example (gif is only 25fps).

![alt text](https://raw.githubusercontent.com/logovaser/animated-header-scroll-view/master/readme/demo.gif)


### Props:

| Prop name | Description                    |
| ------------- | ------------------------------ |
| headerChildren | contents placed into the header |
| rootChildren | contents placed below the header (suitable for some buttons) |
| `onScroll()`   | integrated ScrollView `onScroll()` callback |
| headerMaxHeight | as name says |
| headerMinHeight | as name says |
| rootChildrenHeight | as name says |


### Basic example
```jsx
import AnimatedHeaderScrollView from 'react-native-animated-header-scroll-view'

//
// your component code here
//

render() {
    let headerChildren = <Text>Hello, World!</Text>;
    
    return (<AnimatedHeaderScrollView headerChildren={headerChildren}>
        // your list contents here
    </AnimatedHeaderScrollView>)

```

### Extended example
Just to show all functionaliy. Much rubbish code here, sorry. I'll update it later.
```jsx
import React from 'react';
import {Animated, StyleSheet, View} from 'react-native';

import * as styles from "../@styles";
import * as colors from "../tools/colors";
import AnimatedHeaderScrollView from 'react-native-animated-header-scroll-view'
import DwText from "../comp/DwText";
import Icon from "react-native-vector-icons/Ionicons";
import CircleButton from "../comp/CircleButton";
import Avatar from "../comp/Avatar";


const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

export default class Profile extends React.Component {

    data = {};
    state = {
        controlsOpacity: 1,
        headerX: 20,
        headerY: 20,
    };

    constructor(props) {
        super(props);
    }

    getScroll(elem) {
        if (this.data.scroll || !elem) return;
        let conf = elem.getConfig();
        let scroll = elem.getScroll();
        this.data.scroll = scroll;

        this.setState({
            controlsOpacity: scroll.interpolate({
                inputRange: [0, conf.headerScrollDistance],
                outputRange: [1, 0],
                extrapolate: 'clamp',
            }),
            headerX: scroll.interpolate({
                inputRange: [0, conf.headerScrollDistance],
                outputRange: [20, 60],
                extrapolate: 'clamp',
            }),
            headerY: scroll.interpolate({
                inputRange: [0, conf.headerScrollDistance],
                outputRange: [80, 5],
                extrapolate: 'clamp',
            }),
        });
    }

    render() {
        let headerChildren = <Animated.View style={[_styles.header, {
            transform: [{translateX: this.state.headerX}, {translateY: this.state.headerY}]
        }]}>
            <Avatar size={50} name='Lol Prudnikov' style={_styles.avatar}/>
            <View>
                <DwText style={_styles.white}>Lol Prudnikov</DwText>
                <DwText style={[_styles.hintText, _styles.white]}>kek barakek</DwText>
            </View>
        </Animated.View>;
                
        let rootChildren = <Animated.View style={[
            _styles.headerControls,
            {opacity: this.state.controlsOpacity}
        ]}>
            <CircleButton>
                <Icon name="md-create"/>
            </CircleButton>
        </Animated.View>;

        return (<AnimatedHeaderScrollView
            style={_styles.container}
            ref={elem => this.getScroll(elem)}
            headerChildren={headerChildren}
            rootChildren={rootChildren}
        >
            <View style={_styles.section}>
                <DwText style={_styles.sectionLabel}>
                    Registration page
                </DwText>
                {arr.map(num =>
                    <View key={num} style={_styles.formGroup}>
                        <DwText>Some button</DwText>
                        <DwText style={[_styles.hintText]}>
                            enter some data about yourself
                        </DwText>
                    </View>
                )}
            </View>
        </AnimatedHeaderScrollView>);
    }
}

const _styles = StyleSheet.create({
    container: styles.container,
    section: styles.section,
    sectionLabel: styles.sectionLabel,
    formGroup: styles.formGroup,
    hintText: styles.hintText,
    headerControls: {
        ...styles.spacing('px'),
        alignItems: 'flex-end',
    },
    header: {
        flexDirection: 'row',
    },
    avatar: {
        ...styles.spacing('mr'),
    },
    white: {
        color: colors.Light,
    },
});
```



