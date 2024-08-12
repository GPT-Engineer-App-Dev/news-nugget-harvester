import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import HackerNewsList from '../components/HackerNewsList';
import SearchBar from '../components/SearchBar';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="flex justify-between items-center mb-8">
          <motion.h1 
            className="text-4xl font-bold text-primary"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            HackerPulse: Top Tech Tales
          </motion.h1>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
          </Button>
        </div>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <HackerNewsList searchTerm={searchTerm} />
      </motion.div>
    </div>
  );
};

export default Index;