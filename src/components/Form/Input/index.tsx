import { forwardRef, InputHTMLAttributes } from 'react';
import { StyledTextField } from '../../../styles/form';
import { StyledParagraph } from '../../../styles/typography';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: string;
  error?: string | undefined;
}

const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ label, type, error }, ref) => (
    <fieldset>
      <StyledTextField label={label} type={type} ref={ref} />
      <StyledParagraph fontColor='red'>{error}</StyledParagraph>
    </fieldset>
  )
);

export default Input;
