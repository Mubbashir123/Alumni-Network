import { useState, useEffect, useRef } from 'react';
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import styled from 'styled-components';
import UserList from './UserList';
import Message from './Message';

const StyledMessages = styled.div`
  --main-color: #323232;
  --font-color: #323232;
  --bg-color: lightgrey;
  --input-focus: #323232;
  --card-bg: #fff;

  .messages-container {
    display: flex;
    height: calc(100vh - 200px);
    border: 2px solid var(--main-color);
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 4px 4px 0 var(--main-color);
    background-color: var(--bg-color);
  }

  .conversations-list {
    width: 300px;
    border-right: 2px solid var(--main-color);
    background-color: var(--card-bg);
    padding: 1.5rem;
    overflow-y: auto;

    h3 {
      margin: 0 0 1.5rem 0;
      color: var(--font-color);
      font-size: 1.5rem;
      font-weight: 900;
      text-shadow: 1px 1px 0 var(--main-color);
    }
  }

  .chat-window {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: var(--card-bg);
  }

  .messages-list {
    flex: 1;
    padding: 1.5rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .message-input {
    display: flex;
    padding: 1.5rem;
    border-top: 2px solid var(--main-color);
    background-color: var(--card-bg);

    input {
      flex: 1;
      padding: 0.75rem 1rem;
      border: 2px solid var(--main-color);
      border-radius: 5px;
      margin-right: 1rem;
      font-size: 1rem;
      font-weight: 500;
      color: var(--font-color);
      background-color: var(--bg-color);
      box-shadow: 4px 4px 0 var(--main-color);

      &:focus {
        outline: none;
        border-color: var(--input-focus);
        box-shadow: 4px 4px 0 var(--input-focus);
      }

      &::placeholder {
        color: #666;
      }
    }

    button {
      padding: 0.75rem 1.5rem;
      background-color: var(--main-color);
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-weight: 600;
      font-size: 1rem;
      box-shadow: 0 4px 0 #1a1a1a;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 0 #1a1a1a;
      }

      &:active {
        transform: translateY(2px);
        box-shadow: 0 2px 0 #1a1a1a;
      }
    }
  }

  .no-chat-selected {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: var(--font-color);
    font-size: 1.25rem;
    font-weight: 500;
    text-align: center;
    padding: 2rem;
    background-color: var(--bg-color);
    border-radius: 5px;
    margin: 1.5rem;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px 0 var(--main-color);
  }
`;

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const { currentUser } = useAuth();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!selectedUser) return;

    const messagesRef = collection(db, 'messages');
    const q = query(
      messagesRef,
      where('participants', 'array-contains', currentUser.uid),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messageList = snapshot.docs
        .filter(doc => {
          const data = doc.data();
          return data.participants.includes(selectedUser);
        })
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      setMessages(messageList);
    });

    return () => unsubscribe();
  }, [selectedUser, currentUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser) return;

    try {
      await addDoc(collection(db, 'messages'), {
        text: newMessage,
        senderId: currentUser.uid,
        receiverId: selectedUser,
        timestamp: serverTimestamp(),
        participants: [currentUser.uid, selectedUser]
      });
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <StyledMessages>
      <div className="messages-container">
        <div className="conversations-list">
          <h3>Conversations</h3>
          <UserList 
            onSelectUser={setSelectedUser} 
            selectedUserId={selectedUser}
          />
        </div>
        
        <div className="chat-window">
          {selectedUser ? (
            <>
              <div className="messages-list">
                {messages.map(message => (
                  <Message key={message.id} message={message} />
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              <form onSubmit={handleSendMessage} className="message-input">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                />
                <button type="submit">Send</button>
              </form>
            </>
          ) : (
            <div className="no-chat-selected">
              <p>Select a conversation to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </StyledMessages>
  );
} 