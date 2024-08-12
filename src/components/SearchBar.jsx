import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <motion.div 
      className="relative mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <Input
        type="text"
        placeholder="Search stories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
    </motion.div>
  );
};

export default SearchBar;