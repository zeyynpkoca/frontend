import React, { useState } from 'react';

const Welcome = ({ setNickname }) => {
  const [nickname, setNicknameLocal] = useState('');

  const handleJoin = () => {
    if (nickname.trim()) {
      setNickname(nickname);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h1 className="text-2xl font-bold mb-4">Welcome to Chat App</h1>
        <input
          type="text"
          className="border p-2 w-full mb-4"
          placeholder="Enter your nickname"
          value={nickname}
          onChange={(e) => setNicknameLocal(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 w-full rounded"
          onClick={handleJoin}
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default Welcome;
