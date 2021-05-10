import * as React from 'react';
import { render } from 'react-dom';

function App() {
    return (<h1>Hello, world!</h1>);
}

const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

render(
    <App />,
    root
)
