import React, { createContext, useState, ReactNode } from 'react';

// Define the type for the context value
interface SidebarContextType {
  isOpen: boolean;
  toggleSidebar: () => void;
}

// Create a context with an initial value
export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// Define the provider component's props
interface SidebarProviderProps {
  children: ReactNode;
}

// Create the SidebarContext provider
export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
