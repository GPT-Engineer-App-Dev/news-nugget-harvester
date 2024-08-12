import React, { useState } from 'react';
import { ExternalLink, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CommentList from './CommentList';

const StoryCard = ({ story }) => {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold mb-2">{story.title}</h2>
      <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
        <span>Points: {story.points}</span>
        <a
          href={story.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-blue-500 hover:text-blue-700"
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
    </div>
  );
};

export default StoryCard;