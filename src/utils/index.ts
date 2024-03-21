import { BeforeInstallPromptEvent } from '@/types/global';
import { Dispatch, SetStateAction } from 'react';
import { NextRouter } from 'next/router';

export const checkUnsupportedBrowser = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return (
    (userAgent.indexOf('safari') > -1 &&
      userAgent.indexOf('chrome') <= -1 &&
      userAgent.indexOf('chromium') <= -1) ||
    (userAgent.indexOf('firefox') > -1 && userAgent.indexOf('seamonkey') <= -1)
  );
};

export const promptAppInstall = async ({
  deferredPrompt,
  setDeferredPrompt,
  router,
}: {
  deferredPrompt: BeforeInstallPromptEvent;
  setDeferredPrompt: Dispatch<
    SetStateAction<BeforeInstallPromptEvent | undefined>
  >;
  router: NextRouter;
}) => {
  const isUnsupportedBrowser = checkUnsupportedBrowser();
  if (isUnsupportedBrowser) {
    alert(
      '공유 아이콘 -> 홈 화면에 추가를 클릭해 앱으로 편리하게 이용해보세요!',
    );
  }
  if (!isUnsupportedBrowser) {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(undefined);
    } else {
      alert('이미 저희 서비스를 설치해주셨어요!');
    }
  }
  router.push('/landing');
};
