import React, { useState, useEffect, useRef } from 'react';

const ChatRoom = ({ nickname }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8080');

    ws.current.onopen = () => {
      ws.current.send(JSON.stringify({ type: 'join', nickname }));
    };

    ws.current.onmessage = (event) => {
      const parsedMessage = JSON.parse(event.data);

      if (parsedMessage.type === 'message') {
        setMessages((prevMessages) => [...prevMessages, parsedMessage]);
      } else if (parsedMessage.type === 'join' || parsedMessage.type === 'leave') {
        setMessages((prevMessages) => [...prevMessages, { nickname: 'System', message: `${parsedMessage.nickname} has ${parsedMessage.type === 'join' ? 'joined' : 'left'} the chat` }]);
      }
    };

    ws.current.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.current.close();
    };
  }, [nickname]);

  const handleSendMessage = () => {
    if (message.trim()) {
      ws.current.send(JSON.stringify({ type: 'message', message }));
      setMessage('');
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="bg-white p-4 shadow-md">
        <h1 className="text-2xl font-bold">Chat Room</h1>
        <p>Nickname: {nickname}</p>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <strong>{msg.nickname}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <div className="bg-white p-4 flex">
        <input
          type="text"
          className="border p-2 flex-1 mr-2"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
