import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { StyledTextField } from '../../../styles/form';
import { StyledParagraph } from '../../../styles/typography';

interface IInputProps {
  label: string;
  type: string;
  register: UseFormRegisterReturn<string>;
  error?: FieldError;
}

const Input = ({ label, type, register, error }: IInputProps) => (
  <fieldset>
    <StyledTextField label={label} type={type} {...register} />
    {error ? (
      <StyledParagraph fontColor='red'>{error.message}</StyledParagraph>
    ) : null}
  </fieldset>
);

export default Input;
