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
import styled from 'styled-components';
import BackIcon from '@svg/backspace-icon.svg';

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
    job: 'PLANNER',
    topicList: [],
  });
  const [Funnel, toPrevStep, toNextStep] = useFunnel(STEP_NAMES);
  const steps = [AccountSetup, NameSetup, JobSetup, SubjectSetup];

  // eslint-disable-next-line @typescript-eslint/ban-types
  const renderSteps: Function = (): ReactElement[] => {
    return steps.map((Step, i) => (
      <Funnel.Step key={STEP_NAMES[i]} name={STEP_NAMES[i]}>
        <Header toPrevStep={toPrevStep} rightText={i > 0 ? `${i}/3` : ''} />
        <Step {...{ signupInfo, setSignupInfo, toNextStep }} />
      </Funnel.Step>
    ));
  };

  return (
    <Funnel>
      {renderSteps()}
      <Funnel.Step name="add-home">
        <AddHome
          {...{
            signupInfo,
            deferredPrompt,
            setDeferredPrompt,
          }}
        />
      </Funnel.Step>
    </Funnel>
  );
};

export default SignUp;

const Header = (props: { toPrevStep: () => void; rightText: string }) => {
  const { toPrevStep, rightText } = props;
  return (
    <Wrapper>
      <BackIcon onClick={toPrevStep} />
      <div></div>
      <div className="right-text">{rightText}</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  width: 100%;
  padding: 18px 20px 16px;
  height: 52px;

  .right-text {
    ${({ theme }) => theme.typo.Head_20_M};
    color: ${({ theme }) => theme.palette.primary[500]};
    text-align: right;
  }
`;
