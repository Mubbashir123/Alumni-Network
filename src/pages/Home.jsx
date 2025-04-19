import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { alumniData } from '../utils/sampleData';

export default function Home() {
  // Function to get profile image path
  const getProfileImage = (index) => {
    const profileNumber = ((index + 1) % 10) + 1; // Start with profile2.jpg (index 1)
    return `/images/profiles/profile${profileNumber}.jpg`;
  };

  return (
    <StyledHome>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Alumni Network</h1>
          <p>Reconnect with your batchmates, expand your network, and grow together</p>
          <div className="hero-buttons">
            <Link to="/auth?mode=login" className="hero-button login">
              Login
            </Link>
            <Link to="/auth?mode=signup" className="hero-button signup">
              Sign Up
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Join Alumni Network?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3>Connect with Peers</h3>
            <p>Find and connect with your batchmates and alumni from different batches</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </div>
            <h3>Career Opportunities</h3>
            <p>Discover job opportunities and get career guidance from experienced alumni</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
            </div>
            <h3>Knowledge Sharing</h3>
            <p>Share experiences, insights, and learn from the alumni community</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Alumni Say</h2>
        <div className="testimonials-grid">
          {alumniData.map((alumni, index) => (
            <div className="testimonial-card" key={alumni.id}>
              <div className="testimonial-content">
                <div className="profile-picture">
                  <img 
                    src={getProfileImage(index)} 
                    alt={`${alumni.name}'s profile`}
                    onError={(e) => {
                      e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(alumni.name) + '&background=random';
                    }}
                  />
                </div>
                <p className="testimonial-text">"{alumni.bio}"</p>
                <div className="testimonial-author">
                  <div className="author-info">
                    <h4>{alumni.name}</h4>
                    <p className="position">{alumni.position}</p>
                    <p className="company">{alumni.currentCompany}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </StyledHome>
  );
}

const StyledHome = styled.div`
  --main-color: #323232;
  --font-color: #323232;
  --bg-color: lightgrey;
  --input-focus: #2d8cf0;
  --card-bg: #fff;

  .hero {
    background-color: var(--bg-color);
    padding: 4rem 1rem;
    text-align: center;
    color: var(--font-color);
    border-bottom: 2px solid var(--main-color);
    box-shadow: 0 4px 0 var(--main-color);
  }

  .hero-content {
    max-width: 800px;
    margin: 0 auto;
  }

  .hero h1 {
    font-size: 3rem;
    font-weight: 900;
    margin-bottom: 1.5rem;
    text-shadow: 2px 2px 0 var(--main-color);
  }

  .hero p {
    font-size: 1.25rem;
    margin-bottom: 2rem;
    font-weight: 600;
  }

  .hero-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .hero-button {
    padding: 0.75rem 2rem;
    border-radius: 5px;
    font-weight: 700;
    font-size: 1.1rem;
    text-decoration: none;
    transition: all 0.3s ease;
    border: 2px solid #b1a7a6;
    box-shadow: 4px 4px 0 var(--main-color);
    color: #000000;
  }

  .hero-button.login {
    background-color: #b1a7a6;
  }

  .hero-button.signup {
    background-color: transparent;
  }

  .hero-button:hover {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0 var(--main-color);
  }

  .features {
    padding: 4rem 1rem;
    background-color: var(--card-bg);
  }

  .features h2 {
    text-align: center;
    font-size: 2.5rem;
    font-weight: 900;
    color: var(--font-color);
    margin-bottom: 3rem;
    text-shadow: 2px 2px 0 var(--main-color);
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .feature-card {
    background-color: var(--card-bg);
    padding: 2rem;
    border-radius: 5px;
    text-align: center;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px 0 var(--main-color);
    transition: all 0.3s ease;
  }

  .feature-card:hover {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0 var(--main-color);
  }

  .feature-icon {
    width: 48px;
    height: 48px;
    margin: 0 auto 1rem;
    color: var(--main-color);
    stroke: currentColor;
  }

  .feature-icon svg {
    width: 100%;
    height: 100%;
  }

  .feature-card h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--font-color);
    margin-bottom: 1rem;
  }

  .feature-card p {
    color: var(--font-color);
    font-weight: 500;
    line-height: 1.6;
  }

  .testimonials {
    padding: 4rem 1rem;
    background-color: #f8f9fa;
    text-align: center;
  }

  .testimonials h2 {
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: var(--font-color);
    text-shadow: 2px 2px 0 var(--main-color);
  }

  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .testimonial-card {
    background-color: var(--card-bg);
    border-radius: 10px;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    border: 2px solid var(--main-color);
  }

  .testimonial-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  .profile-picture {
    width: 100px;
    height: 100px;
    margin: 0 auto 1.5rem;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid var(--main-color);
    box-shadow: 0 4px 0 var(--main-color);
    transition: transform 0.3s ease;
  }

  .profile-picture:hover {
    transform: scale(1.05);
  }

  .profile-picture img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .testimonial-text {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #555;
    margin-bottom: 1.5rem;
    font-style: italic;
    position: relative;
    padding: 0 1rem;
  }

  .testimonial-text::before,
  .testimonial-text::after {
    content: '"';
    font-size: 2rem;
    color: var(--main-color);
    opacity: 0.3;
    position: absolute;
  }

  .testimonial-text::before {
    left: -0.5rem;
    top: -1rem;
  }

  .testimonial-text::after {
    right: -0.5rem;
    bottom: -1rem;
  }

  .testimonial-author {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .author-info {
    text-align: center;
  }

  .author-info h4 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: var(--font-color);
    font-weight: 600;
  }

  .position {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 0.25rem;
    font-weight: 500;
  }

  .company {
    font-size: 0.9rem;
    color: #888;
    font-style: italic;
  }
`;
