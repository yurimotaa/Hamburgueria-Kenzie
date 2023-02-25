import { createContext, ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { toast } from 'react-toastify';
import { ILogin } from '../components/Form/LoginForm';
import { IRegister } from '../components/Form/RegisterForm';
import { api } from '../services/api';

interface IUserProviderProps {
  children: ReactNode;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
}

interface IUserContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  userLogin: (data: ILogin) => Promise<void>;
  userRegister: (data: IRegister) => Promise<void>;
  userLogout: () => void;
}

export const UserContext = createContext({} as IUserContext);

export const UserContextProvider = ({ children }: IUserProviderProps) => {
  const token = localStorage.getItem('@TOKEN:');
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    if (token) {
      navigate('/shop');
    } else {
      navigate('/');
    }
  }, []);

  const userLogin = async (data: ILogin) => {
    try {
      const response = await api.post('/login', data);
      localStorage.setItem(
        '@TOKEN:',
        JSON.stringify(response.data.accessToken)
      );
      setUser(response.data.user);
      toast.success('Login efetuado com sucesso');
      navigate('/shop');
    } catch (error) {
      toast.error('Dados incorretos. Verifique o Email e senha digitados');
    }
  };

  const userRegister = async (data: IRegister) => {
    try {
      await api.post('/users', data);
      toast.success('Usuário cadastrado');
      navigate('/');
    } catch (error) {
      toast.error('Email já cadastrado');
    }
  };

  const userLogout = () => {
    setUser(null);
    localStorage.clear();
    toast.warning('Você saiu');
    navigate('/');
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, userLogin, userRegister, userLogout }}
    >
      {children}
    </UserContext.Provider>
  );
};
