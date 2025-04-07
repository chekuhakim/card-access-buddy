
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface CardSearchProps {
  onSearch: (phoneNumber: string) => Promise<void>;
  isLoading: boolean;
}

const CardSearch = ({ onSearch, isLoading }: CardSearchProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber.trim()) {
      toast({
        title: "Phone number required",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await onSearch(phoneNumber);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <div className="relative">
          <Input 
            id="phoneNumber"
            type="text"
            placeholder="Enter member phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="pl-10 border-green-200 focus-visible:ring-green-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-green-500" />
        </div>
      </div>
      <Button 
        type="submit" 
        className="w-full bg-green-600 hover:bg-green-700 text-white" 
        disabled={isLoading}
      >
        {isLoading ? "Searching..." : "Find Member Card"}
      </Button>
    </form>
  );
};

export default CardSearch;
