import { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface RegistrationData {
  apiKey?: string;
  fullName?: string;
  age?: string;
  gender?: string;
  level?: string;
}

interface RegistrationContextType {
  registrationData: RegistrationData;
  updateRegistrationData: (newData: Partial<RegistrationData>) => void;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

const initialData: RegistrationData = {};

export const RegistrationProvider = ({ children }: { children: ReactNode }) => {
  const [storedData, setStoredData] = useLocalStorage<RegistrationData>('userRegistrationData', initialData);

  const updateRegistrationData = (newData: Partial<RegistrationData>) => {
    setStoredData(prevData => ({ ...prevData, ...newData }));
  };

  const value = { registrationData: storedData, updateRegistrationData };

  return (
    <RegistrationContext.Provider value={value}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = (): RegistrationContextType => {
  const context = useContext(RegistrationContext);
  if (context === undefined) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
};