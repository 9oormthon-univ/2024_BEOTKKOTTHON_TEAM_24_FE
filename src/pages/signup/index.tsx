import { NextPage } from 'next';
import { useFunnel } from '@/hooks/custom/useFunnel';
import AccountSetup from '@/components/signup/AccountSetup';
import NameSetup from '@/components/signup/NameSetup';
import JobSetup from '@/components/signup/JobSetup';
import SubjectSetup from '@/components/signup/SubjectSetup';
import AddHome from '@/components/signup/AddHome';
import { BeforeInstallPromptEvent } from '@/types/global';
import { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { SignupPostRequest } from '@/types/user';
import Header from '@/components/common/Header';

interface Props {
  deferredPrompt: BeforeInstallPromptEvent;
  setDeferredPrompt: Dispatch<
    SetStateAction<BeforeInstallPromptEvent | undefined>
  >;
}

const SignUp: NextPage<Props> = ({ deferredPrompt, setDeferredPrompt }) => {
  const [signupInfo, setSignupInfo] = useState<SignupPostRequest>({
    userEmail: '',
    userPassword: '',
    userName: '',
    job: 'ETC',
    topicList: [],
  });
  const [Funnel, toPrevStep, toNextStep] = useFunnel([
    'account-setup',
    'name',
    'job',
    'subject',
    'add-home',
  ] as const);

  return (
    <>
      <Header onClick={toPrevStep} />
      <Funnel>
        <Funnel.Step name="account-setup">
          <AccountSetup
            signupInfo={signupInfo}
            setSignupInfo={setSignupInfo}
            toNextStep={toNextStep}
          />
        </Funnel.Step>
        <Funnel.Step name="name">
          <NameSetup
            signupInfo={signupInfo}
            setSignupInfo={setSignupInfo}
            toNextStep={toNextStep}
          />
        </Funnel.Step>
        <Funnel.Step name="job">
          <JobSetup
            signupInfo={signupInfo}
            setSignupInfo={setSignupInfo}
            toNextStep={toNextStep}
          />
        </Funnel.Step>
        <Funnel.Step name="subject">
          <SubjectSetup />
        </Funnel.Step>
        <Funnel.Step name="add-home">
          <AddHome
            deferredPrompt={deferredPrompt}
            setDeferredPrompt={setDeferredPrompt}
          />
        </Funnel.Step>
      </Funnel>
    </>
  );
};

export default SignUp;
