import { NextPage } from 'next';
import { useFunnel } from '@/hooks/custom/useFunnel';
import AccountSetup from '@/components/signup/AccountSetup';
import NameSetup from '@/components/signup/NameSetup';
import JobSetup from '@/components/signup/JobSetup';
import SubjectSetup from '@/components/signup/SubjectSetup';
import AddHome from '@/components/signup/AddHome';
import { BeforeInstallPromptEvent } from '@/types/global';
import { Dispatch, ReactElement, SetStateAction } from 'react';
import { useState } from 'react';
import { SignupPostRequest } from '@/types/user';
import Header from '@/components/common/Header';
import { SignupFunnel } from '@/types/Funnel';

interface Props {
  deferredPrompt: BeforeInstallPromptEvent;
  setDeferredPrompt: Dispatch<
    SetStateAction<BeforeInstallPromptEvent | undefined>
  >;
}

const STEP_NAMES = [
  'account-setup',
  'name',
  'job',
  'subject',
  'add-home',
] as const;

const SignUp: NextPage<Props> = ({ deferredPrompt, setDeferredPrompt }) => {
  const [signupInfo, setSignupInfo] = useState<SignupPostRequest>({
    userEmail: '',
    userPassword: '',
    userName: '',
    job: 'ETC',
    topicList: [],
  });
  const [Funnel, toPrevStep, toNextStep] = useFunnel(STEP_NAMES);
  const steps = [AccountSetup, NameSetup, JobSetup, SubjectSetup];

  const renderSteps: Function = (): ReactElement[] => {
    return steps.map((Step, i) => (
      <Funnel.Step name={STEP_NAMES[i]}>
        <Step {...{ signupInfo, setSignupInfo, toNextStep }} />
      </Funnel.Step>
    ));
  };

  return (
    <>
      <Header onClick={toPrevStep} />
      <Funnel>
        {renderSteps()}
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
