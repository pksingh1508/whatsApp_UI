import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

export type BoxedIconProps = {
    name: typeof Ionicons.defaultProps;
    backgroundColor: string;
}

export default function BoxedIcon({name, backgroundColor}: BoxedIconProps) {
  return (
    <View style={{backgroundColor, padding: 4, borderRadius: 6}}>
      <Ionicons name={name} size={20} color={'white'}/>
    </View>
  )
}

const styles = StyleSheet.create({});