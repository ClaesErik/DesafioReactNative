import styled from 'styled-components/native';

export const Container = styled.View`
    flex:1;
    background-color: #373737;
    padding-top: 45px;
    justify-content: center;
`;

export const InputLogin = styled.TextInput`
    height: 40px;
    margin-left: 15px;
    margin-bottom: 10px;
    margin-right: 15px;
    padding: 10px;
    border-radius: 5px;
    background-color: #FFF; 
`;

export const SecundaryButtonLogin = styled.TouchableOpacity`
    height: 40px;
    border-radius: 5px;
    padding: 5px;
`;

export const ButtonLogin = styled.TouchableOpacity`
    background-color: #0000FF;
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
    justify-content: space-around;
`;

