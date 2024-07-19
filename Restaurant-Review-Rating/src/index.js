import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import {QueryClientProvider, QueryClient} from 'react-query';
import { Provider } from 'react-redux';
import {store} from "./store";

const queryClient= new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
    </Provider>
  </Router>
);
