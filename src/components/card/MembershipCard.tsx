
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MembershipCardProps {
  cardNumber: string;
  name: string;
  expiryDate: string;
}

const MembershipCard = ({ cardNumber, name, expiryDate }: MembershipCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Format card number with spaces for readability
  const formattedCardNumber = cardNumber
    .replace(/\s/g, '')
    .match(/.{1,4}/g)
    ?.join(' ') || cardNumber;

  return (
    <div className="card-container w-full max-w-md mx-auto" onClick={toggleFlip}>
      <div className={cn("membership-card relative h-56 w-full rounded-xl cursor-pointer", 
                        isFlipped ? "membership-card-flip" : "")}>
        
        {/* Front of card */}
        <div className="card-front rounded-xl overflow-hidden shadow-xl bg-gradient-to-br from-blue-600 to-indigo-800 text-white p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-sm opacity-80">Card Access</p>
              <p className="text-xl font-bold">MEMBERSHIP</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
              <span className="text-xl font-bold">CA</span>
            </div>
          </div>
          
          <div className="pt-8">
            <p className="text-xl tracking-widest font-mono">{formattedCardNumber}</p>
          </div>
          
          <div className="flex justify-between items-end pt-4">
            <div>
              <p className="text-xs opacity-80">CARDHOLDER NAME</p>
              <p className="font-medium">{name}</p>
            </div>
            <div>
              <p className="text-xs opacity-80">EXPIRES</p>
              <p className="font-medium">{expiryDate}</p>
            </div>
          </div>
        </div>
        
        {/* Back of card */}
        <div className="card-back rounded-xl overflow-hidden shadow-xl bg-gradient-to-br from-indigo-800 to-blue-900 text-white p-6">
          <div className="w-full bg-black/50 h-12 my-4"></div>
          <div className="flex flex-col space-y-4 mt-8">
            <div>
              <p className="text-xs opacity-80">CARD NUMBER</p>
              <p className="font-medium">{formattedCardNumber}</p>
            </div>
            <div>
              <p className="text-xs opacity-80">MEMBER SINCE</p>
              <p className="font-medium">2023</p>
            </div>
            <div className="pt-4 text-center text-sm opacity-80">
              <p>Tap card to flip</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipCard;
