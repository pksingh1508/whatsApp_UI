import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors';
import { useAuth } from '@clerk/clerk-expo';
import { defaultStyles } from '@/constants/Styles';
import BoxedIcon from '@/components/BoxedIcon';
import { Ionicons } from '@expo/vector-icons';

export default function Page() {
    const devices = [
        {
          name: 'Broadcast Lists',
          icon: 'megaphone',
          backgroundColor: Colors.green,
        },
        {
          name: 'Starred Messages',
          icon: 'star',
          backgroundColor: Colors.yellow,
        },
        {
          name: 'Linked Devices',
          icon: 'laptop-outline',
          backgroundColor: Colors.green,
        },
      ];
    
      const items = [
        {
          name: 'Account',
          icon: 'key',
          backgroundColor: Colors.primary,
        },
        {
          name: 'Privacy',
          icon: 'lock-closed',
          backgroundColor: '#33A5D1',
        },
        {
          name: 'Chats',
          icon: 'logo-whatsapp',
          backgroundColor: Colors.green,
        },
        {
          name: 'Notifications',
          icon: 'notifications',
          backgroundColor: Colors.red,
        },
        {
          name: 'Storage and Data',
          icon: 'repeat',
          backgroundColor: Colors.green,
        },
      ];
    
      const support = [
        {
          name: 'Help',
          icon: 'information',
          backgroundColor: Colors.primary,
        },
        {
          name: 'Tell a Friend',
          icon: 'heart',
          backgroundColor: Colors.red,
        },
      ];
      const { signOut } = useAuth();
      const onSignOut = () => {
        signOut();
      };

  return (
    <View style={{flex: 1, backgroundColor: Colors.background}}>
      <ScrollView
        contentInsetAdjustmentBehavior='automatic'
      >
        <View style={defaultStyles.block}>
            <FlatList 
                data={devices}
                scrollEnabled={false}
                ItemSeparatorComponent={() => <View style={defaultStyles.separator}/>}
                renderItem={({item}) => (
                    <View style={defaultStyles.item}>
                        <BoxedIcon name={item.icon} backgroundColor={item.backgroundColor}/>
                        <Text style={{fontSize: 18, flex: 1}}>{item.name}</Text>
                        <Ionicons name='chevron-forward' size={21} color={Colors.gray}/>
                    </View>
                )}
            />
        </View>

        <View style={defaultStyles.block}>
            <FlatList 
                data={items}
                scrollEnabled={false}
                ItemSeparatorComponent={() => <View style={defaultStyles.separator}/>}
                renderItem={({item}) => (
                    <View style={defaultStyles.item}>
                        <BoxedIcon name={item.icon} backgroundColor={item.backgroundColor}/>
                        <Text style={{fontSize: 18, flex: 1}}>{item.name}</Text>
                        <Ionicons name='chevron-forward' size={21} color={Colors.gray}/>
                    </View>
                )}
            />
        </View>

        <View style={defaultStyles.block}>
            <FlatList 
                data={support}
                scrollEnabled={false}
                ItemSeparatorComponent={() => <View style={defaultStyles.separator}/>}
                renderItem={({item}) => (
                    <View style={defaultStyles.item}>
                        <BoxedIcon name={item.icon} backgroundColor={item.backgroundColor}/>
                        <Text style={{fontSize: 18, flex: 1}}>{item.name}</Text>
                        <Ionicons name='chevron-forward' size={21} color={Colors.gray}/>
                    </View>
                )}
            />
        </View>

        <TouchableOpacity onPress={onSignOut}>
            <Text style={{
                color: Colors.primary,
                fontSize: 18,
                textAlign: 'center',
                paddingVertical: 14,
                marginTop: 6
            }}>
                Log Out
            </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({})