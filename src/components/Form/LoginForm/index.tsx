import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import Input from '../Input';

export interface ILogin {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup.string().required('Digite seu email'),
    password: yup.string().required('Digite sua senha'),
  })
  .required();

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<ILogin> = (data) => {
    console.log(data);
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Input
        label='Email'
        type='email'
        {...register('email')}
        error={errors.email?.message}
      />
      <Input
        label='Senha'
        type='password'
        {...register('password')}
        error={errors.password?.message}
      />
      <StyledButton $buttonSize='default' $buttonStyle='green' type='submit'>
        Entrar
      </StyledButton>
    </StyledForm>
  );
};

export default LoginForm;
