import React, { useState } from 'react';

import api from '../../config/configApi';

export const Login = () => {

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const valueInput = e => setUser({ ...user, [e.target.name]: e.target.value });

  const loginSubmit = async e => {
    e.preventDefault();

    const headers = {
      'Content-Type': 'application/json'
    }
    await api.post('/login', user, { headers })
      .then((response) => {
        console.log(response);
      }).catch((err) => {
        console.log("Erro: Tente mais tarde!");
      });
  }
  
  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={loginSubmit}>
        <label htmlFor="email">Usuário: </label>
        <input type="email" name="email" id='email' placeholder="Digite o e-mail" onChange={valueInput} /><br /><br />

        <label htmlFor="password">Senha: </label>
        <input type="password" name="password" id='password' autoComplete='on' placeholder="Digite a senha" onChange={valueInput} /><br /><br />

        <button type='submit'>Acessar</button>
      </form>
    </div>
  );
}