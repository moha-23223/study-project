import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';

import Checkbox from 'components/ui/Checkbox';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import MultiDropdown from 'components/ui/MultiDropdown';
import Loader from 'components/ui/Loader';

interface Props {
  children: React.ReactNode;
}

interface RepoDetailsProps {
  onBack: () => void;
  repoIndex: number;
}

const RepoDetails: React.FC<RepoDetailsProps> = ({ onBack, repoIndex }) => {
  const branches = ['branch-1', 'branch-2', 'branch-3', 'branch-4', 'branch-5'];

  return (
    <div className="repo-details">
      <div className="repo-header">
        <button className="back-btn" onClick={onBack}>← </button>
        <img
          src={
            repoIndex === 1
              ? 'https://images.unsplash.com/photo-1589927986089-35812388d1a1?auto=format&fit=crop&w=50&h=50'
              : 'https://via.placeholder.com/24/FF5C5C/FFFFFF?text=G'
          }
          alt="G"
          className="repo-avatar"
        />
        <span className="repo-name">git-repo-name #{repoIndex + 1}</span>
      </div>

      <div className="repo-section">
        <h3>Description</h3>
        <p>My first repository on GitHub!</p>
      </div>

      <div className="repo-section">
        <h3>Branches List</h3>
        <ul className="branch-list">
          {branches.map((branch) => (
            <li key={branch}>{branch}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const AppLayout: React.FC<Props> = ({ children }) => {
  const [selectedRepo, setSelectedRepo] = useState<number | null>(null);

  return (
    <div className="app-layout">
      <Toaster />

      <header className="app-header">
        <h1 className="app-logo">My App</h1>
        <div className="app-header-controls">
          <MultiDropdown />
        </div>
      </header>

      <section className="ui-preview">
        <p>Loading large...</p>
        <Loader size="l" />
        <p>Loading medium...</p>
        <Loader size="m" />
        <p>Loading small...</p>
        <Loader size="s" />
        <Checkbox checked={false} onChange={(val) => console.log('Checked:', val)} />
        <Checkbox checked={true} />
        <Checkbox checked={true} disabled />
      </section>

      <main className="main-content">
        <div className="org-search-container">
          <div className="org-search-box">
            <Input
              type="text"
              placeholder="Enter organization name"
              className="org-search-input"
            />
            <Button className="org-search-button">🔍</Button>
          </div>

          {/* Conditional Rendering */}
          {selectedRepo !== null ? (
            <RepoDetails repoIndex={selectedRepo} onBack={() => setSelectedRepo(null)} />
          ) : (
            <>
              {Array.from({ length: 8 }).map((_, i) => (
                <div className="cardRoot" key={i}>
                  <img
                    className="repo-avatar"
                    src={
                      i === 1
                        ? 'https://images.unsplash.com/photo-1589927986089-35812388d1a1?auto=format&fit=crop&w=50&h=50'
                        : 'https://via.placeholder.com/50/FF5C5C/FFFFFF?text=G'
                    }
                    alt="R"
                    onClick={() => setSelectedRepo(i)}
                    style={{ cursor: 'pointer' }}
                  />
                  <div className="repo-content">
                    <strong className="repo-name">git-repo-name</strong>
                    <p className="repo-user">git-user</p>
                    <div className="repo-meta">
                      <span className="repo-stars">⭐ 123</span>
                      <span className="repo-separator">•</span>
                      <span className="repo-updated">Updated 21 Jul</span>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Any nested children passed in */}
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
