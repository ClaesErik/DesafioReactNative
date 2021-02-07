import React from 'react';
import {
    View
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginActivity from './pages/Login/LoginActivity';
import ReactMapActivity from './pages/ReactMap/ReactMapActvity';
import CadastroActivity from './pages/Cadastro/CadastroActivity';
import EsqueceuSenhaActivity from './pages/EsqueceuSenha/EsqueceuSenhaActivity';

const Stack = createStackNavigator();

export default function App(){
  
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginActivity} options={{headerShown: false}} />
        <Stack.Screen name="Cadastro" component={CadastroActivity}/>
        <Stack.Screen name="ReactMap" component={ReactMapActivity} />
        <Stack.Screen name="Esqueceu a Senha" component={EsqueceuSenhaActivity} />
      </Stack.Navigator>
    </NavigationContainer>

  );

}