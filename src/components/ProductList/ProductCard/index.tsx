import { useContext } from 'react';
import { StyledProductCard } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph, StyledTitle } from '../../../styles/typography';
import { CartContext } from '../../../contexts/CartContext';

const ProductCard = () => {
  const { listProducts, addToCart } = useContext(CartContext);

  return (
    <>
      {listProducts.map((product) => (
        <StyledProductCard key={crypto.randomUUID()}>
          <div className='imageBox'>
            <img src={product.img} alt={product.name} />
          </div>
          <div className='content'>
            <StyledTitle tag='h3' $fontSize='three'>
              {product.name}
            </StyledTitle>
            <StyledParagraph className='category'>
              {product.category}
            </StyledParagraph>
            <StyledParagraph className='price'>
              R$ {product.price.toFixed(2)}
            </StyledParagraph>
            <StyledButton
              $buttonSize='medium'
              $buttonStyle='green'
              onClick={() => addToCart(product)}
            >
              Adicionar
            </StyledButton>
          </div>
        </StyledProductCard>
      ))}
    </>
  );
};

export default ProductCard;
