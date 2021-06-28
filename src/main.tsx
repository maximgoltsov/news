import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from "history"
import { Router } from "react-router-dom"
import AppContext from './app-context'
import './index.css'
import App from './App'
import AppStore from './store/app'
import AppApi from './apis/app'

const basenameUrl = "/";
const history = createBrowserHistory({
  basename: basenameUrl
})

const store = new AppStore();
const api = new AppApi(store);

ReactDOM.render(
  <React.StrictMode>
    <AppContext.Provider value={{ store, api }}>

      <Router history={history}>
        <App />
      </Router>
    </AppContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
