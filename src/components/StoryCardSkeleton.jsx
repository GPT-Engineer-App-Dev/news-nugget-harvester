import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const StoryCardSkeleton = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 animate-pulse">
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-4" />
      <Skeleton className="h-8 w-full mb-4" />
    </div>
  );
};

export default StoryCardSkeleton;