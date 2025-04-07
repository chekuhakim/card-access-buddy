
export type Member = {
  id: string;
  user_id: string | null;
  name: string;
  phone_number: string;
  card_number: string;
  car_model: string;
  expiry_date: string;
  created_at: string;
  updated_at: string;
};

export interface Database {
  public: {
    Tables: {
      members: {
        Row: Member;
        Insert: Omit<Member, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Member, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
}
