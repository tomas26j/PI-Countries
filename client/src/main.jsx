import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import {Router, BrowserRouter} from 'react-router-dom'
import store from './redux/store.js';
import dotenv from 'dotenv';
import axios from 'axios';
//dotenv.config();
axios.defaults.baseURL= "http://localhost:3001"
// axios.defaults.baseURL = "https://pi-countries-production-6f95.up.railway.app/";
//axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";

ReactDOM.createRoot(document.getElementById("root")).render(//provee inf del store
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

