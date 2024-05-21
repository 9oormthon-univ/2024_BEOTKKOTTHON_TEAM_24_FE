import { NextPage } from 'next';
import { useFunnel } from '@/hooks/custom/useFunnel';
import AccountSetup from '@/components/signup/AccountSetup';
import NameSetup from '@/components/signup/NameSetup';
import JobSetup from '@/components/signup/JobSetup';
import SubjectSetup from '@/components/signup/SubjectSetup';
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
        <NameSetup />
      </Funnel.Step>
      <Funnel.Step name="job">
        <JobSetup />
      </Funnel.Step>
      <Funnel.Step name="subject">
        <SubjectSetup />
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
