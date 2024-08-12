import React, { useState } from 'react';
import HackerNewsList from '../components/HackerNewsList';
import SearchBar from '../components/SearchBar';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Hacker News Top Stories</h1>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <HackerNewsList searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default Index;