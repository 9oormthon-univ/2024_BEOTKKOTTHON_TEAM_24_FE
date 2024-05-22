import BottomBtn from '@/components/common/BottomBtn';
import { useSignupInputStore } from '@/store/signup';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SignupFunnel } from '@/types/Funnel';

const NameSetup = (props: SignupFunnel) => {
  const { signupInfo, setSignupInfo, toNextStep } = props;
  const [isValidName, setIsValidName] = useState(false);

  useEffect(() => {
    setSignupInfo({ ...signupInfo, userName: '' });
  }, []);
  const handleInput = (value: string) => {
    const regex = /^[가-힣a-zA-Z]{2,}$/;
    setSignupInfo({ ...signupInfo, userName: value });
    setIsValidName(regex.test(value));
  };
  return (
    <Wrapper>
      <Body>
        <div className="title">
          <p>회원님의</p>
          이름을 입력해주세요.
        </div>
        <NameSection>
          <SubTitle>이름</SubTitle>
          <Input
            value={signupInfo.userName}
            onChange={(e) => handleInput(e.target.value)}
            type="text"
            placeholder="이름을 입력해주세요."
          />
          <ValidateText className={isValidName ? '' : 'error'}>
            *2글자 이상의 한글 혹은 영문으로 작성해주세요.
          </ValidateText>
        </NameSection>
      </Body>
      <BottomBtn
        text="다음"
        state={isValidName ? 'activated' : 'disabled'}
        onClick={toNextStep}
      />
    </Wrapper>
  );
};

export default NameSetup;

const Wrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: start;

  .title,
  p {
    color: var(--Neutral-500, #1f1f1f);
    /* Head-24-B */
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%; /* 33.6px */
    margin-top: 20px;
  }
  span {
    position: absolute;
    right: 20px;
    top: 12px;
    color: var(--Primary-500, #3184ff);
    /* Head-20-M */
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 28px */
  }
  .subtitle {
    color: var(--Neutral-300, #848484);
    /* Body-14-M */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 19.6px */
  }

  :nth-child(2) {
    margin-bottom: 36px;
  }
`;

const Body = styled.div`
  position: relative;
  padding: 0px 20px;
  flex: 1;
`;

const NameSection = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 10px;
  .error {
    color: var(--System-Warning, #f1404b);
  }
  flex: 1;
`;

const SubTitle = styled.div`
  color: var(--Neutral-500, #1f1f1f);
  /* Head-24-B */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 33.6px */
  margin-top: 48px;
`;

const Input = styled.input`
  display: flex;
  padding: 18px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 8.235px;
  border: 0.8px solid var(--Neutral-300, #848484);
  outline: none;
  color: var(--Neutral-500, #1f1f1f);
  /* Body-18-R */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 25.2px */
`;

const ValidateText = styled.div`
  color: var(--Neutral-200, #989898);
  /* Body-14-M */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 19.6px */
`;
