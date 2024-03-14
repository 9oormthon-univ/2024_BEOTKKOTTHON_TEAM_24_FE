import "@/styles/globals.css";
import { BeforeInstallPromptEvent } from '@/types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from "next/app";
import { useEffect, useState } from 'react';

const queryClient = new QueryClient()

declare global {
  export interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | undefined>(undefined);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
    })
    if("serviceWorker" in navigator) {
      navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => console.log("sw worker registered", reg))
      .catch(() => console.log("failed"))
    }
    return () => {
      window.removeEventListener("beforeinstallprompt", null);
    }
  })
  return (
  <QueryClientProvider client={queryClient}>
    <Component
      {...pageProps}
      deferedPrompt={deferredPrompt}
      setDeferredPrompt={setDeferredPrompt}
    />
  </QueryClientProvider>
  )
}
