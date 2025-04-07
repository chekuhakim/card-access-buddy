
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Member {
  id: string;
  name: string;
  phone_number: string;
  card_number: string;
  expiry_date: string;
}

const MembersPage = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This will be replaced with Supabase query after integration
    // Simulating API call
    const fetchMembers = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - will be replaced with actual Supabase data
        const mockMembers = [
          {
            id: '1',
            name: 'John Doe',
            phone_number: '1234567890',
            card_number: '4111223344556677',
            expiry_date: '12/25'
          },
          {
            id: '2',
            name: 'Jane Smith',
            phone_number: '9876543210',
            card_number: '5111223344556688',
            expiry_date: '10/26'
          },
          {
            id: '3',
            name: 'Mike Johnson',
            phone_number: '5556667777',
            card_number: '3711223344557799',
            expiry_date: '08/24'
          }
        ];
        
        setMembers(mockMembers);
      } catch (error) {
        console.error('Error fetching members:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMembers();
  }, []);

  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.phone_number.includes(searchTerm) ||
    member.card_number.includes(searchTerm)
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Members</h1>
          <p className="text-muted-foreground mt-2">
            View and manage all member information
          </p>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Member List</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search members..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-pulse text-center">
                  <p className="text-muted-foreground">Loading members...</p>
                </div>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Phone Number</TableHead>
                      <TableHead>Card Number</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMembers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          {members.length === 0 ? 
                            "No members found" : 
                            "No members match your search"}
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredMembers.map((member) => (
                        <TableRow key={member.id}>
                          <TableCell className="font-medium">{member.name}</TableCell>
                          <TableCell>{member.phone_number}</TableCell>
                          <TableCell>
                            {member.card_number.slice(0, 4)}...{member.card_number.slice(-4)}
                          </TableCell>
                          <TableCell>{member.expiry_date}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">View Card</Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default MembersPage;
