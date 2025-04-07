import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import MembershipCard from '@/components/card/MembershipCard';
import type { Member } from '@/types/supabase';

const MembersPage = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('members')
        .select('*');
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setMembers(data);
      }
    } catch (error: any) {
      console.error('Error fetching members:', error);
      toast({
        title: "Error",
        description: "Failed to fetch members: " + error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewCard = (member: Member) => {
    setSelectedMember(member);
    setIsDialogOpen(true);
  };

  const handleAddMember = () => {
    navigate('/members/add');
  };

  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.phone_number.includes(searchTerm) ||
    member.card_number.includes(searchTerm) ||
    member.car_model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-green-600">Members</h1>
            <p className="text-muted-foreground mt-2">
              View and manage all member information
            </p>
          </div>
          <Button 
            onClick={handleAddMember} 
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Member
          </Button>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-green-600">Member List</CardTitle>
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
                      <TableHead>Car Model</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMembers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
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
                          <TableCell>{member.car_model}</TableCell>
                          <TableCell>{member.expiry_date}</TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleViewCard(member)}
                              className="border-green-500 text-green-600 hover:bg-green-50"
                            >
                              View Card
                            </Button>
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

      {/* Membership Card Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-green-600">Membership Card</DialogTitle>
          </DialogHeader>
          {selectedMember && (
            <MembershipCard
              name={selectedMember.name}
              cardNumber={selectedMember.card_number}
              expiryDate={selectedMember.expiry_date}
              phoneNumber={selectedMember.phone_number}
              carModel={selectedMember.car_model}
            />
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default MembersPage;
