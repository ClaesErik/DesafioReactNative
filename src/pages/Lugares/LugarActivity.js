import React from 'react';
import { SafeAreaView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Lugares from "./LugarItem";


export default function LugarActivity({ props }){

return(

    <SafeAreaView style={{ flex:1,
        backgroundColor: '#373737',
        paddingTop: 45}}>

        <FlatList
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        data={props.params?.lugares}
        keyExtractor={ item => String(item.id) }
        renderItem={ ({ item }) => ( <Lugares data={item} ></Lugares>)}
        />

    </SafeAreaView>
    

);

}
