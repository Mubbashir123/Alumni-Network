import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import styled from 'styled-components';
import profileImages from '../../data/profileImages';

export default function UserList({ onSelectUser, selectedUserId }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, 'alumni');
        const querySnapshot = await getDocs(usersRef);
        
        const userList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setUsers(userList);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentUser]);

  const getProfileImage = (index) => {
    const imageKey = `profile${(index % 16) + 1}`;
    return profileImages[imageKey] || profileImages.defaultProfile;
  };

  const usersToExclude = [
    'Sarah Johnson',
    'Alex',
    'Michael Chen',
    'ramel khaan',
    'asad manzr',
    'John Smith',
    'Emily Davis',
    'fdsfds',
    'Anonymous'
  ];

  const filteredUsers = users.filter(user => !usersToExclude.includes(user.name));

  if (loading) {
    return <Loading>Loading users...</Loading>;
  }

  if (filteredUsers.length === 0) {
    return <NoUsers>No users found. Please add some alumni profiles first.</NoUsers>;
  }

  return (
    <StyledUserList>
      {filteredUsers.map((user, index) => (
        <div 
          key={user.id} 
          className={`user-item ${selectedUserId === user.id ? 'selected' : ''}`}
          onClick={() => onSelectUser(user.id)}
        >
          <div className="user-avatar">
            <img 
              src={getProfileImage(index)} 
              alt={user.name || 'User'} 
              onError={(e) => {
                e.target.src = profileImages.defaultProfile;
              }}
            />
          </div>
          <div className="user-info">
            <h4>{user.name || 'Anonymous User'}</h4>
            <p>{user.email || 'No email provided'}</p>
          </div>
        </div>
      ))}
    </StyledUserList>
  );
}

const StyledUserList = styled.div`
  --main-color: #323232;
  --font-color: #323232;
  --bg-color: lightgrey;
  --input-focus: #2d8cf0;
  --card-bg: #fff;

  .user-item {
    display: flex;
    align-items: center;
    padding: 1rem;
    border-radius: 5px;
    margin-bottom: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    background-color: var(--card-bg);
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px 0 var(--main-color);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 6px 6px 0 var(--main-color);
    }

    &.selected {
      background-color: var(--bg-color);
      color: var(--font-color);
      border-color: var(--main-color);
      box-shadow: 4px 4px 0 var(--main-color);
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 1rem;
      border: 2px solid var(--main-color);
      box-shadow: 4px 4px 0 var(--main-color);
    }

    .user-info {
      flex: 1;

      .user-name {
        font-weight: 600;
        margin-bottom: 0.25rem;
        color: var(--font-color);
      }

      .user-email {
        font-size: 0.875rem;
        color: #666;
      }
    }
  }
`;

const Loading = styled.div`
  text-align: center;
  padding: 1rem;
  color: var(--font-color);
`;

const NoUsers = styled.div`
  text-align: center;
  padding: 1rem;
  color: var(--font-color);
`; 