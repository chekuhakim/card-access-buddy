
import React from 'react';
import Navbar from './Navbar';
import { Toaster } from '@/components/ui/toaster';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-secondary py-4 text-center text-secondary-foreground">
        <p>© {new Date().getFullYear()} Card Access Buddy</p>
      </footer>
      <Toaster />
    </div>
  );
};

export default Layout;
