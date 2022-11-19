import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signInRequest } from '../../services/signIn';
import { signUpRequest } from '../../services/signup';
import { validateUserCredentials } from '../../validations/validateUserCredentials';

export function UserValidationForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isCredentialsValid = validateUserCredentials({ username, password });

    if (!isCredentialsValid) {
      setErrorMsg('Invalid username or password');
      return;
    }

    try {
      if (pathname === '/signin') {
        await signInRequest({ username, password });
        navigate('/dashboard');
      } else {
        await signUpRequest({ username, password });
        navigate('/signin');
      }
    } catch (error: unknown) {
      if (error instanceof Error) setErrorMsg(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        placeholder="Escreva seu nome de usuario"
        onChange={({ target }) => setUsername(target.value)}
      />
      <input
        type="password"
        value={password}
        placeholder="Escreva sua senha"
        onChange={({ target }) => setPassword(target.value)}
      />

      <button type="submit">{pathname === '/signin' ? 'Login' : 'Cadastrar'}</button>
      {pathname === '/signin' && <Link to="/signup">Cadastrar</Link>}
      {errorMsg && <p>{errorMsg}</p>}
    </form>
  );
}
