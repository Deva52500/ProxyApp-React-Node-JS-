import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from "./components/Main"
import ProxyTable from "./components/ProxyTable"
function App() {
  return (
    <div className="App">
     <Main />

     <h1> Welcome to Proxy Hub!!!!</h1>
     <ProxyTable />
    </div>
  );
}

export default App;
