export const alumniData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    batch: '2015',
    branch: 'Computer Science',
    currentCompany: 'Google',
    position: 'Senior Software Engineer',
    industry: 'Technology',
    location: 'Mountain View, CA',
    bio: 'Passionate about AI and Machine Learning. Currently working on Google Cloud Platform.',
    socialMedia: {
      linkedin: 'linkedin.com/in/johndoe',
      twitter: '@johndoe'
    }
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    batch: '2017',
    branch: 'Electrical Engineering',
    currentCompany: 'Tesla',
    position: 'Electrical Systems Engineer',
    industry: 'Automotive',
    location: 'Austin, TX',
    bio: 'Working on next-gen electric vehicle systems. Love to mentor young engineers.',
    socialMedia: {
      linkedin: 'linkedin.com/in/janesmith',
      twitter: '@janesmith'
    }
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    batch: '2016',
    branch: 'Mechanical Engineering',
    currentCompany: 'SpaceX',
    position: 'Propulsion Engineer',
    industry: 'Aerospace',
    location: 'Hawthorne, CA',
    bio: 'Working on rocket propulsion systems. Dreaming of Mars colonization.',
    socialMedia: {
      linkedin: 'linkedin.com/in/mikejohnson',
      twitter: '@mikejohnson'
    }
  }
];

export const communityPosts = [
  {
    id: 1,
    author: {
      id: 1,
      name: 'John Doe',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random'
    },
    title: 'Looking for Python Developers',
    content: 'Our team at Google is hiring Python developers. If you have experience with Django or Flask, please reach out!',
    category: 'Job Opportunities',
    tags: ['python', 'jobs', 'google'],
    likes: 45,
    comments: 12,
    createdAt: '2024-02-20T10:30:00Z'
  },
  {
    id: 2,
    author: {
      id: 2,
      name: 'Jane Smith',
      avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=random'
    },
    title: 'EV Industry Trends 2024',
    content: 'Sharing my insights on the latest trends in electric vehicle technology and what to expect in the coming years.',
    category: 'Industry Insights',
    tags: ['ev', 'technology', 'trends'],
    likes: 78,
    comments: 23,
    createdAt: '2024-02-19T15:45:00Z'
  },
  {
    id: 3,
    author: {
      id: 3,
      name: 'Mike Johnson',
      avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=random'
    },
    title: 'SpaceX Internship Program',
    content: 'SpaceX is opening applications for summer internships. Great opportunity for aerospace enthusiasts!',
    category: 'Internships',
    tags: ['spacex', 'internship', 'aerospace'],
    likes: 92,
    comments: 34,
    createdAt: '2024-02-18T09:15:00Z'
  },
  {
    id: 4,
    author: {
      id: 1,
      name: 'John Doe',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random'
    },
    title: 'AI/ML Study Group',
    content: 'Starting a study group for AI and Machine Learning. Anyone interested in joining?',
    category: 'Study Groups',
    tags: ['ai', 'ml', 'study-group'],
    likes: 56,
    comments: 18,
    createdAt: '2024-02-17T14:20:00Z'
  }
];

export const categories = [
  'Job Opportunities',
  'Industry Insights',
  'Internships',
  'Study Groups',
  'Events',
  'General Discussion'
]; 