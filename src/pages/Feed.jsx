import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { communityPosts, categories } from '../utils/sampleData';
import { useAuth } from '../contexts/AuthContext';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import AlumniList from '../components/alumni/AlumniList';
import profileImages from '../data/profileImages';
import styled from 'styled-components';
import Messages from '../components/messages/Messages';
import Achievements from '../components/achievements/Achievements';

export default function Feed() {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('latest');
  const [activeTab, setActiveTab] = useState('feed');
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [posts, setPosts] = useState(communityPosts);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const dropdownRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleEditProfile = async () => {
    try {
      // Check if user has a profile
      const docRef = doc(db, 'alumni', currentUser.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        navigate('/edit-profile');
      } else {
        // If no profile exists, create one and then navigate
        await setDoc(docRef, {
          name: '',
          email: currentUser.email || '',
          batch: '',
          branch: '',
          currentCompany: '',
          position: '',
          industry: '',
          location: '',
          bio: '',
          socialMedia: {
            linkedin: '',
            twitter: ''
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
        navigate('/edit-profile');
      }
    } catch (error) {
      console.error('Error handling edit profile:', error);
    }
  };

  const handleCreatePost = () => {
    setShowCreatePostModal(true);
  };

  const handleCloseModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowCreatePostModal(false);
      setPostContent('');
    }
  };

  const handleSubmitPost = () => {
    if (!postContent.trim()) return;

    const newPost = {
      id: Date.now(),
      author: {
        id: currentUser.uid,
        name: currentUser.displayName || 'Anonymous User',
        avatar: profileImages.profile1 // Using default profile image
      },
      title: postContent.split('\n')[0].slice(0, 50) + (postContent.length > 50 ? '...' : ''),
      content: postContent,
      category: 'General Discussion',
      tags: [],
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString()
    };

    setPosts(prevPosts => [newPost, ...prevPosts]);
    setShowCreatePostModal(false);
    setPostContent('');
  };

  // Helper function to get profile image
  const getProfileImage = (index) => {
    const imageKey = `profile${(index % 10) + 1}`; // We have 10 profile images, so cycle through them
    return profileImages[imageKey] || profileImages.defaultProfile;
  };

  // Filter and sort posts
  const filteredPosts = posts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'most-liked':
          return b.likes - a.likes;
        case 'most-commented':
          return b.comments - a.comments;
        default:
          return 0;
      }
    });

  return (
    <StyledFeed>
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-content">
          <h1>Alumni Network</h1>
          
          {/* User Profile Dropdown */}
          <div className="profile-dropdown" ref={dropdownRef}>
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="profile-button"
            >
              <img
                className="profile-image"
                src={profileImages.profile1}
                alt="User profile"
              />
              <span>Profile</span>
            </button>

            {showProfileDropdown && (
              <div className="dropdown-menu">
                <button
                  onClick={handleEditProfile}
                  className="dropdown-item"
                >
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="dropdown-item"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        {/* Tabs */}
        <div className="tabs-container">
          <nav className="tabs">
            <button
              onClick={() => setActiveTab('feed')}
              className={`tab ${activeTab === 'feed' ? 'active' : ''}`}
            >
              Community Feed
            </button>
            <button
              onClick={() => setActiveTab('alumni')}
              className={`tab ${activeTab === 'alumni' ? 'active' : ''}`}
            >
              Alumni Directory
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`tab ${activeTab === 'messages' ? 'active' : ''}`}
            >
              Messages
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className={`tab ${activeTab === 'achievements' ? 'active' : ''}`}
            >
              Achievements
            </button>
          </nav>
        </div>

        {activeTab === 'feed' ? (
          <>
            <div className="feed-header">
              <button className="create-post-button" onClick={handleCreatePost}>
                Create Post
              </button>
            </div>

            {/* Search and Filter Section */}
            <div className="search-section">
              <div className="search-content">
                <div className="search-row">
                  <div className="search-input-container">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search posts..."
                      className="search-input"
                    />
                  </div>
                  <div className="filter-container">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="filter-select"
                    >
                      <option value="All">All Categories</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="filter-select"
                    >
                      <option value="latest">Latest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="most-liked">Most Liked</option>
                      <option value="most-commented">Most Commented</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts Section */}
            <div className="posts-section">
              {filteredPosts.map((post, index) => (
                <div key={post.id} className="post-card">
                  <div className="post-content">
                    <div className="post-header">
                      <img
                        className="post-author-image"
                        src={getProfileImage(index)}
                        alt={post.author.name}
                      />
                      <div className="post-info">
                        <div className="post-title-row">
                          <h3 className="post-title">{post.title}</h3>
                          <span className="post-category">{post.category}</span>
                        </div>
                        <p className="post-meta">
                          Posted by {post.author.name} • {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <p className="post-text">{post.content}</p>
                    
                    <div className="post-tags">
                      {post.tags.map(tag => (
                        <span key={tag} className="tag">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="post-actions">
                      <button className="action-button">
                        <span className="action-icon">👍</span>
                        <span>{post.likes} likes</span>
                      </button>
                      <button className="action-button">
                        <span className="action-icon">💬</span>
                        <span>{post.comments} comments</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : activeTab === 'alumni' ? (
          <AlumniList />
        ) : activeTab === 'messages' ? (
          <Messages />
        ) : (
          <Achievements />
        )}
      </div>

      {/* Create Post Modal */}
      {showCreatePostModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" ref={modalRef}>
            <h3>Create New Post</h3>
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="What's on your mind?"
              rows={5}
            />
            <div className="modal-buttons">
              <button className="cancel-button" onClick={() => setShowCreatePostModal(false)}>
                Cancel
              </button>
              <button 
                className="submit-button" 
                onClick={handleSubmitPost}
                disabled={!postContent.trim()}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </StyledFeed>
  );
}

const StyledFeed = styled.div`
  --main-color: #323232;
  --font-color: #323232;
  --bg-color: lightgrey;
  --input-focus: #2d8cf0;
  --card-bg: #fff;

  min-height: 100vh;
  background-color: var(--bg-color);

  .navbar {
    background-color: var(--card-bg);
    border-bottom: 2px solid var(--main-color);
    box-shadow: 0 4px 0 var(--main-color);
  }

  .nav-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .navbar h1 {
    font-size: 1.5rem;
    font-weight: 900;
    color: var(--font-color);
    text-shadow: 1px 1px 0 var(--main-color);
  }

  .profile-dropdown {
    position: relative;
    display: inline-block;
  }

  .profile-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--font-color);
    font-weight: 600;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 5px;
    transition: all 0.3s ease;

    &:hover {
      background-color: var(--bg-color);
    }
  }

  .profile-image {
    height: 2rem;
    width: 2rem;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--main-color);
    box-shadow: 2px 2px 0 var(--main-color);
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 0.5rem;
    background-color: var(--card-bg);
    border: 2px solid var(--main-color);
    border-radius: 5px;
    box-shadow: 4px 4px 0 var(--main-color);
    z-index: 10;
    min-width: 150px;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.5rem;
  }

  .dropdown-item {
    display: block;
    width: 100%;
    padding: 0.5rem 1rem;
    text-align: left;
    color: var(--font-color);
    font-weight: 600;
    transition: all 0.3s ease;
    border: none;
    background: none;
    cursor: pointer;
    border-radius: 3px;

    &:hover {
      background-color: var(--bg-color);
    }
  }

  .main-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .tabs-container {
    margin-bottom: 2rem;
  }

  .tabs {
    display: flex;
    gap: 2rem;
    border-bottom: 2px solid var(--main-color);
  }

  .tab {
    padding: 1rem 0;
    font-weight: 600;
    color: var(--font-color);
    position: relative;
    transition: all 0.3s ease;
    padding: 1rem 1.5rem;
    border-radius: 5px;

    &:hover {
      color: var(--main-color);
      background-color: rgba(50, 50, 50, 0.1);
      transform: translateY(-2px);
    }

    &.active {
      color: var(--main-color);
      background-color: rgba(50, 50, 50, 0.1);
      
      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        right: 0;
        height: 2px;
        background-color: var(--main-color);
      }
    }
  }

  .search-section {
    background-color: var(--card-bg);
    padding: 1.5rem;
    border-radius: 5px;
    margin-bottom: 2rem;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px 0 var(--main-color);
  }

  .search-row {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media (min-width: 640px) {
      flex-direction: row;
    }
  }

  .search-input-container {
    flex: 1;
  }

  .search-input {
    width: 100%;
    padding: 0.5rem;
    border: 2px solid var(--main-color);
    border-radius: 5px;
    background-color: var(--bg-color);
    box-shadow: 4px 4px 0 var(--main-color);
    font-weight: 500;

    &:focus {
      outline: none;
      border-color: var(--input-focus);
    }
  }

  .filter-container {
    display: flex;
    gap: 1rem;
  }

  .filter-select {
    padding: 0.5rem;
    border: 2px solid var(--main-color);
    border-radius: 5px;
    background-color: var(--bg-color);
    box-shadow: 4px 4px 0 var(--main-color);
    font-weight: 500;

    &:focus {
      outline: none;
      border-color: var(--input-focus);
    }
  }

  .posts-section {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .post-card {
    background-color: var(--card-bg);
    border-radius: 5px;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px 0 var(--main-color);
    overflow: hidden;
  }

  .post-content {
    padding: 1.5rem;
  }

  .post-header {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .post-author-image {
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--main-color);
  }

  .post-info {
    flex: 1;
  }

  .post-title-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.25rem;
  }

  .post-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--font-color);
  }

  .post-category {
    padding: 0.25rem 0.75rem;
    background-color: var(--input-focus);
    color: white;
    border-radius: 1rem;
    font-size: 0.875rem;
    font-weight: 600;
  }

  .post-meta {
    font-size: 0.875rem;
    color: var(--font-color);
  }

  .post-text {
    margin: 1rem 0;
    color: var(--font-color);
    line-height: 1.6;
  }

  .post-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .tag {
    padding: 0.25rem 0.75rem;
    background-color: var(--bg-color);
    color: var(--font-color);
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .post-actions {
    display: flex;
    gap: 1.5rem;
  }

  .action-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--font-color);
    font-weight: 600;
    padding: 0.5rem;
    border-radius: 5px;
    transition: all 0.3s ease;

    &:hover {
      background-color: var(--bg-color);
    }
  }

  .action-icon {
    font-size: 1.25rem;
  }

  .feed-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .create-post-button {
    background-color: var(--main-color);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 5px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 0 #1a1a1a;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 0 #1a1a1a;
    }

    &:active {
      transform: translateY(2px);
      box-shadow: 0 2px 0 #1a1a1a;
    }
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    background-color: white;
    padding: 2rem;
    border-radius: 10px;
    width: 90%;
    max-width: 600px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 2px solid var(--main-color);

    h3 {
      margin-bottom: 1.5rem;
      color: var(--font-color);
    }

    textarea {
      width: 100%;
      padding: 1rem;
      border: 2px solid var(--main-color);
      border-radius: 5px;
      margin-bottom: 1.5rem;
      font-size: 1rem;
      resize: vertical;
      min-height: 150px;

      &:focus {
        outline: none;
        border-color: var(--input-focus);
      }
    }
  }

  .modal-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;

    button {
      padding: 0.75rem 1.5rem;
      border-radius: 5px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    .cancel-button {
      background-color: transparent;
      border: 2px solid var(--main-color);
      color: var(--font-color);

      &:hover {
        background-color: #f0f0f0;
      }
    }

    .submit-button {
      background-color: var(--main-color);
      color: white;
      border: none;
      box-shadow: 0 4px 0 #1a1a1a;

      &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 6px 0 #1a1a1a;
      }

      &:active:not(:disabled) {
        transform: translateY(2px);
        box-shadow: 0 2px 0 #1a1a1a;
      }

      &:disabled {
        transform: none;
        box-shadow: 0 4px 0 #1a1a1a;
      }
    }
  }
`; 