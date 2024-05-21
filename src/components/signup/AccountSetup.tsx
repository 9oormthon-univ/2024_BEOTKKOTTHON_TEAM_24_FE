import { useState } from 'react';
import styled from 'styled-components';
import VisibleIcon from '@svg/visible-icon.svg';
import UnvisibleIcon from '@svg/unvisible-icon.svg';
import BottomBtn from '@/components/common/BottomBtn';
import { useSignupInputStore } from '@/store/signup';
import { SignupPostRequest } from '@/types/user';

interface Props {
  setSignupInfo: (value: SignupPostRequest) => void;
  toNextStep: () => void;
}

const AccountSetup = (props: Props) => {
  const { setSignupInfo, toNextStep } = props;
  const [isPWOpen, setIsPWOpen] = useState(false);
  const { signupInput, setSignupInput } = useSignupInputStore();
  const [PWCheck, setPWCheck] = useState('');
  const [isValid, setIsValid] = useState({
    email: true,
    password: true,
    check: true,
  });

  const validate = (type: string, value: string) => {
    const regexEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regexPW = /^(?=.*[a-z])(?=.*[0-9]).{8,}$/;
    type === 'email' &&
      setIsValid({ ...isValid, email: regexEmail.test(value) });
    type === 'password' &&
      setIsValid({ ...isValid, password: regexPW.test(value) });
    type === 'check' &&
      setIsValid({ ...isValid, check: signupInput.userPassword === value });
  };

  const handleInput = (type: string, value: string) => {
    type === 'email'
      ? setSignupInput({ ...signupInput, userEmail: value })
      : type === 'password'
        ? setSignupInput({ ...signupInput, userPassword: value })
        : setPWCheck(value);
    validate(type, value);
  };

  const handleKakao = () => {
    return;
  };
  return (
    <Wrapper>
      <InputContainer>
        <PageIntro>
          <p>회원가입하고</p>인사이트를 리마인드 해보세요 !
        </PageIntro>
        <EmailSection>
          <SubTitle className="email">이메일*</SubTitle>
          <Input
            value={signupInput.userEmail}
            onChange={(e) => handleInput('email', e.target.value)}
            type="text"
            placeholder="이메일 주소를 입력해주세요."
          />
          <ErrorText>
            {!isValid.email && '*유효하지 않은 이메일 주소 양식입니다.'}
          </ErrorText>
        </EmailSection>
        <PWSection>
          <SubTitle>비밀번호*</SubTitle>
          <div className="input-container">
            <Input
              value={signupInput.userPassword}
              onChange={(e) => handleInput('password', e.target.value)}
              type={isPWOpen ? 'text' : 'password'}
              placeholder="비밀번호를 입력해주세요"
            />
            {isPWOpen ? (
              <VisibleIcon
                onClick={() => setIsPWOpen(false)}
                className="icon"
              />
            ) : (
              <UnvisibleIcon
                onClick={() => setIsPWOpen(true)}
                className="icon"
              />
            )}
          </div>
          <ErrorText>
            {!isValid.password &&
              '*8자리 이상의 영어 소문자와 숫자만 입력 가능해요.'}
          </ErrorText>
        </PWSection>
        <PWSection>
          <SubTitle>비밀번호 확인*</SubTitle>
          <div className="input-container">
            <Input
              value={PWCheck}
              onChange={(e) => handleInput('check', e.target.value)}
              type={isPWOpen ? 'text' : 'password'}
              placeholder="비밀번호를 한 번 더 입력해주세요"
            />
            {isPWOpen ? (
              <VisibleIcon
                onClick={() => setIsPWOpen(false)}
                className="icon"
              />
            ) : (
              <UnvisibleIcon
                onClick={() => setIsPWOpen(true)}
                className="icon"
              />
            )}
          </div>
          <ErrorText>{!isValid.check && '*비밀번호가 다릅니다.'}</ErrorText>
        </PWSection>
      </InputContainer>
      <BottomBtn
        text="회원가입"
        state={
          !(
            signupInput.userEmail !== '' &&
            signupInput.userPassword !== '' &&
            PWCheck !== '' &&
            isValid.email &&
            isValid.password &&
            isValid.check
          )
            ? 'disabled'
            : 'activated'
        }
        onClick={toNextStep}
      />
      <BottomBtn
        text="카카오톡으로 로그인하기"
        state="transparent"
        onClick={() => handleKakao}
      />
    </Wrapper>
  );
};

export default AccountSetup;

const Wrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: start;

  > :nth-child(3) {
    margin-bottom: 16px;
  }

  > :nth-child(4) {
    margin-bottom: 36px;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  padding: 0px 20px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  flex: 1;
`;

const PageIntro = styled.div`
  color: var(--Neutral-500, #1f1f1f);
  /* Head-24-B */
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 33.6px */
  margin-top: 20px;
`;

const EmailSection = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  /* width: 100%; */
`;

const SubTitle = styled(PageIntro)`
  font-size: 20px;
  font-weight: 500;
  margin-top: 0;

  &.email {
    margin-top: 48px;
  }
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
  margin-top: 10px;
`;

const PWSection = styled(EmailSection)`
  position: relative;
  .input-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
  }
  .icon {
    position: absolute;
    top: 30px;
    right: 18px;
  }
`;

const ErrorText = styled.div`
  height: 36px;
  padding: 8px 0;
  color: var(--System-Warning, #f1404b);
  /* Body-14-M */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 19.6px */
`;
