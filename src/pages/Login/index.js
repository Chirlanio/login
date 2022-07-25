import React, { useState, useContext } from 'react';

import { useHistory } from 'react-router-dom';

import api from '../../config/configApi';

import { Context } from '../../Context/AuthContext';

export const Login = () => {

  const history = useHistory();

  const { authenticated } = useContext(Context);

  console.log("Situação do usuário na página de login: "+authenticated)

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const [status, setStatus] = useState({
    type: '',
    msg: '',
    loading: false
  });

  const valueInput = e => setUser({ ...user, [e.target.name]: e.target.value });

  const loginSubmit = async e => {
    e.preventDefault();

    setStatus({ loading: true });

    const headers = {
      'Content-Type': 'application/json'
    }

    await api.post('/login', user, { headers })
      .then((response) => {
        // console.log(response);
        setStatus({
          // type: 'success',
          // msg: response.data.msg,
          loading: false
        });
        localStorage.setItem('token', JSON.stringify(response.data.token));//salva o token no localStorage
        return history.push('/dashboard');//Redireciona para a página dashboard

      }).catch((err) => {
        if (err.response) {
          // console.log(err.response);
          setStatus({
            type: 'error',
            msg: err.response.data.msg,
            loading: false
          });
        } else {
          // console.log("Erro: Tente mais tarde!");
          setStatus({
            type: 'error',
            msg: 'Erro: Tente mais tarde!',
            loading: false
          });
        }
      });
  }

  return (
    <div>
      <h1>Login</h1>

      {status.type === 'error' ? <p>{status.msg}</p> : ''}
      {status.type === 'success' ? <p>{status.msg}</p> : ''}

      <form onSubmit={loginSubmit}>
        <label htmlFor="email">Usuário: </label>
        <input type="email" name="email" id='email' placeholder="Digite o e-mail" onChange={valueInput} /><br /><br />

        <label htmlFor="password">Senha: </label>
        <input type="password" name="password" id='password' autoComplete='on' placeholder="Digite a senha" onChange={valueInput} /><br /><br />

        {status.loading ? <button type='submit' disabled>Acessando...</button> : <button type='submit'>Acessar</button>}
      </form>
    </div>
  );
}