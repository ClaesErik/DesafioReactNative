import React, {useState, useEffect} from 'react';
import {
    Keyboard
} from 'react-native';
import getRealm from './database/realm';
import { Container, InputLogin, SecundaryButtonLogin, ButtonLogin, BotaoTexto, CenterView  } from './styles';


export default function App(){
  const [EMAIL, setEmail] = useState('');
  const [SENHA, setSenha] = useState('');
  const [user, setUser] = useState([]);

  useEffect(() => {
    loadUser = async () => {
        // const realm = await getRealm();
        // const data = realm.objects('User');


        // setUser(data);
        // realm.close();
    }

    loadUser();
  }, []);

  doLogin = async () => {
    if(EMAIL === '' || SENHA === ''){
        alert('Preencha todos os campos!');
        return;
    }

    try{
        const data = { email: EMAIL, senha: SENHA };
        console.log(data);
        const realm = await getRealm();

        const activeUser = realm.objects("User").filtered('email = $0 AND senha = $1', data.email, data.senha);

        console.log(activeUser);
        if(activeUser.length != 0){
          // Avançar para a tela de mapa.
          alert('Deu certo!');
        }else{
          alert('Não foi possível encontrar esse usuário.\n Seu e-mail ou senha está errado.');
        }

        setEmail('');
        setSenha('');
        Keyboard.dismiss();

    }catch(err){
        alert(err);
    }
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

        <SecundaryButtonLogin>
          <BotaoTexto>Cadastrar</BotaoTexto>
        </SecundaryButtonLogin>
        
        <SecundaryButtonLogin>
          <BotaoTexto>Esqueceu a senha</BotaoTexto>
        </SecundaryButtonLogin>
        
      </CenterView>


    </Container>


  );

}