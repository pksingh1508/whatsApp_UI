import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors';
import calls from '@/assets/data/calls.json'
import { defaultStyles } from '@/constants/Styles';
import { format } from 'date-fns'
import { SegmentedControl } from '@/components/SegmentedControl';
import Animated, { CurvedTransition, FadeInUp, FadeOutUp } from 'react-native-reanimated';
import SwipeableRow from '@/components/SwipableRow';
import * as Haptics from 'expo-haptics';

const transition = CurvedTransition.delay(100);

export default function Page() {
  const [isEditing, setIsEditing] = useState(false);
  const [items, setItems] = useState(calls);
  const [selectedOptions, setSelectedOptions] = useState('All');

  const onEdit = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    if(selectedOptions === 'All') {
      setItems(calls);
    } else {
      setItems(calls.filter((item) => item.missed));
    }
  }, [selectedOptions])

  const deleteHandler = (item: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setItems(items.filter((i) => i.id !== item.id));
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.background}}>
      <Stack.Screen 
        options={{
          headerTitle: () => (
            <SegmentedControl options={["All", "Missed"]} selectedOption={selectedOptions} onOptionPress={setSelectedOptions}/>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={onEdit}>
                <Text style={{color: Colors.primary, fontSize: 20, fontWeight: 'bold'}}>
                  {isEditing ? 'Done' : 'Edit'}
                </Text>
            </TouchableOpacity>
          )
        }}
      />
      <ScrollView contentInsetAdjustmentBehavior='automatic' contentContainerStyle={{paddingBottom: 40}}>
        <Animated.View style={defaultStyles.block} layout={transition}>
          <Animated.FlatList 
            data={items}
            scrollEnabled={false}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View style={defaultStyles.separator}/>}
            itemLayoutAnimation={transition}
            renderItem={({item, index}) => (
              <SwipeableRow onDelete={() => deleteHandler(item)}>
                <Animated.View
                  entering={FadeInUp.delay(index * 10)}
                  exiting={FadeOutUp}
                >
                  <View style={[defaultStyles.item]}>
                    <Image source={{uri: item.img}} style={styles.avatar}/>
                    <View style={{flex: 1, gap: 2}}>  
                      <Text style={{fontSize: 18, color: item.missed ? Colors.red : '#000'}}>
                        {item.name}
                      </Text>

                      <View style={{flexDirection: 'row', gap: 4, alignItems: 'center'}}>
                        <Ionicons
                          name={item.video ? 'videocam': 'call'}
                          size={16}
                          color={Colors.gray}
                        />
                        <Text style={{color: Colors.gray, flex: 1}}>
                          {item.incoming ? 'Incoming': 'Outgoing'}
                        </Text>
                      </View>

                    </View>

                    <View style={{flexDirection: 'row', gap: 6, alignItems: 'center'}}>
                      <Text style={{color: Colors.gray}}>{format(item.date, 'MM.dd.yy')}</Text>
                      <Ionicons name='information-circle-outline' size={24} color={Colors.primary}/>
                    </View>
                  </View>
                </Animated.View>
              </SwipeableRow>
            )}
          />
        </Animated.View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20
  }
})