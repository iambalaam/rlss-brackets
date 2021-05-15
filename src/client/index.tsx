import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { App } from './App';

import './index.css';


const root = document.getElementById('root');

render(
    <BrowserRouter>
        <Route path="/:id">
            <App />
        </Route>
    </BrowserRouter>,
    root
)
