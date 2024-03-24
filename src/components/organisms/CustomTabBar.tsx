import React, {PropsWithChildren} from 'react';
import {View, Text, TouchableOpacity, ViewStyle, TextStyle} from 'react-native';

interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const MyTabBar = ({
  state,
  descriptors,
  navigation,
}: PropsWithChildren<TabBarProps>) => {
  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={tabStyles.tabButton}>
            <Text
              style={[tabStyles.tabText, {color: isFocused ? 'blue' : '#fff'}]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const tabStyles = {
  tabButton: {
    flex: 1,
  } as ViewStyle,
  tabText: {
    textAlign: 'center',
    padding: 16,
  } as TextStyle,
};

export default MyTabBar;
