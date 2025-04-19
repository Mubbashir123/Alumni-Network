import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import styled from 'styled-components';

export default function EditProfile() {
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
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) {
        navigate('/auth');
        return;
      }

      try {
        const docRef = doc(db, 'alumni', currentUser.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            name: data.name || '',
            email: currentUser.email || '',
            batch: data.batch || '',
            branch: data.branch || '',
            currentCompany: data.currentCompany || '',
            position: data.position || '',
            industry: data.industry || '',
            location: data.location || '',
            bio: data.bio || '',
            socialMedia: {
              linkedin: data.socialMedia?.linkedin || '',
              twitter: data.socialMedia?.twitter || ''
            }
          });
        } else {
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
        }
      } catch (error) {
        setError('Failed to load profile data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser, navigate]);

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

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!formData.batch.trim()) {
      setError('Batch is required');
      return false;
    }
    if (!formData.branch.trim()) {
      setError('Branch is required');
      return false;
    }
    if (!formData.currentCompany.trim()) {
      setError('Current company is required');
      return false;
    }
    if (!formData.position.trim()) {
      setError('Position is required');
      return false;
    }
    if (!formData.location.trim()) {
      setError('Location is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setSuccess(false);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      if (!currentUser) {
        throw new Error('No user logged in');
      }

      const docRef = doc(db, 'alumni', currentUser.uid);
      await updateDoc(docRef, {
        ...formData,
        email: currentUser.email,
        updatedAt: new Date().toISOString()
      });
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/feed');
      }, 2000);
    } catch (error) {
      setError(error.message);
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledEditProfile>
      <div className="wrapper">
        <div className="form-container">
          <div className="title">Edit Profile</div>
          <StyledForm onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}

            {success && (
              <div className="success-message">
                Profile updated successfully! Redirecting...
              </div>
            )}

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
              <Label htmlFor="industry">Industry</Label>
              <Input
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                placeholder="Enter your industry"
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

            <FormGroup>
              <Label htmlFor="socialMedia.linkedin">LinkedIn</Label>
              <Input
                type="url"
                name="socialMedia.linkedin"
                value={formData.socialMedia.linkedin}
                onChange={handleChange}
                placeholder="Enter your LinkedIn profile URL"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="socialMedia.twitter">Twitter</Label>
              <Input
                type="url"
                name="socialMedia.twitter"
                value={formData.socialMedia.twitter}
                onChange={handleChange}
                placeholder="Enter your Twitter profile URL"
              />
            </FormGroup>

            <SubmitButton type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update Profile'}
            </SubmitButton>
          </StyledForm>
        </div>
      </div>
    </StyledEditProfile>
  );
}

const StyledEditProfile = styled.div`
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

  .error-message {
    color: red;
    font-size: 14px;
    margin-bottom: 1rem;
  }

  .success-message {
    color: green;
    font-size: 14px;
    margin-bottom: 1rem;
  }

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

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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