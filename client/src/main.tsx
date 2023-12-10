import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import App from './App.tsx';
import theme from './theme.ts';
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store.ts';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ChakraProvider>
    </Provider>
);
