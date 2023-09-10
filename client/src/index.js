import React from 'react';
import ReactDOM from 'react-dom/client';
import 'index.css';
import { Provider } from 'react-redux';
import App from 'App';
import store from 'store';
// import setupInterceptors from 'services/setupInterceptors';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById('root'),
// );

// setupInterceptors(store);
