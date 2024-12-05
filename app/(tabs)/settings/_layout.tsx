import React from 'react'
import { Stack } from 'expo-router';
import Colors from '@/constants/Colors';

const Layout = () => {
  return (
    <Stack 
        screenOptions={{
            headerTitleAlign: 'center'
        }}
    >
        <Stack.Screen 
            name='index'
            options={{
                title: 'Settings',
                headerLargeTitle: true,
                headerShadowVisible: false,
                headerBlurEffect: 'regular',
                headerStyle: {backgroundColor: Colors.background},
                headerSearchBarOptions: {
                    placeholder: 'Search'
                }
            }}
        />
    </Stack>
  )
}

export default Layout;