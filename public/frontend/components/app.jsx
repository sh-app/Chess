import React from 'react';
import Header from './header';
import ChatContainer from './chat_container';

const App = ({children}) => (
  <div>
    <Header/>
    <ChatContainer/>
    <main className='lobby'>
      {children}
    </main>
  </div>
);

export default App;
