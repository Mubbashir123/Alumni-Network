import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import styled from 'styled-components';
import profileImages from '../../data/profileImages';

const StyledAchievements = styled.div`
  --main-color: #323232;
  --font-color: #323232;
  --bg-color: lightgrey;
  --input-focus: #2d8cf0;
  --card-bg: #fff;

  .achievements-section {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .achievement-card {
    background-color: var(--card-bg);
    border-radius: 5px;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px 0 var(--main-color);
    overflow: hidden;
    padding: 1.5rem;
    position: relative;
  }

  .achievement-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .achievement-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--font-color);
  }

  .achievement-category {
    padding: 0.25rem 0.75rem;
    background-color: var(--input-focus);
    color: white;
    border-radius: 1rem;
    font-size: 0.875rem;
    font-weight: 600;
  }

  .achievement-content {
    color: var(--font-color);
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .achievement-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
    color: var(--font-color);
  }

  .achievement-alumni {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
  }

  .profile-image {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px solid var(--main-color);
    object-fit: cover;
  }

  .achievement-date {
    color: #666;
  }

  .no-achievements {
    text-align: center;
    padding: 2rem;
    background-color: var(--card-bg);
    border-radius: 5px;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px 0 var(--main-color);
    color: var(--font-color);
  }
`;

const sampleAchievements = [
  {
    id: 1,
    title: "Promoted to Senior Software Engineer at Google",
    description: "Recognized for exceptional technical leadership and contributions to the Google Cloud Platform team.",
    category: "Career Milestone",
    date: "2024-03-15",
    alumniName: "Sarah Johnson",
    batch: "2018",
    company: "Google",
    profileImage: "profile1"
  },
  {
    id: 2,
    title: "Received IEEE Outstanding Young Professional Award",
    description: "Awarded for significant contributions to the field of artificial intelligence and machine learning.",
    category: "Award",
    date: "2024-02-20",
    alumniName: "Michael Chen",
    batch: "2016",
    organization: "IEEE",
    profileImage: "profile2"
  },
  {
    id: 3,
    title: "Featured in Forbes 30 Under 30",
    description: "Recognized as one of the most promising young entrepreneurs in the technology sector.",
    category: "Recognition",
    date: "2024-01-10",
    alumniName: "Emily Rodriguez",
    batch: "2017",
    publication: "Forbes",
    profileImage: "profile3"
  },
  {
    id: 4,
    title: "Launched Successful AI Startup",
    description: "Founded and successfully launched an AI-powered healthcare platform that raised $5M in seed funding.",
    category: "Entrepreneurship",
    date: "2023-12-05",
    alumniName: "David Kim",
    batch: "2019",
    company: "HealthAI Solutions",
    profileImage: "profile4"
  },
  {
    id: 5,
    title: "Published Research in Nature Journal",
    description: "Co-authored groundbreaking research in quantum computing published in the prestigious Nature journal.",
    category: "Research",
    date: "2023-11-15",
    alumniName: "Alexandra Smith",
    batch: "2015",
    publication: "Nature",
    profileImage: "profile5"
  },
  {
    id: 6,
    title: "Appointed CTO at Fortune 500 Company",
    description: "Became the youngest CTO in the company's history, leading digital transformation initiatives.",
    category: "Career Milestone",
    date: "2023-10-20",
    alumniName: "James Wilson",
    batch: "2014",
    company: "TechCorp Inc.",
    profileImage: "profile6"
  },
  {
    id: 7,
    title: "Received National Innovation Award",
    description: "Awarded for developing sustainable energy solutions that reduced carbon emissions by 40%.",
    category: "Award",
    date: "2023-09-05",
    alumniName: "Priya Patel",
    batch: "2018",
    organization: "Ministry of Science & Technology",
    profileImage: "profile7"
  }
];

const Achievements = () => {
  const [achievements, setAchievements] = useState(sampleAchievements);
  const [loading, setLoading] = useState(false);

  return (
    <StyledAchievements>
      <div className="achievements-section">
        {achievements.map(achievement => (
          <div key={achievement.id} className="achievement-card">
            <div className="achievement-header">
              <h3 className="achievement-title">{achievement.title}</h3>
              <span className="achievement-category">{achievement.category}</span>
            </div>
            <p className="achievement-content">{achievement.description}</p>
            <div className="achievement-footer">
              <span className="achievement-date">
                {new Date(achievement.date).toLocaleDateString()}
              </span>
              <div className="achievement-alumni">
                <img 
                  src={profileImages[achievement.profileImage]} 
                  alt={achievement.alumniName}
                  className="profile-image"
                />
                <span>{achievement.alumniName} ({achievement.batch})</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </StyledAchievements>
  );
};

export default Achievements; 