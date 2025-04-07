
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Battery, Lightning, ChevronDown } from 'lucide-react';

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
        <div className="card-front rounded-xl overflow-hidden shadow-xl bg-gradient-to-br from-emerald-500 to-blue-600 text-white p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-sm opacity-80">EV Access</p>
              <p className="text-xl font-bold">CHARGE PASS</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
              <Lightning className="h-6 w-6 text-emerald-300" />
            </div>
          </div>
          
          <div className="pt-6">
            <div className="flex items-center space-x-2 mb-2">
              <Battery className="h-5 w-5 text-emerald-300" />
              <div className="h-2 w-24 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full w-4/5 bg-emerald-300 rounded-full"></div>
              </div>
            </div>
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
          
          {/* Decorative circuit lines */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-10 right-16 w-16 h-px bg-white/20"></div>
            <div className="absolute top-10 right-16 w-px h-12 bg-white/20"></div>
            <div className="absolute bottom-14 left-12 w-12 h-px bg-white/20"></div>
            <div className="absolute bottom-14 left-12 w-px h-8 bg-white/20"></div>
          </div>
        </div>
        
        {/* Back of card */}
        <div className="card-back rounded-xl overflow-hidden shadow-xl bg-gradient-to-br from-blue-600 to-emerald-700 text-white p-6">
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
            <div className="pt-4 text-center text-sm opacity-80 flex items-center justify-center">
              <p>Tap card to flip</p>
              <ChevronDown className="h-4 w-4 ml-1 animate-bounce" />
            </div>
          </div>
          
          {/* Decorative circuit patterns */}
          <div className="absolute bottom-6 right-6 opacity-20">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 5 H35 V35 H5 Z" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <path d="M10 10 H30 V30 H10 Z" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <path d="M5 20 H35" stroke="currentColor" strokeWidth="0.5" />
              <path d="M20 5 V35" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="20" cy="20" r="15" stroke="currentColor" strokeWidth="0.5" fill="none" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipCard;
