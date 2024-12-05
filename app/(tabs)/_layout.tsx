import React from 'react'
import { Tabs } from 'expo-router';
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const TabLayout = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
        <Tabs 
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: Colors.background
                },
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveBackgroundColor: Colors.background,
                tabBarActiveBackgroundColor: Colors.background,
                headerStyle: {
                    backgroundColor: Colors.background
                },
                headerShadowVisible: false,
                headerTitleAlign: 'center'
            }}
        >
            <Tabs.Screen 
                name='updates'
                options={{
                    title: 'Updates',
                    tabBarIcon: ({size, color}) => (
                        <MaterialIcons name='update' size={size} color={color}/>
                    )
                }}
            />
            <Tabs.Screen 
                name='calls'
                options={{
                    title: 'Calls',
                    headerShown: false,
                    tabBarIcon: ({size, color}) => (
                        <MaterialCommunityIcons name='phone-outline' size={size} color={color}/>
                    )
                }}
            />
            <Tabs.Screen 
                name='communities'
                options={{
                    title: 'Community',
                    tabBarIcon: ({size, color}) => (
                        <MaterialIcons name='people' size={size} color={color}/>
                    )
                }}
            />
            <Tabs.Screen 
                name='chat'
                options={{
                    title: 'Chats',
                    tabBarIcon: ({size, color}) => (
                        <Ionicons name='chatbubbles' size={size} color={color}/>
                    )
                }}
            />
            <Tabs.Screen 
                name='settings'
                options={{
                    title: 'Settings',
                    headerShown: false,
                    tabBarIcon: ({size, color}) => (
                        <Ionicons name='cog' size={size} color={color}/>
                    )
                }}
            />
        </Tabs>
    </GestureHandlerRootView>
  )
}

export default TabLayout;