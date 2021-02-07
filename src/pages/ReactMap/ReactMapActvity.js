import React from 'react';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps'

export default function ReactMapActivity() {

  return (
    <View style={{flex: 1}}>
        <MapView
          style={{flex: 1}}
          initialRegion={{
            latitude: -23.5492243,
            longitude: -46.5813785,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,}}
        
        />
    </View>
   );
 
}