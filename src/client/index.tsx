import * as React from 'react';
import { render } from 'react-dom';
import { io } from 'socket.io-client';
import { App } from './App';
import './index.css';

const socket = io();
(window as any).socket = socket;

const root = document.getElementById('root');

render(
    <App />,
    root
)
