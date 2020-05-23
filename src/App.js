import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import hellow from './components/hellow';
import p5Comp from './components/p5Comp';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" component={hellow} exact />
        <Route path="/p5" component={p5Comp} />



      </div>
    </BrowserRouter>
  );
}




export default App;
