import React from 'react';
import UserPanel from './userpanel';

const App = ({children}) => (
  <div>
    <main className='lobby'>
      <UserPanel />
      {children}
    </main>
  </div>
);

export default App;
