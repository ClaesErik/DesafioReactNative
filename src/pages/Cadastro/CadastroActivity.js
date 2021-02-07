import React, {useState} from 'react';
import {
  Keyboard
} from 'react-native';
import { Container, Input, ButtonCadastro, BotaoTexto, } from './styles';
import { useNavigation } from '@react-navigation/native';
import getRealm from '../../database/realm';

export default function CadastroActivity() {
    const [NOME, setNome] = useState('');
    const [EMAIL, setEmail] = useState('');
    const [SENHA, setSenha] = useState('');
    const [confSENHA, setConfSenha] = useState('');


    const navigation = useNavigation();

    function formValidation(){
      if(EMAIL === '' || SENHA === '' || confSENHA === ''){
        alert('Preencha todos os campos!');
        return false;
      }else if(SENHA != confSENHA){
        alert('Os campos de senha não foram preenchidos igualmente.');
        return false;
      }
      
      return true;
    }

    async function cadastrar(){
      Keyboard.dismiss();

      if(formValidation()){
        try {
          const realm = await getRealm();
          const data = { nome: NOME, email: EMAIL, senha: SENHA };
          console.log(data);

          const emailConflited = realm.objects('User').sorted('id', true).filtered('email = $0', data.email);
          if(emailConflited.length > 1 && emailConflited[0].email === data.email){
            alert('Já existe um cadastro com esse email.');
            console.log(emailConflited[0].email + 'ja existe no banco de dados.');
            return;
          }
          
          //criando o id ou somando o próximo
          const id = realm.objects('User').sorted('id', true).length > 0
          ? realm.objects('User').sorted('id', true)[0].id + 1 : 1;

          const dadosUser = {
            id: id,
            nome: data.nome,
            email: data.email,
            senha: data.senha,
            isConnected: false
          }

          console.log(dadosUser);

          realm.write(() => {
              realm.create('User', dadosUser);
          });

          alert('O cadastro realizado com sucesso!');
          console.log('O usuário a seguir foi criado:');
          console.log(dadosUser);

          realm.close();
        } catch (error) {
          alert(`Existe algum problema para realizar o cadastro ao banco de dados.\n\n`);
          console.log(error);
          return;
        }

        LimparCampos();
        goLoginActivity();
      }
    }

    function goLoginActivity(){
      navigation.navigate('Login');
    }

    function LimparCampos() {
      setNome('');
      setEmail('');
      setSenha('');
      setConfSenha('');
    }
    

  return (
    <Container>

      <Input
        autoCapitalize="none"
        autoCorrect={false}
        placeholder={"Nome"}
        onChangeText={ (texto) => setNome(texto) }
      />

      <Input
        autoCapitalize="none"
        autoCorrect={false}
        placeholder={"Email"}
        onChangeText={ (texto) => setEmail(texto) }
      />

      <Input
        autoCapitalize="none"
        autoCorrect={false}
        placeholder={"Senha"}
        onChangeText={ (texto) => setSenha(texto) }
      />

      <Input
        autoCapitalize="none"
        autoCorrect={false}
        placeholder={"Confirme a senha"}
        onChangeText={ (texto) => setConfSenha(texto) }
      />

      <ButtonCadastro onPress={cadastrar}>
        <BotaoTexto>Cadastrar</BotaoTexto>
      </ButtonCadastro>


    </Container>


   );
 
}