
import React from 'react';
import { CreditCard, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-primary text-primary-foreground py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <CreditCard className="h-6 w-6" />
          <span className="text-xl font-bold">Card Access Buddy</span>
        </Link>
        
        <div className="flex space-x-6">
          <Link to="/" className="flex items-center space-x-2 hover:text-white/80 transition-colors">
            <CreditCard className="h-5 w-5" />
            <span>Cards</span>
          </Link>
          <Link to="/members" className="flex items-center space-x-2 hover:text-white/80 transition-colors">
            <Users className="h-5 w-5" />
            <span>Members</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
