
import React from 'react';
import { CreditCard, Users, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const { user, signOut, isPublicAccess } = useAuth();

  return (
    <nav className="bg-black text-green-500 py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <CreditCard className="h-6 w-6" />
          <span className="text-xl font-bold">CEE4EV</span>
        </Link>
        
        <div className="flex space-x-6 items-center">
          <Link to="/" className="flex items-center space-x-2 hover:text-green-300 transition-colors">
            <CreditCard className="h-5 w-5" />
            <span>Cards</span>
          </Link>
          
          {(user || isPublicAccess) ? (
            <>
              {user && (
                <Link to="/members" className="flex items-center space-x-2 hover:text-green-300 transition-colors">
                  <Users className="h-5 w-5" />
                  <span>Members</span>
                </Link>
              )}
              
              {user && (
                <Button 
                  variant="outline" 
                  className="border-green-500 text-green-500 hover:bg-green-500 hover:text-black"
                  onClick={() => signOut()}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              )}
            </>
          ) : (
            <Link to="/auth">
              <Button 
                variant="outline" 
                className="border-green-500 text-green-500 hover:bg-green-500 hover:text-black"
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
