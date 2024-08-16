import React from 'react';
import { motion } from 'framer-motion';
import MovieList from '@/components/MovieList';
import { LampContainer } from '@/components/ui/lamp';

const HomePage: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
    className="px-4 py-8 bg-black"
  >   <LampContainer>
  <motion.h1
    initial={{ opacity: 0.5, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{
      delay: 0.3,
      duration: 0.8,
      ease: "easeInOut",
    }}
    className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
  >
     Welcome to<br /> Movie Review
  </motion.h1>
</LampContainer>
    
    <MovieList />
  </motion.div>
);

export default HomePage;
