import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

const fetchComments = async (storyId) => {
  const response = await fetch(`https://hn.algolia.com/api/v1/items/${storyId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }
  return response.json();
};

const Comment = ({ comment, depth = 0 }) => (
  <motion.div 
    className={`border-l-2 border-primary/20 pl-4 mb-4 ${depth > 0 ? 'ml-4' : ''}`}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay: depth * 0.1 }}
  >
    <p className="text-sm text-muted-foreground mb-2">{comment.author}</p>
    <div className="text-sm prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: comment.text }} />
    {comment.children && (
      <div className="mt-2">
        {comment.children.map((childComment) => (
          <Comment key={childComment.id} comment={childComment} depth={depth + 1} />
        ))}
      </div>
    )}
  </motion.div>
);

const CommentList = ({ storyId }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['comments', storyId],
    queryFn: () => fetchComments(storyId),
  });

  if (isLoading) {
    return (
      <div>
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    );
  }

  if (error) {
    return <div className="text-destructive">Error loading comments</div>;
  }

  return (
    <motion.div 
      className="mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-lg font-semibold mb-4">Comments</h3>
      {data.children.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </motion.div>
  );
};

export default CommentList;