import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { StyledShopPage } from './style';
import CartModal from '../../components/CartModal';
import Header from '../../components/Header';
import ProductList from '../../components/ProductList';
import { StyledContainer } from '../../styles/grid';
import { CartContext, IProduct } from '../../contexts/CartContext';
import { api } from '../../services/api';

const ShopPage = () => {
  const { setListProducts, setProductsSearch, token } = useContext(CartContext);

  useEffect(() => {
    async function products() {
      if (token) {
        try {
          const response = await api.get<IProduct[]>('/products', {
            headers: { Authorization: `Bearer ${JSON.parse(token)}` },
          });
          setListProducts(response.data);
          setProductsSearch(response.data);
        } catch (error) {
          toast.error('Faça o login');
        }
      }
    }
    products();
  }, []);

  return (
    <StyledShopPage>
      <CartModal />
      <Header />
      <main>
        <StyledContainer containerWidth={1300}>
          <ProductList />
        </StyledContainer>
      </main>
    </StyledShopPage>
  );
};

export default ShopPage;
