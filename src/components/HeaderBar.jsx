import React from 'react';
import { Text, View } from 'react-native';

const HeaderBar = ({title, isBackEnable = false, onBack}) => {
  return (
    <View>
      <Text>Header</Text>
    </View>
  );
};

export default HeaderBar;