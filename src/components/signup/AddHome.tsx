import BottomBtn from '@/components/common/BottomBtn';
import { BeforeInstallPromptEvent } from '@/types/global';
import { promptAppInstall } from '@/utils';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import PhoneImage from '@svg/onboard/phone-image.svg';
import { SignupPostRequest } from '@/types/user';

interface Props {
  signupInfo: SignupPostRequest;
  deferredPrompt: BeforeInstallPromptEvent;
  setDeferredPrompt: Dispatch<
    SetStateAction<BeforeInstallPromptEvent | undefined>
  >;
}

const AddHome = (props: Props) => {
  const { signupInfo, deferredPrompt, setDeferredPrompt } = props;
  const router = useRouter();

  return (
    <Wrapper>
      <div className="text-section">
        <div className="main-title">{signupInfo.userName}님, 환영해요!</div>
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
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: center;

  .text-section {
    display: flex;
    flex-direction: column;
    margin-top: 65px;
    gap: 16px;
  }

  .main-title {
    color: ${({ theme }) => theme.palette.primary[500]};
    text-align: center;
    ${({ theme }) => theme.typo.Head_24_B};
    font-size: 26px;
  }
  .sub-title {
    color: ${({ theme }) => theme.palette.neutral[500]};
    text-align: center;
    ${({ theme }) => theme.typo.Body_16_SB};
    display: flex;
    flex-direction: column;
    margin-top: 12px;
  }

  .image {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
  }

  :nth-child(3) {
    margin-bottom: 16px;
  }

  :nth-child(4) {
    margin-bottom: 36px;
  }
`;
