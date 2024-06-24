import BottomBtn from '@/components/common/BottomBtn';
import { useState } from 'react';
import styled from 'styled-components';
import { SignupFunnel } from '@/types/Funnel';

const NameSetup = (props: SignupFunnel) => {
  const regex = /^[가-힣a-zA-Z]{2,}$/;
  const { signupInfo, setSignupInfo, toNextStep } = props;
  const [isValidName, setIsValidName] = useState(
    regex.test(signupInfo.userName),
  );

  const handleInput = (value: string) => {
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
    color: ${({ theme }) => theme.palette.neutral[500]};
      ${({ theme }) => theme.typo.Head_24_B};
    margin-top: 20px;
  }
  span {
    position: absolute;
    right: 20px;
    top: 12px;
    color: ${({ theme }) => theme.palette.primary[500]};
      ${({ theme }) => theme.typo.Head_20_M};
  }
  .subtitle {
    color: ${({ theme }) => theme.palette.neutral[300]};
      ${({ theme }) => theme.typo.Body_14_M};
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
    color: ${({ theme }) => theme.palette.system.warning};
  }
  flex: 1;
`;

const SubTitle = styled.div`
  color: ${({ theme }) => theme.palette.neutral[500]};
    ${({ theme }) => theme.typo.Head_20_M};
  margin-top: 48px;
`;

const Input = styled.input`
  display: flex;
  padding: 18px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 8.235px;
  border: 0.8px solid ${({ theme }) => theme.palette.neutral[300]};
  outline: none;
  color: ${({ theme }) => theme.palette.neutral[500]};
  ${({ theme }) => theme.typo.Body_18_R};
`;

const ValidateText = styled.div`
  color: ${({ theme }) => theme.palette.neutral[200]};
    ${({ theme }) => theme.typo.Body_14_M};
`;
