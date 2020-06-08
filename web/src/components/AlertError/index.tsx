import React from 'react';
import { FiXCircle } from 'react-icons/fi';

import './styles.css';

const AlertError = () => {
  return (
    <div id="error">
      <span><FiXCircle /></span>
      <h1>Erro no cadastro!</h1>
      <p>Verifique se todos os campos foram preenchidos</p>
    </div>
  );
};

export default AlertError;
