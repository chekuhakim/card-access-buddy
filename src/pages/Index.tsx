
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import CardSearch from '@/components/card/CardSearch';
import MembershipCard from '@/components/card/MembershipCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

interface Member {
  id: string;
  name: string;
  phone_number: string;
  card_number: string;
  expiry_date: string;
}

const Index = () => {
  const [foundMember, setFoundMember] = useState<Member | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const searchMember = async (phoneNumber: string) => {
    setIsLoading(true);
    
    try {
      // When Supabase is integrated, we'll replace this with actual Supabase query
      // For now, using mock data to demonstrate UI functionality
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data - this will be replaced with Supabase query
      if (phoneNumber === '1234567890') {
        setFoundMember({
          id: '1',
          name: 'John Doe',
          phone_number: '1234567890',
          card_number: '4111223344556677',
          expiry_date: '12/25'
        });
        toast({
          title: "Member found",
          description: "Card details loaded successfully",
        });
      } else {
        setFoundMember(null);
        toast({
          title: "Member not found",
          description: "No member found with that phone number",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error searching for member:', error);
      toast({
        title: "Search error",
        description: "There was a problem searching for the member",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Card Access Buddy</h1>
          <p className="text-muted-foreground mt-2">
            Search for member cards by phone number
          </p>
        </div>

        <Card className="max-w-xl mx-auto">
          <CardHeader>
            <CardTitle>Find Member Card</CardTitle>
          </CardHeader>
          <CardContent>
            <CardSearch onSearch={searchMember} isLoading={isLoading} />
          </CardContent>
        </Card>

        {foundMember && (
          <div className="mt-8 animate-fadeIn">
            <h2 className="text-2xl font-bold text-center mb-6">Member Card</h2>
            <MembershipCard
              cardNumber={foundMember.card_number}
              name={foundMember.name}
              expiryDate={foundMember.expiry_date}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Index;
