import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(<App/>, document.getElementById('root'));

// The code below demonstrates the difference between an anonymous arrow function and a function that is declared with the function keyword
// an anonymous arrow function has no concept of the 'this' context whereas the normal function will have context for 'this' that it obtains from the object it belongs to

// function createObject() {
//     console.log('outermost this', this);
//     return {
//         arrowFunction: () => {
//             console.log("arrowFunction this", this);
//         },
//         functionKeywordFunction: function() {
//             console.log('functionKeyword this', this);
//         }
//     }
// }
//
// const obj = createObject();
//
// console.log('obj', obj);
// obj.arrowFunction();
// obj.functionKeywordFunction();