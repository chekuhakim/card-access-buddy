
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/layout/Layout';
import { Label } from '@/components/ui/label';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Special case for public card access
  const [publicUsername, setPublicUsername] = useState('');
  const [publicPassword, setPublicPassword] = useState('');

  const handleSubmitPublicAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (publicUsername === 'cee4ev' && publicPassword === 'dcfc') {
        // If credentials match, navigate to the card view page
        navigate('/');
        toast({
          title: "Access granted",
          description: "Welcome to the public card view.",
        });
      } else {
        toast({
          title: "Access denied",
          description: "Invalid credentials for public access.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        
        if (error) throw error;
        
        toast({
          title: "Sign up successful",
          description: "Please check your email for verification.",
        });
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        toast({
          title: "Logged in successfully",
          description: "Welcome back!",
        });
        
        navigate('/members');
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      toast({
        title: "Authentication error",
        description: error.message || "An error occurred during authentication",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="max-w-md mx-auto grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-green-500">
                {isSignUp ? "Create an Account" : "Login to CEE4EV"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={isLoading}
                >
                  {isLoading 
                    ? "Processing..." 
                    : isSignUp 
                      ? "Sign Up" 
                      : "Login"
                  }
                </Button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-sm text-green-600 hover:text-green-700"
                  >
                    {isSignUp 
                      ? "Already have an account? Log in" 
                      : "Don't have an account? Sign up"
                    }
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center text-green-500">Public Card Access</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitPublicAccess} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="publicUsername">Username</Label>
                  <Input
                    id="publicUsername"
                    type="text"
                    value={publicUsername}
                    onChange={(e) => setPublicUsername(e.target.value)}
                    required
                    placeholder="Enter username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="publicPassword">Password</Label>
                  <Input
                    id="publicPassword"
                    type="password"
                    value={publicPassword}
                    onChange={(e) => setPublicPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={isLoading}
                >
                  Access Card
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AuthPage;
