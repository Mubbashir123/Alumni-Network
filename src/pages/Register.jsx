import RegistrationForm from '../components/auth/RegistrationForm';
import styled from 'styled-components';

export default function Register() {
  return (
    <StyledRegister>
      <div className="wrapper">
        <div className="form-container">
          <div className="title">Complete Your Profile</div>
          <RegistrationForm />
        </div>
      </div>
    </StyledRegister>
  );
}

const StyledRegister = styled.div`
  .wrapper {
    --input-focus: #2d8cf0;
    --font-color: #323232;
    --font-color-sub: #666;
    --bg-color: #fff;
    --bg-color-alt: #666;
    --main-color: #323232;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 300px);
    padding: 2rem;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  .form-container {
    background: lightgrey;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px var(--main-color);
    padding: 2rem;
    width: 100%;
    max-width: 800px;
  }

  .title {
    margin: 0 0 2rem 0;
    font-size: 25px;
    font-weight: 900;
    text-align: center;
    color: var(--main-color);
  }
`; 