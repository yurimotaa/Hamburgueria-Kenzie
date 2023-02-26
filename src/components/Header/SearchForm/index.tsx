import { MdSearch } from 'react-icons/md';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { StyledSearchForm } from './style';
import { StyledButton } from '../../../styles/button';
import { CartContext } from '../../../contexts/CartContext';

const SearchForm = () => {
  const { setListProducts, productsSearch } = useContext(CartContext);

  const [searchValue, setSearchValue] = useState('');

  const search = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (searchValue !== '') {
      const searchResults = productsSearch.filter(
        (product) =>
          product.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          product.category.toLowerCase().includes(searchValue.toLowerCase())
      );
      setListProducts(searchResults);

      if (searchResults.length === 0) {
        toast.error('Produto não encontrado');
        setListProducts(productsSearch);
      }
    }

    if (searchValue === '') {
      toast.warning('Digite algo');
      setListProducts(productsSearch);
    }

    setSearchValue('');
  };

  return (
    <StyledSearchForm>
      <input
        type='text'
        placeholder='Digitar pesquisa'
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />
      <StyledButton
        type='submit'
        $buttonSize='medium'
        $buttonStyle='green'
        onClick={search}
      >
        <MdSearch />
      </StyledButton>
    </StyledSearchForm>
  );
};

export default SearchForm;
