import React, { useState } from 'react';
import Welcome from './components/Welcome';
import ChatRoom from './components/ChatRoom';

const App = () => {
  const [nickname, setNickname] = useState('');

  return (
    <div className="App">
      {nickname ? (
        <ChatRoom nickname={nickname} />
      ) : (
        <Welcome setNickname={setNickname} />
      )}
    </div>
  );
};

export default App;
