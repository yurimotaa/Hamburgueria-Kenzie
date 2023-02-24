import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useContext } from 'react';
import Input from '../Input';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import { UserContext } from '../../../contexts/UserContext';

export interface IRegister {
  email: string;
  password: string;
  name: string;
}

const schema = yup
  .object({
    email: yup.string().required('Digite um email'),
    password: yup
      .string()
      .required('Digite uma senha')
      .matches(/.{6,}/, 'Deve conter no mínimo 6 caracteres'),
    name: yup.string().required('Digite seu nome'),
  })
  .required();

const RegisterForm = () => {
  const { userRegister } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<IRegister> = (data) => {
    userRegister(data);
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Input
        type='name'
        label='Nome'
        {...register('name')}
        error={errors.name?.message}
      />
      <Input
        type='email'
        label='Email'
        {...register('email')}
        error={errors.email?.message}
      />
      <Input
        type='password'
        label='Senha'
        {...register('password')}
        error={errors.password?.message}
      />
      <StyledButton $buttonSize='default' $buttonStyle='gray' type='submit'>
        Cadastrar
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;
