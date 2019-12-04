import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss'

import Img from "./assets/logo.png"

const App = ()=>{
    return(
        <div>
            <img src={Img} alt="image"/>
            <h1> hello world !</h1>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root')); //渲染到DOM节点上