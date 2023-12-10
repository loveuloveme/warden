import { Box, } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Authentication from './pages/Login/Login';
import Home from './pages/Home';
import Subscriptions from './pages/Subscriptions';
import AuthMiddleware from './components/AuthMiddleware/AuthMiddleware';
import Guard from './components/Guard/';
import { GuardType } from './components/Guard/types';

import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <Box>
            <ToastContainer position="bottom-right" theme="dark" />
            <AuthMiddleware>
                <Routes>
                    <Route element={<Guard type={GuardType.AUTH_ONLY} />} >
                        <Route path="/:id" element={<Home />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/subs" element={<Subscriptions />} />
                    </Route>
                    <Route element={<Guard type={GuardType.UNAUTH_ONLY} />} >
                        <Route path='/signin' element={<Authentication />} />
                        <Route path='/signup' element={<Authentication isSignUp={true} />} />
                    </Route>
                </Routes>
            </AuthMiddleware>
        </Box>
    );
}

export default App;
