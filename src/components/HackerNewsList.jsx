import React from 'react';
import { useQuery } from '@tanstack/react-query';
import StoryCard from './StoryCard';
import StoryCardSkeleton from './StoryCardSkeleton';
import { motion } from 'framer-motion';

const fetchTopStories = async () => {
  const response = await fetch('https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=100');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const HackerNewsList = ({ searchTerm }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['topStories'],
    queryFn: fetchTopStories,
  });

  if (error) return <div className="text-destructive">Error fetching stories</div>;

  const filteredStories = data?.hits.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {isLoading
        ? Array(12).fill().map((_, index) => <StoryCardSkeleton key={index} />)
        : filteredStories.map((story, index) => (
            <motion.div
              key={story.objectID}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <StoryCard story={story} />
            </motion.div>
          ))
      }
    </motion.div>
  );
};

export default HackerNewsList;