import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import { Provider } from "react-redux";

import Header from './components/Header.jsx';
import ContentArea from './components/ContentArea';

const App = () => {
  return (
      <Provider store={store}>
        <div className='container'>
          <Header/>
          <div className='content-area'>
              <ContentArea />
          </div>
        </div>
      </Provider>

  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
