import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import profileImages from '../../data/profileImages';
import styled from 'styled-components';

const StyledAlumniList = styled.div`
  --input-focus: #2d8cf0;
  --font-color: #323232;
  --font-color-sub: #666;
  --bg-color: #fff;
  --bg-color-alt: #666;
  --main-color: #323232;
  --text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
`;

const SearchSection = styled.div`
  background: lightgrey;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  box-shadow: 4px 4px var(--main-color);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const SearchBar = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  background-color: var(--bg-color);
  box-shadow: 4px 4px var(--main-color);
  font-size: 15px;
  font-weight: 600;
  color: var(--font-color);
  padding: 5px 10px 5px 2.5rem;
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

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--font-color);
  opacity: 0.7;
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
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
  cursor: pointer;
  transition: var(--transition);

  &:focus {
    border: 2px solid var(--input-focus);
  }
`;

const AlumniGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const AlumniCard = styled.div`
  background: var(--bg-color);
  border-radius: 5px;
  padding: 1.5rem;
  border: 2px solid var(--main-color);
  box-shadow: 4px 4px var(--main-color);
  transition: var(--transition);
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 6px 6px var(--main-color);
  }
`;

const ProfileImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 5px;
  object-fit: cover;
  border: 2px solid var(--main-color);
  box-shadow: 4px 4px var(--main-color);
`;

const AlumniInfo = styled.div`
  flex: 1;
`;

const Name = styled.h3`
  font-size: 25px;
  font-weight: 900;
  color: var(--main-color);
  margin-bottom: 0.5rem;
`;

const Detail = styled.p`
  color: var(--font-color);
  margin-bottom: 0.25rem;
  font-size: 15px;
  font-weight: 600;
`;

const Tag = styled.span`
  display: inline-block;
  background: var(--bg-color);
  color: var(--font-color);
  padding: 0.25rem 0.75rem;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  box-shadow: 4px 4px var(--main-color);
  font-size: 15px;
  font-weight: 600;
  margin-right: 0.5rem;
  margin-top: 0.5rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 0.5rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  background-color: var(--bg-color);
  box-shadow: 4px 4px var(--main-color);
  font-size: 15px;
  font-weight: 600;
  color: var(--font-color);
  cursor: pointer;
  transition: var(--transition);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 6px 6px var(--main-color);
  }

  &:active {
    box-shadow: 0px 0px var(--main-color);
    transform: translate(3px, 3px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${props => props.$active && `
    background-color: var(--input-focus);
    color: white;
  `}
`;

export default function AlumniList() {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('All');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Get unique values for filters
  const batches = ['All', ...new Set(alumni.map(alum => alum.batch))].sort();
  const branches = ['All', ...new Set(alumni.map(alum => alum.branch))].sort();

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'alumni'));
        const alumniData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAlumni(alumniData);
      } catch (err) {
        setError('Failed to fetch alumni data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, []);

  // Filter and sort alumni
  const filteredAlumni = alumni
    .filter(alum => {
      const matchesSearch = 
        (alum.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (alum.currentCompany?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (alum.position?.toLowerCase() || '').includes(searchQuery.toLowerCase());
      const matchesBatch = selectedBatch === 'All' || alum.batch === selectedBatch;
      const matchesBranch = selectedBranch === 'All' || alum.branch === selectedBranch;
      return matchesSearch && matchesBatch && matchesBranch;
    })
    .sort((a, b) => (a.name || '').localeCompare(b.name || ''));

  // Pagination
  const totalPages = Math.ceil(filteredAlumni.length / itemsPerPage);
  const paginatedAlumni = filteredAlumni.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Helper function to get profile image
  const getProfileImage = (index) => {
    const imageKey = `profile${(index % 10) + 1}`;
    return profileImages[imageKey] || profileImages.defaultProfile;
  };

  if (loading) return <div className="p-4 text-center">Loading alumni...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <StyledAlumniList>
      <SearchSection>
        <SearchBar>
          <SearchIcon>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </SearchIcon>
          <SearchInput
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, company, or position..."
          />
        </SearchBar>
        <FilterGrid>
          <Select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
          >
            <option key="all-batches" value="All">All Batches</option>
            {batches.filter(batch => batch !== 'All').map(batch => (
              <option key={`batch-${batch}`} value={batch}>{batch}</option>
            ))}
          </Select>
          <Select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
          >
            <option key="all-branches" value="All">All Branches</option>
            {branches.filter(branch => branch !== 'All').map(branch => (
              <option key={`branch-${branch}`} value={branch}>{branch}</option>
            ))}
          </Select>
        </FilterGrid>
      </SearchSection>

      <AlumniGrid>
        {paginatedAlumni.map((alum, index) => (
          <AlumniCard key={alum.id}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <ProfileImage
                src={getProfileImage(index)}
                alt={alum.name}
              />
              <AlumniInfo>
                <Name>{alum.name}</Name>
                <Detail>{alum.position}</Detail>
                <Detail>{alum.currentCompany}</Detail>
                <Tag>Batch: {alum.batch}</Tag>
                <Tag>{alum.branch}</Tag>
              </AlumniInfo>
            </div>
          </AlumniCard>
        ))}
      </AlumniGrid>

      {totalPages > 1 && (
        <Pagination>
          <PageButton
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </PageButton>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <PageButton
              key={page}
              onClick={() => setCurrentPage(page)}
              $active={currentPage === page}
            >
              {page}
            </PageButton>
          ))}
          <PageButton
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </PageButton>
        </Pagination>
      )}
    </StyledAlumniList>
  );
}