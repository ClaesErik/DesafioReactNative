import React from 'react';
import { Container, Nome } from './styles';

export default function Lugares({ data }){
    return(
        <Container>
           <Nome>{data.placeName}</Nome>
           <Nome>{data.placeTypes}</Nome>
           <Nome>{data.coordinate}</Nome>
        </Container>
    );

}