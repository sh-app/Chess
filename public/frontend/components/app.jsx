import React from 'react';
import ChatContainer from './chat_container';
import Game from './game';

const App = ({children}) => (
  <div>
    <ChatContainer/>
    <main className='lobby'>
      {children}
    </main>
  </div>
);

export default App;
