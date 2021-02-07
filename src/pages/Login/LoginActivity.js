import React, {useState, useEffect} from 'react';
import {
    Keyboard
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, InputLogin, SecundaryButtonLogin, ButtonLogin, BotaoTexto, CenterView  } from '../Login/styles';
import { useNavigation } from '@react-navigation/native'
import getRealm from '../../database/realm';

export default function LoginActivity(){
  const [EMAIL, setEmail] = useState('');
  const [SENHA, setSenha] = useState('');
  const [user, setUser] = useState([]);
  const [isConnected, setConnection] = useState('');

  const navigation = useNavigation();


  //DidMount
  useEffect(() => {
    async function getStorage(){
      const connection = await AsyncStorage.getItem('isConnected');
      console.log(connection);
      if(connection != null){
        setConnection(connection);

        if(connection === 'true'){
          goMapActivity();
        }  
      }
    }

    getStorage();
    
  }, []);

  //didUpdate
  useEffect(() => {
    async function saveStorage(){
      await AsyncStorage.setItem('isConnected', isConnected);
    }

    saveStorage();
  }, [isConnected]);

  doLogin = async () => {
    Keyboard.dismiss();

    if(EMAIL === '' || SENHA === ''){
        alert('Preencha todos os campos!');
        return;
    }

    try{
        const data = { email: EMAIL, senha: SENHA, connection: isConnected };
        console.log(data);
        const realm = await getRealm();

        const activeUser = realm.objects("User").filtered('email = $0 AND senha = $1', data.email, data.senha);

        console.log(activeUser);
        if(activeUser.length > 0){
          setConnection('true');
          goMapActivity();
        }else{
          alert('Não foi possível encontrar esse usuário.\n Seu e-mail ou senha está errado.');
        }

        setEmail('');
        setSenha('');

    }catch(err){
        alert(err);
    }
  }


  function goMapActivity(){
    navigation.navigate('ReactMap');
  }

  function goCadastroActivity(){
    navigation.navigate('Cadastro');
  }

  function goEsqueceuSenhaActivity(){
    navigation.navigate('Esqueceu a Senha');
  }


  return(
    <Container>
      <InputLogin
      autoCapitalize="none"
      autoCorrect={false} 
      value={EMAIL}
      placeholder={"Email"}
      onChangeText={ (texto) => setEmail(texto) }
      />

      <InputLogin
      autoCapitalize="none"
      autoCorrect={false} 
      value={SENHA}
      placeholder={"Senha"}
      onChangeText={ (texto) => setSenha(texto) }
      />

      <ButtonLogin onPress={doLogin}>
        <BotaoTexto>Entrar</BotaoTexto>
      </ButtonLogin>

      <CenterView>

        <SecundaryButtonLogin onPress={goCadastroActivity}>
          <BotaoTexto>Cadastrar</BotaoTexto>
        </SecundaryButtonLogin>
        
        <SecundaryButtonLogin onPress={goEsqueceuSenhaActivity}>
          <BotaoTexto>Esqueceu a senha</BotaoTexto>
        </SecundaryButtonLogin>
        
      </CenterView>


    </Container>


  );

}