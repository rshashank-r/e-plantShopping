import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import App from './App';
import store from './store.js'; // Import the Redux store
import './index.css'; // Optional - include your global styles if applicable

// Wrap the App component inside the Provider component
// Pass the Redux store as a prop to make it accessible throughout the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
