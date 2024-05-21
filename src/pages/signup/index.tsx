import { NextPage } from 'next';
import { useFunnel } from '@/hooks/custom/useFunnel';
import AccountSetup from '@/components/signup/AccountSetup';
import Name from '@/components/signup/Name';
import Job from '@/components/signup/Job';
import Subject from '@/components/signup/Subject';
import AddHome from '@/components/signup/AddHome';
import { BeforeInstallPromptEvent } from '@/types/global';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  deferredPrompt: BeforeInstallPromptEvent;
  setDeferredPrompt: Dispatch<
    SetStateAction<BeforeInstallPromptEvent | undefined>
  >;
}

const SignUp: NextPage<Props> = ({ deferredPrompt, setDeferredPrompt }) => {
  const [Funnel, setStep] = useFunnel([
    'account-setup',
    'name',
    'job',
    'subject',
    'add-home',
  ]);

  return (
    <Funnel>
      <Funnel.Step name="account-setup">
        <AccountSetup />
      </Funnel.Step>
      <Funnel.Step name="name">
        <Name />
      </Funnel.Step>
      <Funnel.Step name="job">
        <Job />
      </Funnel.Step>
      <Funnel.Step name="subject">
        <Subject />
      </Funnel.Step>
      <Funnel.Step name="add-hoem">
        <AddHome
          deferredPrompt={deferredPrompt}
          setDeferredPrompt={setDeferredPrompt}
        />
      </Funnel.Step>
    </Funnel>
  );
};

export default SignUp;
