import styled from 'styled-components/native';

export const Container = styled.View`
    flex:1;
    background-color: #232F34;
    padding-top: 45px;
    justify-content: center;
`;

export const Input = styled.TextInput`
    height: 40px;
    margin-left: 15px;
    margin-bottom: 15px;
    margin-right: 15px;
    padding: 10px;
    border-radius: 5px;
    background-color: #FFF; 
`;

export const ButtonCadastro = styled.TouchableOpacity`
    background-color: #F9AA33;
    height: 40px;
    border-radius: 5px;
    padding: 5px;
    margin: 15px;
    justify-content: center;
`;

export const BotaoTexto = styled.Text`
    font-size: 17px;
    text-align: center;
    color: #FFF;
    font-weight: bold;
    
`;

export const CenterView = styled.View`
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    margin-left: 19px;
    margin-right: 19px;
`;

