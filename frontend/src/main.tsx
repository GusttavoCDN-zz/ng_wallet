import { createRoot } from 'react-dom/client';
import React from 'react';
import { App } from './App';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
