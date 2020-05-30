import React from 'react';
import ReactDOM from 'react-dom';
import AppWrapper from "./app";

ReactDOM.render(
    <AppWrapper/>,
    document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
