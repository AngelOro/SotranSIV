import React from 'react';
import ConductorContent from '../../components/conduct/ConductorContent';
import MainContent from '../../components/globalComponents/MainContent';



const Conduct = () => {//deja de ser un componente stateful no contiene {}
  // siempre se retorna un unico componente contenedor
  return (
    <>
    <MainContent />
      <ConductorContent/>      
    </>
  );
}

export default Conduct;