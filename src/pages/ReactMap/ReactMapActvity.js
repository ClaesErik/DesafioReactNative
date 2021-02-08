import React from 'react';
import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ActionButtonIcon } from '../ReactMap/styles';
import MapView from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import api from '../../services/api'
import { useNavigation } from '@react-navigation/native'


import {apiKeyMaps} from '../../utils';

export default function ReactMapActivity() {
  const [LAT, setLat] = useState(-23.6131);
  const [LNG, setLng] = useState(-46.6912);
  const [isConnected, setConnection] = useState('false');
  const [places, setPlaces] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    async function livePosition(){

      await Geolocation.getCurrentPosition(function () {}, function () {}, {});

      await Geolocation.getCurrentPosition(async function(position) {        

        setLat(position.coords.latitude);
        setLng(position.coords.longitude);

        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
      },function(error) {
        errorLocation();
        console.log(error);
      }, {maximumAge:20000, timeout:10000, enableHighAccuracy:true});
    }

    livePosition();


  });

  function errorLocation(){
    alert('Não foi possível receber sua localização.');
  }

  async function allPlacesNexToUser() {
    var places = [];

    console.log(apiKeyMaps);
    console.log(LAT+','+LNG);

    const url = '';

    try {
      const resultado = await api.get('/json', 
      {params: 
         {location: LAT+','+LNG,
         radius: 2000, 
         key: apiKeyMaps}
      })

      // console.log(resultado.data.results);

      for(let googlePlace of resultado.data.results) {
            var place = {}
            var lat = googlePlace.geometry.location.lat;
            var lng = googlePlace.geometry.location.lng;
            var coordinate = {
              latitude: lat,
              longitude: lng,
            }
    
            place['placeTypes'] = googlePlace.types
            place['coordinate'] = coordinate
            place['placeId'] = googlePlace.place_id
            place['placeName'] = googlePlace.name
    
            places.push(place);         
     }
     console.log(places);
     setPlaces(places);
     goToLugarActivity();
    } catch (error) {
      console.log(error);      
    }
    
  }

  // function goToLugarActivity(){
  //   navigation.navigate('Lugares', {lugares: places});
  // }

  return (
    <View style={{flex: 1}}>
        <MapView
          style={{flex: 1}}
          showsUserLocation={true}
          loadingEnabled={true}
          minZoomLevel={17}
          initialRegion={{
            latitude:LAT,
            longitude:LNG,
            latitudeDelta:0.0922,
            longitudeDelta:0.0421
          }}
        />
         <ActionButton buttonColor="#000">
          <ActionButton.Item buttonColor='#F9AA33' title="Lugares Próximos" onPress={allPlacesNexToUser}>
            <Icon name="home" style={stylesFab.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
    </View>
   );
 
}

const stylesFab = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});