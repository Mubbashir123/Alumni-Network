import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow">
        <Outlet />
      </main>
      <StyledFooter>
        <div className="footer-content">
          <p className="copyright">© 2025 Alumni Network. All rights reserved.</p>
          <div className="footer-links">
            <a href="#" className="footer-link">About Us</a>
            <a href="#" className="footer-link">Contact</a>
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms of Service</a>
          </div>
        </div>
      </StyledFooter>
    </div>
  );
};

const StyledFooter = styled.footer`
  --main-color: #323232;
  --font-color: #323232;
  --bg-color: lightgrey;
  --input-focus: #2d8cf0;

  background-color: var(--bg-color);
  padding: 2rem 0;
  border-top: 2px solid var(--main-color);
  box-shadow: 0 -4px 0 var(--main-color);

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    text-align: center;
  }

  .copyright {
    color: var(--font-color);
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 2rem;
  }

  .footer-link {
    color: var(--font-color);
    text-decoration: none;
    font-weight: 600;
    font-size: 1rem;
    transition: color 0.3s ease;
    position: relative;

    &:hover {
      color: var(--main-color);
    }

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      bottom: -2px;
      left: 0;
      background-color: var(--main-color);
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }

    &:hover::after {
      transform: scaleX(1);
    }
  }
`;

export default Layout; 