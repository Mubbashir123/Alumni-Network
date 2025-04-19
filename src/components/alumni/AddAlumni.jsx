import { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import styled from 'styled-components';

const StyledAddAlumni = styled.div`
  --input-focus: #2d8cf0;
  --font-color: #323232;
  --font-color-sub: #666;
  --bg-color: #fff;
  --bg-color-alt: #666;
  --main-color: #323232;
  --text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
`;

const FormContainer = styled.div`
  background: lightgrey;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  box-shadow: 4px 4px var(--main-color);
  padding: 20px;
  margin: 0 auto;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;

const FormTitle = styled.h2`
  margin: 20px 0;
  font-size: 25px;
  font-weight: 900;
  text-align: center;
  color: var(--main-color);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-size: 15px;
  font-weight: 600;
  color: var(--font-color);
`;

const Input = styled.input`
  width: 250px;
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
  transition: var(--transition);

  &:focus {
    border: 2px solid var(--input-focus);
  }

  &::placeholder {
    color: var(--font-color-sub);
    opacity: 0.8;
  }
`;

const TextArea = styled.textarea`
  width: 250px;
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
  transition: var(--transition);
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
  margin: 20px 0;
  width: 120px;
  height: 40px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  background-color: var(--bg-color);
  box-shadow: 4px 4px var(--main-color);
  font-size: 17px;
  font-weight: 600;
  color: var(--font-color);
  cursor: pointer;
  transition: var(--transition);
  align-self: center;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 6px 6px var(--main-color);
  }

  &:active {
    box-shadow: 0px 0px var(--main-color);
    transform: translate(3px, 3px);
  }
`;

const SuccessMessage = styled.div`
  background: lightgrey;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  box-shadow: 4px 4px var(--main-color);
  padding: 1rem;
  margin-top: 1rem;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  color: var(--font-color);
`;

export default function AddAlumni() {
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

  const [success, setSuccess] = useState(false);

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
    try {
      await addDoc(collection(db, 'alumni'), {
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      setSuccess(true);
      setFormData({
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
    } catch (error) {
      console.error('Error adding alumni:', error);
    }
  };

  return (
    <StyledAddAlumni>
      <FormContainer>
        <FormTitle>Add New Alumni</FormTitle>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="batch">Batch</Label>
            <Input
              type="text"
              id="batch"
              name="batch"
              value={formData.batch}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="branch">Branch</Label>
            <Input
              type="text"
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="currentCompany">Current Company</Label>
            <Input
              type="text"
              id="currentCompany"
              name="currentCompany"
              value={formData.currentCompany}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="position">Position</Label>
            <Input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="bio">Bio</Label>
            <TextArea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself..."
            />
          </FormGroup>

          <SubmitButton type="submit">Add Alumni</SubmitButton>
        </form>
      </FormContainer>

      {success && (
        <SuccessMessage>
          Alumni added successfully!
        </SuccessMessage>
      )}
    </StyledAddAlumni>
  );
}