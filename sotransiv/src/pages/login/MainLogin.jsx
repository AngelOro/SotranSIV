import React from 'react';
import MainLoginInitial from '../../components/login/MainLogin';



const MainLogin = () => {//deja de ser un componente stateful no contiene {}
  // siempre se retorna un unico componente contenedor
  return (
    <>
        <MainLoginInitial/>
    </>
  );
}

export default MainLogin;