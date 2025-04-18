import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import App from './App.jsx'
import { store } from './redux/store';
import './main.css';

/**
 * Point d'entrée principal de l'application React.
 *
 * - Monte l'application dans l'élément DOM avec l'id "root".
 * - Utilise React StrictMode pour détecter les problèmes potentiels.
 * - Fournit le store Redux à toute l'application via le Provider.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </StrictMode>,
)
