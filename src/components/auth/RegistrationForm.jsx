import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styled from 'styled-components';

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
    }
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();

  const uid = location.state?.uid || currentUser?.uid;

  useEffect(() => {
    if (!uid) {
      navigate('/auth');
    } else if (currentUser?.email) {
      setFormData(prev => ({
        ...prev,
        email: currentUser.email
      }));
    }
  }, [uid, navigate, currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!uid) {
        throw new Error('No user ID found');
      }

      const docRef = doc(db, 'alumni', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await setDoc(docRef, {
          ...formData,
          updatedAt: new Date().toISOString()
        }, { merge: true });
      } else {
        await setDoc(docRef, {
          ...formData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
      
      navigate('/feed');
    } catch (error) {
      setError(error.message);
      console.error('Error saving profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      {error && <div className="error-message">{error}</div>}

      <FormGroup>
        <Label htmlFor="name">Full Name</Label>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="email">Email <span className="read-only">(Cannot be changed)</span></Label>
        <Input
          type="email"
          name="email"
          value={currentUser?.email || ''}
          readOnly
          className="read-only-input"
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="batch">Batch</Label>
        <Input
          type="text"
          name="batch"
          value={formData.batch}
          onChange={handleChange}
          placeholder="Enter your batch year"
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="branch">Branch</Label>
        <Select
          name="branch"
          value={formData.branch}
          onChange={handleChange}
          required
        >
          <option value="">Select your branch</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Electronics">Electronics</option>
          <option value="Mechanical">Mechanical</option>
          <option value="Civil">Civil</option>
          <option value="Electrical">Electrical</option>
          <option value="Chemical">Chemical</option>
          <option value="Other">Other</option>
        </Select>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="currentCompany">Current Company</Label>
        <Input
          type="text"
          name="currentCompany"
          value={formData.currentCompany}
          onChange={handleChange}
          placeholder="Enter your current company"
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="position">Position</Label>
        <Input
          type="text"
          name="position"
          value={formData.position}
          onChange={handleChange}
          placeholder="Enter your position"
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="location">Location</Label>
        <Input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Enter your location"
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="bio">Bio</Label>
        <TextArea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Tell us about yourself"
          rows="4"
        />
      </FormGroup>

      <SubmitButton type="submit" disabled={loading}>
        {loading ? 'Completing Registration...' : 'Complete Registration'}
      </SubmitButton>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .read-only {
    font-size: 0.75rem;
    color: #666;
    font-style: italic;
    margin-left: 0.5rem;
  }

  .read-only-input {
    background-color: #f5f5f5;
    cursor: not-allowed;
    border-color: #ddd;

    &:focus {
      border-color: #ddd;
      box-shadow: none;
    }
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 15px;
  font-weight: 600;
  color: var(--font-color);
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  background-color: var(--bg-color);
  box-shadow: 4px 4px var(--main-color);
  font-size: 15px;
  font-weight: 600;
  color: var(--font-color);
  padding: 5px 10px;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border: 2px solid var(--input-focus);
  }

  &::placeholder {
    color: var(--font-color-sub);
    opacity: 0.8;
  }
`;

const Select = styled.select`
  width: 100%;
  height: 40px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  background-color: var(--bg-color);
  box-shadow: 4px 4px var(--main-color);
  font-size: 15px;
  font-weight: 600;
  color: var(--font-color);
  padding: 5px 10px;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border: 2px solid var(--input-focus);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  background-color: var(--bg-color);
  box-shadow: 4px 4px var(--main-color);
  font-size: 15px;
  font-weight: 600;
  color: var(--font-color);
  padding: 10px;
  outline: none;
  transition: all 0.3s ease;
  resize: vertical;

  &:focus {
    border: 2px solid var(--input-focus);
  }

  &::placeholder {
    color: var(--font-color-sub);
    opacity: 0.8;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  background-color: var(--bg-color);
  box-shadow: 4px 4px var(--main-color);
  font-size: 17px;
  font-weight: 600;
  color: var(--font-color);
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 6px 6px var(--main-color);
  }

  &:active:not(:disabled) {
    box-shadow: 0px 0px var(--main-color);
    transform: translate(3px, 3px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`; 