
import React from 'react';
import Navbar from './Navbar';
import { Toaster } from '@/components/ui/toaster';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-black text-green-500 py-4 text-center">
        <p>© {new Date().getFullYear()} CEE4EV Card Access</p>
      </footer>
      <Toaster />
    </div>
  );
};

export default Layout;
