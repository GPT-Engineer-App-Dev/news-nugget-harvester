import React, { useState } from 'react';
import { ExternalLink, MessageSquare, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CommentList from './CommentList';
import { motion } from 'framer-motion';

const StoryCard = ({ story }) => {
  const [showComments, setShowComments] = useState(false);

  return (
    <motion.div 
      className="bg-card text-card-foreground shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-semibold mb-3">{story.title}</h2>
      <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
        <span className="flex items-center">
          <ChevronUp className="mr-1 h-4 w-4 text-primary" />
          {story.points}
        </span>
        <a
          href={story.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-primary hover:text-primary/80"
        >
          Read more <ExternalLink className="ml-1 h-4 w-4" />
        </a>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowComments(!showComments)}
        className="w-full mb-4"
      >
        <MessageSquare className="mr-2 h-4 w-4" />
        {showComments ? 'Hide Comments' : 'Show Comments'}
      </Button>
      {showComments && <CommentList storyId={story.objectID} />}
    </motion.div>
  );
};

export default StoryCard;