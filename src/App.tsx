// eslint-disable-next-line import/no-extraneous-dependencies
import { ToastContainer } from 'react-toastify';
import Router from './routes';
import { GlobalStyles } from './styles/global';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <>
    <GlobalStyles />
    <Router />
    <ToastContainer position='top-center' autoClose={3000} />
  </>
);

export default App;
