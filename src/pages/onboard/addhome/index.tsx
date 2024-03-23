import BottomBtn from '@/components/common/BottomBtn';
import { useSignupInputStore } from '@/store/signup';
import { BeforeInstallPromptEvent } from '@/types/global';
import { promptAppInstall } from '@/utils';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import PhoneImage from '@svg/onboard/phone-image.svg';

interface Props {
  deferredPrompt: BeforeInstallPromptEvent;
  setDeferredPrompt: Dispatch<
    SetStateAction<BeforeInstallPromptEvent | undefined>
  >;
}

const AddHome: NextPage<Props> = ({ deferredPrompt, setDeferredPrompt }) => {
  const router = useRouter();
  const { signupInput } = useSignupInputStore();

  return (
    <Wrapper>
      <div className="text-section">
        <div className="main-title">{signupInput.userName}님, 환영해요!</div>
        <div className="sub-title">
          <p>리인풋을 홈 화면에 추가하면</p>
          <p>다양한 기능을 사용하실 수 있어요 !</p>
        </div>
      </div>
      <div className="image">
        <PhoneImage />
      </div>
      <BottomBtn
        text="홈 화면에 추가"
        state="activated"
        onClick={() =>
          promptAppInstall({ deferredPrompt, setDeferredPrompt, router })
        }
      />
      <BottomBtn text="나중에 할게요" state="transparent" nextUrl="/signin" />
    </Wrapper>
  );
};

export default AddHome;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  text-align: center;

  .text-section {
    display: flex;
    flex-direction: column;
    margin-top: 73px;
    gap: 16px;
    flex: 1;
    height: 100%;
  }

  .main-title {
    color: var(--Neutral-500, #3184FF);
    text-align: center;
    font-family: Pretendard;
    font-size: 26px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%; /* 36.4px */
  }
  .sub-title {
    color: var(--Neutral-500, #1f1f1f);
    text-align: center;
    /* Body-16-SB */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 22.4px */
    display: flex;
    flex-direction: column;
    margin-top: 12px;
  }

  :nth-child(2) {
    height: calc(100% - 250px);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  :nth-child(3) {
    margin-bottom: 16px;
  }

  :nth-child(4) {
    margin-bottom: 36px;
  }
`;
