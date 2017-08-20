import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

const App = ()=>{
    return(
        <div>
            <img src={require('./assets/2.jpg')}/>
            <h1> hello world !</h1>
        </div> 
    )
}

ReactDOM.render(<App />, document.getElementById('root')); //渲染到DOM节点上