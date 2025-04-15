import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import MultiDropdown from 'components/ui/MultiDropdown';
import Loader from 'components/ui/Loader';

interface Props {
  children: React.ReactNode;
}

interface RepoDetailsProps {
  onBack: () => void;
  repo: any;
}

const fetchReposByOrg = async (orgName: string) => {
  const res = await fetch(`https://api.github.com/orgs/${orgName}/repos`);
  if (!res.ok) throw new Error('Failed to fetch organization repos');
  return res.json();
};
const fetchReposByUser = async (username: string) => {
  const res = await fetch(`https://api.github.com/users/${username}/repos`);
  if (!res.ok) throw new Error('Failed to fetch user repos');
  return res.json();
};

const fetchRepoDetails = async (owner: string, repo: string) => {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
  if (!res.ok) throw new Error('Failed to fetch repo details');
  return res.json();
};

const RepoDetails: React.FC<RepoDetailsProps> = ({ onBack, repo }) => {
  return (
    <div className="repo-details">
      <div className="repo-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <img src={repo.owner?.avatar_url} alt={repo.name} className="repo-avatar" />
        <span className="repo-name">{repo.full_name}</span>
      </div>

      <div className="repo-section">
        <h3>Description</h3>
        <p>{repo.description || 'No description provided.'}</p>
      </div>

      <div className="repo-section">
        <h3>Default Branch</h3>
        <p>{repo.default_branch}</p>
      </div>

      <div className="repo-section">
        <h3>Stats</h3>
        <p>⭐ Stars: {repo.stargazers_count}</p>
        <p>🍴 Forks: {repo.forks_count}</p>
        <p>📅 Updated: {new Date(repo.updated_at).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

const AppLayout: React.FC<Props> = ({ children }) => {
  interface SearchOption {
    label: string;
    value: string;
    type: 'user' | 'org';
  }
  
  const [selectedOrg, setSelectedOrg] = useState<SearchOption[]>([]);
   // Accepting array for multiple selections
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [repoList, setRepoList] = useState<any[]>([]);
  const [repoDetails, setRepoDetails] = useState<any | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async () => {
    if (!selectedOrg.length || !searchTerm.trim()) {
      alert('Please select whether you are searching by user or organization, and enter a name.');
      return;
    }
  
    setIsLoading(true);
    setRepoDetails(null);
    setShowResults(false);
  
    try {
      const selectedOption = selectedOrg[0]; // full object: { label, value, type }
  
      const repos =
        selectedOption.type === 'org' 
          ? await fetchReposByOrg(searchTerm.trim())
          : await fetchReposByUser(searchTerm.trim());
  
      setRepoList(repos);
      setShowResults(true);
    } catch (err) {
      console.error('API call failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-layout">
      <Toaster />

      <header className="app-header">
        <h1 className="app-logo">My App</h1>
        <div className="app-header-controls">
        <MultiDropdown
          onSelect={(selectedOptions) => setSelectedOrg(selectedOptions)}
          />

        </div>
      </header>

      <main className="main-content">
        <div className="org-search-container">
          <div className="org-search-box">
            <Input
              type="text"
              placeholder="Search repository..."
              className="org-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
            />
            <Button className="org-search-button" onClick={handleSearch}>
              Search
            </Button>
          </div>

          {isLoading && <Loader size="m" />}

          {!isLoading && showResults && (
            <>
              {repoDetails ? (
                <RepoDetails repo={repoDetails} onBack={() => setRepoDetails(null)} />
              ) : (
                <div className="repo-list">
                  {repoList.map((repo) => (
                    <div className="cardRoot" key={repo.id}>
                      <img
                        className="repo-avatar"
                        src={repo.owner.avatar_url}
                        alt={repo.name}
                        onClick={async () => {
                          try {
                            const details = await fetchRepoDetails(repo.owner.login, repo.name);
                            setRepoDetails(details);
                          } catch (e) {
                            console.error(e);
                          }
                        }}
                        style={{ cursor: 'pointer' }}
                      />
                      <div className="repo-content">
                        <strong className="repo-name">{repo.name}</strong>
                        <p className="repo-user">{repo.owner.login}</p>
                        <div className="repo-meta">
                          <span className="repo-stars">⭐ {repo.stargazers_count}</span>
                          <span className="repo-separator">•</span>
                          <span className="repo-updated">
                            Updated {new Date(repo.updated_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
