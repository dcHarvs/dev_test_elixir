import { createRoot } from 'react-dom/client';
import React from 'react';

const container = document.getElementById('app');
const root = createRoot(container);

const App = () => {
    return (
        <div>
            <h1>Hello world!</h1>
        </div>
    )
};

root.render(<App />);