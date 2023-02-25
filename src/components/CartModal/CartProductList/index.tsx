import { useContext } from 'react';
import CartProductCard from './CartProductCard';

import { StyledCartProductList } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph } from '../../../styles/typography';
import { CartContext } from '../../../contexts/CartContext';

const CartProductList = () => {
  const { total, clearCart } = useContext(CartContext);

  return (
    <StyledCartProductList>
      <ul>
        <CartProductCard />
      </ul>

      <div className='totalBox'>
        <StyledParagraph>
          <strong>Total</strong>
        </StyledParagraph>
        <StyledParagraph className='total'>
          R${' '}
          {total.reduce(
            (accumulator, currentValue) => accumulator + currentValue
          )}
        </StyledParagraph>
      </div>
      <StyledButton
        $buttonSize='default'
        $buttonStyle='gray'
        onClick={() => clearCart()}
      >
        Remover todos
      </StyledButton>
    </StyledCartProductList>
  );
};

export default CartProductList;
