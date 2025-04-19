import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const testAlumni = [
  {
    name: 'John Smith',
    email: 'john.smith@example.com',
    batch: '2018',
    branch: 'Computer Science',
    currentCompany: 'Tech Corp',
    position: 'Senior Software Engineer',
    industry: 'Technology',
    location: 'New York, USA',
    bio: 'Passionate about software development and open source contributions.',
    socialMedia: {
      linkedin: 'https://linkedin.com/in/johnsmith',
      twitter: 'https://twitter.com/johnsmith'
    }
  },
  {
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    batch: '2019',
    branch: 'Electrical Engineering',
    currentCompany: 'Power Solutions',
    position: 'Electrical Engineer',
    industry: 'Energy',
    location: 'London, UK',
    bio: 'Specialized in renewable energy systems and power distribution.',
    socialMedia: {
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      twitter: 'https://twitter.com/sarahjohnson'
    }
  },
  {
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    batch: '2020',
    branch: 'Mechanical Engineering',
    currentCompany: 'AutoTech',
    position: 'Mechanical Designer',
    industry: 'Automotive',
    location: 'Tokyo, Japan',
    bio: 'Expert in automotive design and mechanical systems.',
    socialMedia: {
      linkedin: 'https://linkedin.com/in/michaelchen',
      twitter: 'https://twitter.com/michaelchen'
    }
  },
  {
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    batch: '2017',
    branch: 'Civil Engineering',
    currentCompany: 'BuildRight',
    position: 'Project Manager',
    industry: 'Construction',
    location: 'Sydney, Australia',
    bio: 'Leading sustainable construction projects worldwide.',
    socialMedia: {
      linkedin: 'https://linkedin.com/in/emilydavis',
      twitter: 'https://twitter.com/emilydavis'
    }
  }
];

export const addTestAlumni = async () => {
  try {
    const alumniRef = collection(db, 'alumni');
    for (const alum of testAlumni) {
      await addDoc(alumniRef, {
        ...alum,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
    console.log('Test alumni profiles added successfully!');
  } catch (error) {
    console.error('Error adding test alumni:', error);
  }
}; 