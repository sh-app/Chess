import React from 'react';
import ChatContainer from './chat_container';

const App = ({children}) => (
  <div>
    <ChatContainer/>
    <main className='lobby'>
      {children}
    </main>
  </div>
);

export default App;
