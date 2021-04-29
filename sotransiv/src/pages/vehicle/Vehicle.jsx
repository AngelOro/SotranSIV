import React from 'react';
import VehicleContent from '../../components/vehicle/VehicleContent';
import MainContent from '../../components/globalComponents/MainContent';



const Vehicle = () => {//deja de ser un componente stateful no contiene {}
  // siempre se retorna un unico componente contenedor
  return (
    <>
      <MainContent />
      <VehicleContent />    
        

    </>
  );
}

export default Vehicle;