import { ReactNode, ComponentType } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App.tsx';
import './index.css';
import { SettingsContextProvider } from './SettingsContext.tsx';

type ContextProvider = ComponentType<{ children: ReactNode }>;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      // staleTime: 1000 * 60 * 5, // Set staleTime globally
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

const combineContexts = (contexts: ContextProvider[]) => {
  return ({ children }: { children: ReactNode }) => {
    return contexts.reduceRight(
      (accumulatedContext, CurrentContext) => (
        <CurrentContext>{accumulatedContext}</CurrentContext>
      ),
      children
    );
  };
};

const AllContexts = combineContexts([SettingsContextProvider]);

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <AllContexts>
      <App />
    </AllContexts>
  </QueryClientProvider>
);
