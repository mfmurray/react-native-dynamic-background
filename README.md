# react-native-dynamic-background

Create a dynamic backgroud with an infinite amount of colors


# Installing
npm i react-native-dynamic-background

# API
#### Example ####
```js
// in style.js

import { StyleSheet } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper'

export default StyleSheet.create({
    header:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding:10,
        height: 60,
        backgroundColor: 'transparent',
        ...ifIphoneX({
            paddingTop: 50
        }, {
            paddingTop: 20
        })
    },
});
```

![](gif.gif)
