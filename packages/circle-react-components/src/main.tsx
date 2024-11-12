import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { CircleSdkProvider } from '@/hooks/CircleSdkProvider.tsx';
import { App } from './App.tsx';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CircleSdkProvider>
      <App />
    </CircleSdkProvider>
  </StrictMode>,
);
