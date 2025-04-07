
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  phone_number: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  card_number: z.string().min(8, {
    message: "Card number must be at least 8 characters.",
  }),
  car_model: z.string().min(2, {
    message: "Car model must be at least 2 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const AddMemberPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone_number: "",
      card_number: "",
      car_model: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      if (!user) {
        toast({
          title: "Authentication Error",
          description: "You must be logged in to add members.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('members')
        .insert({
          user_id: user.id,
          name: data.name,
          phone_number: data.phone_number,
          card_number: data.card_number,
          car_model: data.car_model,
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Member has been added successfully.",
      });

      navigate('/members');
    } catch (error: any) {
      console.error('Error adding member:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to add member.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-green-600">Add New Member</h1>
          <p className="text-muted-foreground mt-2">
            Create a new membership for CEE4EV
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-green-600">Member Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter member name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 0123456789" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="card_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter card number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="car_model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Car Model</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Tesla Model 3" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate('/members')}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Add Member
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AddMemberPage;
