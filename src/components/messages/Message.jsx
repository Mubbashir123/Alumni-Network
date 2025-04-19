import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';

const StyledMessage = styled.div`
  --main-color: #323232;
  --font-color: #323232;
  --bg-color: lightgrey;
  --input-focus: #2d8cf0;
  --card-bg: #fff;

  display: flex;
  flex-direction: column;
  max-width: 70%;
  margin-left: ${props => props.isSent ? 'auto' : '0'};

  .message-content {
    background-color: ${props => props.isSent ? 'var(--main-color)' : 'var(--bg-color)'};
    color: ${props => props.isSent ? 'white' : 'var(--font-color)'};
    padding: 0.75rem 1rem;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px 0 var(--main-color);
    font-weight: 500;
    line-height: 1.5;
  }

  .message-meta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: #666;
    margin-left: ${props => props.isSent ? 'auto' : '0'};
  }

  .message-time {
    font-weight: 500;
  }
`;

export default function Message({ message }) {
  const { currentUser } = useAuth();
  const isSent = message.senderId === currentUser.uid;

  return (
    <StyledMessage isSent={isSent}>
      <div className="message-content">
        {message.text}
      </div>
      <div className="message-meta">
        <span className="message-time">
          {message.timestamp?.toDate().toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>
      </div>
    </StyledMessage>
  );
} 