import { createContext, ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { toast } from 'react-toastify';
import { api } from '../services/api';

interface IContextProviderProps {
  children: ReactNode;
}
export interface IProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}

interface ICartContext {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  listProducts: IProduct[];
  setListProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
  listCart: IProduct[];
  setListCart: React.Dispatch<React.SetStateAction<IProduct[]>>;
  addToCart: (data: IProduct) => void;
  total: number[];
  clearCart: () => void;
  deleteProduct: (data: IProduct) => void;
}

export const CartContext = createContext({} as ICartContext);

export const CartContextProvider = ({ children }: IContextProviderProps) => {
  const token = localStorage.getItem('@TOKEN:');
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [listProducts, setListProducts] = useState<IProduct[]>([]);
  const [listCart, setListCart] = useState<IProduct[]>([]);
  const [total, setTotal] = useState([+0]);

  useEffect(() => {
    async function products() {
      if (token) {
        try {
          const response = await api.get('/products', {
            headers: { Authorization: `Bearer ${JSON.parse(token)}` },
          });
          setListProducts(response.data);
        } catch (error) {
          toast.error('Faça o login');
          navigate('/');
        }
      }
    }
    products();
  }, []);

  const addToCart = (data: IProduct) => {
    const productToAdd = listProducts.find((product) => product.id === data.id);
    const isProductInCart = listCart.some((product) => product.id === data.id);
    if (productToAdd && !isProductInCart) {
      setListCart([...listCart, productToAdd]);
      setTotal([...total, productToAdd.price]);
    }
  };

  const deleteProduct = (data: IProduct) => {
    const filteredProducts = listCart.filter(
      (product) => product.id !== data.id
    );
    setListCart(filteredProducts);
    setTotal(filteredProducts.map((product) => product.price));
    toast.warning('Produto deletado');
  };

  const clearCart = () => {
    setListCart([]);
    setTotal([+0]);
    toast.success('Sacola vazia');
  };

  return (
    <CartContext.Provider
      value={{
        modalOpen,
        setModalOpen,
        listProducts,
        setListProducts,
        listCart,
        setListCart,
        addToCart,
        total,
        clearCart,
        deleteProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
