// Core
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
// Routing
import { BrowserRouter } from 'react-router-dom';
// Instruments
import './theme/main.scss';
// Store
import store from './store';
// Components
import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
    <Provider store = { store }>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
);

