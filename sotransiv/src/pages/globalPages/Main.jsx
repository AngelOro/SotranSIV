import React, { Component } from 'react';
import MainContent from '../../components/globalComponents/MainContent';
// import '../styles/Main.css';
import {link,Link} from 'react-router-dom';

const Main = () => {//deja de ser un componente stateful no contiene {}
  // siempre se retorna un unico componente contenedor
  return (
    <>
      
      <MainContent />
      

    </>
  );
}

export default Main;
//<UserContent/>