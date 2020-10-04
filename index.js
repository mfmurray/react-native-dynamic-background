import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Animated } from 'react-native';

export const DynamicBackground = (props) => {

  const [background1, setBackground1] = useState(props.colors[0]);
  const [background2, setBackground2] = useState(props.colors[1]);
  const [refreshCounter, setRefreshCounter] = useState(0);

  const opacityX = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    if (props.colors.length>1) {
      const interval = changeOpacity()

      return () => {
        clearInterval(interval);
      };
    }
  }, [refreshCounter]);


  function changeOpacity() {
    var array = Array.from(Array(props.colors.length-1).keys())
    array.unshift(props.colors.length-1)

    var stateColor = array[refreshCounter]
    var stateColor2 = array[refreshCounter+1]
    if (refreshCounter>props.colors.length-2) {
      stateColor2= array[0]
    }

    Animated.timing(opacityX, {toValue: 0, duration: props.speed, useNativeDriver: true}).start(() => {
      setBackground1(props.colors[stateColor])
      Animated.timing(opacityX, {toValue: 100, duration: props.speed, useNativeDriver: true}).start(() => {
        setBackground2(props.colors[stateColor2])
        if (refreshCounter==(props.colors.length-1))
          setRefreshCounter(0)
        else {
          setRefreshCounter(refreshCounter+1)
        }
      })

    });

  }

  const opacityOut = opacityX.interpolate({inputRange: [0, 100],outputRange: [0, 1],extrapolate: 'clamp'})

  return (

    <View style={{ position:'absolute', top:0, left:0, right:0, bottom:0}}>
      <Animated.View style={{ position:'absolute', top:0, left:0, right:0, bottom:0,
        backgroundColor:background2}}>
      </Animated.View>

      <Animated.View style={{ position:'absolute', top:0, left:0, right:0, bottom:0,
        backgroundColor:background1, opacity:opacityOut}}>
      </Animated.View>
    </View>
  );
}
