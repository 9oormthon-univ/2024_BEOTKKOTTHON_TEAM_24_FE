import { useSignupInputStore } from '@/store/signup';
import { BeforeInstallPromptEvent } from '@/types/global';
import { promptAppInstall } from '@/utils';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

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
    <>
      <Wrapper>
        <div className="text-section">
          <div className="main-title">{signupInput.userName}님, 환영해요!</div>
          <div className="sub-title">
            <p>리인풋을 홈 화면에 추가하면</p>
            다양한 기능을 사용하실 수 있어요 !
          </div>
        </div>
        <BottomSection>
          <button className="bottom-btn" onClick={()=>promptAppInstall({deferredPrompt, setDeferredPrompt, router})}>
            홈 화면에 추가
          </button>
          <span className="sub-text" onClick={() => router.push('/home')}>
            나중에 할게요
          </span>
        </BottomSection>
      </Wrapper>
    </>
  );
};

export default AddHome;

const Wrapper = styled.div`
  height: 100vh;
  position: relative;
  text-align: center;
  .text-section {
    display: flex;
    flex-direction: column;
    margin-top: 73px;
    gap: 16px;
  }
  .main-title {
    color: var(--Neutral-500, #1f1f1f);
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
  }
`;

const BottomSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .sub-text {
    position: absolute;
    bottom: 89px;
    color: var(--Primary-500, #3184ff);
    text-align: center;
    /* Body-14-B */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 22.4px */
    cursor: pointer;
  }
  .bottom-btn {
    width: calc(100% - 40px);
    height: 72px;
    margin: 0 20px;
    border-radius: 14px;
    font-size: 20px;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #3184ff;
    position: absolute;
    bottom: 137px;
    border: 0;
  }
`;
