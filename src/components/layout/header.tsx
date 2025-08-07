'use client';

import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-100 bg-white/80 backdrop-blur-md px-6 shadow-sm">
      <div className="flex items-center space-x-4">
        
      </div>
      
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="icon"
          className="relative hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-105"
        >
          <Bell className="h-5 w-5 text-gray-600 hover:text-gray-800" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">3</span>
          </span>
        </Button>
        
        <div className="flex items-center space-x-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl px-3 py-2 border border-green-100 hover:shadow-md transition-all duration-200">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-md">
            <span className="text-sm font-bold text-white">A</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-800">Admin TPQ</span>
            <span className="text-xs text-gray-500">Online</span>
          </div>
        </div>
      </div>
    </header>
  );
}
