
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import CardSearch from '@/components/card/CardSearch';
import MembershipCard from '@/components/card/MembershipCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Member {
  id: string;
  name: string;
  phone_number: string;
  card_number: string;
  car_model: string;
  expiry_date: string;
}

const Index = () => {
  const [foundMember, setFoundMember] = useState<Member | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const { user, isPublicAccess, setPublicAccess } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check URL parameters for public access
    const queryParams = new URLSearchParams(window.location.search);
    const publicParam = queryParams.get('public');
    
    if (publicParam === 'true') {
      setPublicAccess(true);
    }
  }, []);

  const searchMember = async (phoneNumber: string) => {
    setIsLoading(true);
    
    try {
      // Real Supabase query
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('phone_number', phoneNumber)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          setFoundMember(null);
          toast({
            title: "Member not found",
            description: "No member found with that phone number",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      } else if (data) {
        setFoundMember(data as Member);
        toast({
          title: "Member found",
          description: "Card details loaded successfully",
        });
      }
    } catch (error: any) {
      console.error('Error searching for member:', error);
      toast({
        title: "Search error",
        description: error.message || "There was a problem searching for the member",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // If not logged in and not in public access mode, redirect to auth
  useEffect(() => {
    if (!user && !isPublicAccess) {
      navigate('/auth');
    }
  }, [user, isPublicAccess]);

  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-green-600">CEE4EV Card Access</h1>
          <p className="text-muted-foreground mt-2">
            Search for member cards by phone number
          </p>
        </div>

        <Card className="max-w-xl mx-auto border-green-200">
          <CardHeader>
            <CardTitle className="text-green-600">Find Member Card</CardTitle>
          </CardHeader>
          <CardContent>
            <CardSearch onSearch={searchMember} isLoading={isLoading} />
          </CardContent>
        </Card>

        {foundMember && (
          <div className="mt-8 animate-fadeIn">
            <h2 className="text-2xl font-bold text-center mb-6 text-green-600">Member Card</h2>
            <MembershipCard
              cardNumber={foundMember.card_number}
              name={foundMember.name}
              expiryDate={foundMember.expiry_date}
              phoneNumber={foundMember.phone_number}
              carModel={foundMember.car_model}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Index;
