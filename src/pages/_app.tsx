import MainLayout from '@/components/common/MainLayout';
import { GlobalStyles } from '@/styles/GlobalStyle';
import { BeforeInstallPromptEvent } from '@/types/global';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<
    BeforeInstallPromptEvent | undefined
  >(undefined);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => console.log('sw worker registered', reg))
        .catch(() => console.log('failed'));
    }
    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <MainLayout>
        <Component
          {...pageProps}
          deferredPrompt={deferredPrompt}
          setDeferredPrompt={setDeferredPrompt}
        />
      </MainLayout>
    </QueryClientProvider>
  );
}
