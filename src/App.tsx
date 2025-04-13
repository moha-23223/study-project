import React from 'react';
import Card from './components/dummies/Card';

const App: React.FC = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>GitHub Client</h1>
      <Card title="Repo Name" description="Cool repo description." />
    </div>
  );
};

export default App;
