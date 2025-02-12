import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { WebsocketResponseDTO } from '../services/websocket';
import { wsService } from '../services/websocket';
interface RealtimeData {
  data: WebsocketResponseDTO | null,
  error: string | null,
  lastUpdated: Date | null,
}

const ApiContext = createContext<RealtimeData | undefined>(undefined);

export function RealtimeProvider({ children }: { children: ReactNode }) {
  const [realtimeData, setRealtimeData] = useState<RealtimeData>({
    data: null,
    error: null,
    lastUpdated: null,
  })

  useEffect(() => {
    wsService.setErrorHandler((error) => {
      setRealtimeData(prev => ({
        ...prev,
        error
      }));
    });

    wsService.setDataHandler((data) => {
      setRealtimeData(prev => ({
        ...prev,
        data,
        lastUpdated: new Date(),
        error: null
      }));
    });

    wsService.connect();

    return () => {
      wsService.disconnect();
    };
  }, []);

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