import React, {useState} from 'react';
import { Container, Input, Button, BotaoTexto } from './styles';
import { useNavigation } from '@react-navigation/native';
import getRealm from '../../database/realm';
import { Keyboard } from 'react-native';

export default function EsqueceuSenhaActivity() {
  const [EMAIL, setEmail] = useState('');
  const [SENHA, setSenha] = useState('');
  const [confSENHA, setConfSenha] = useState('');

  const navigation = useNavigation();

  
  async function atualizar(){
    Keyboard.dismiss();

    if(formValidation()){
      try {
        const dataInput = { email: EMAIL, senha: SENHA};
        const realm = await getRealm();

        const response = realm.objects('User').sorted('id', true).filtered('email = $0', dataInput.email);

        if(response.length > 0){
          const updatedUser = {
            id: response[0].id,
            nome: response[0].nome,
            senha: dataInput.senha,
            isConnected: response[0].isConnected
          };

          await realm.write(() => {
            realm.create('User', updatedUser, 'modified') 
          });
          
          alert('A senha foi alterada com sucesso!')
          LimparCampos();
          goLoginActivity();

          console.log('Senha do usuário a seguir alterado com sucesso:');
          console.log(updatedUser);
        }else{
          alert('Não existe um cadastro com esse email.');
        }

      } catch (error) {
        alert('Erro de resposta com o banco de dados.')
        console.log(error);
      }
    }
  }


  function formValidation(){
    if(EMAIL === '' || SENHA === '' || confSENHA === ''){
      alert('Todos os campos devem ser preenchidos.');
      return false;
    }else if(SENHA != confSENHA){
      alert('Os campos de senha não foram preenchidos igualmente.');
      return false;
    }

    return true;
  }

  function LimparCampos(){
    setEmail('');
    setSenha('');
    setConfSenha('');
  }  
  
  function goLoginActivity(){
      navigation.navigate('Login');
  }
  
  return (
    <Container>

      <BotaoTexto >Entre com seu email de cadastro.</BotaoTexto>
      <Input
        autoCapitalize="none"
        autoCorrect={false}
        placeholder={"Digite uma nova senha"}
        onChangeText={ (texto) => setEmail(texto) }
        style={{marginBottom: 30}}
      />

      <BotaoTexto>
        Porfavor insira abaixo uma nova senha para realizar o seu Login.
      </BotaoTexto>

      <Input
        autoCapitalize="none"
        autoCorrect={false}
        placeholder={"Digite uma nova senha"}
        onChangeText={ (texto) => setSenha(texto) }
      />

      <Input
        autoCapitalize="none"
        autoCorrect={false}
        placeholder={"Confirme a senha"}
        onChangeText={ (texto) => setConfSenha(texto) }
      />

      <Button onPress={ atualizar }>
        <BotaoTexto style={{textAlign: 'center'}}>Atualizar</BotaoTexto>
      </Button>


    </Container>


   );
 
}