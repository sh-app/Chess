import React from 'react';
import Chat from './chat';
import Game from './game';

const App = ({children}) => (
  <div>
    <aside>
      <Chat />
    </aside>
    <main className='lobby'>
      {children}
    </main>
  </div>
);

export default App;
