import { forwardRef } from 'react';
import { StyledTextField } from '../../../styles/form';
import { StyledParagraph } from '../../../styles/typography';

type IInputProps = {
  label: string;
  error?: string | undefined;
  type: string;
};

const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ label, type, error, ...rest }, ref) => (
    <fieldset>
      <StyledTextField label={label} type={type} ref={ref} {...rest} />
      <StyledParagraph fontColor='red'>{error}</StyledParagraph>
    </fieldset>
  )
);

export default Input;
