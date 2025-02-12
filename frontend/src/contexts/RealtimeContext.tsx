import { createContext, useContext, useState, ReactNode } from 'react';
import { WebsocketResponseDTO } from '../services/websocket';

interface RealtimeData {
  data: WebsocketResponseDTO | null,
  loading: boolean,
  error: string | null,
  lastUpdated: Date | null,
}

const ApiContext = createContext<RealtimeData | undefined>(undefined);

export function RealtimeProvider({ children }: { children: ReactNode }) {
  const [realtimeData, setRealtimeData] = useState<RealtimeData>({
    data: null,
    loading: false,
    error: null,
    lastUpdated: null,
  })

  return (
    <ApiContext.Provider value={realtimeData}>
      {children}
    </ApiContext.Provider>
  );
}

export function useRealtimeData() {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error('useRealtimeData must be used within an ApiProvider');
  }
  return context;
} 