import { PrevIcon } from '@/constants/PrevIcon';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';
import VisibleIcon from '@svg/visible-icon.svg';
import UnvisibleIcon from '@svg/unvisible-icon.svg';
import MoveToNextBtn from '@/components/upload/MoveToNextBtn';

interface Props {}

const SignIn: NextPage<Props> = ({}) => {
  const router = useRouter();
  const [isPWOpen, setIsPWOpen] = useState(false);
  const [loginInput, setLoginInput] = useState({
    userEmail: '',
    password: '',
  });

  const handleLogin = () => {
    return;
  };

  const handleKakao = () => {
    return;
  };
  return (
    <Wrapper>
      <div>
        <PrevButton onClick={() => router.push('/landing')}>
          {PrevIcon}
        </PrevButton>
        <PageIntro>
          <p>로그인하고</p>인사이트를 리마인드 해보세요 !
        </PageIntro>
        <EmailSection>
          <SubTitle>이메일</SubTitle>
          <Input
            value={loginInput.userEmail}
            onChange={(e) =>
              setLoginInput({ ...loginInput, userEmail: e.target.value })
            }
            type="text"
            placeholder="이메일 주소를 입력해주세요."
          ></Input>
        </EmailSection>
        <PWSection>
          <SubTitle>비밀번호</SubTitle>
          <div className="input-container">
            <Input
              value={loginInput.password}
              onChange={(e) =>
                setLoginInput({ ...loginInput, password: e.target.value })
              }
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
        </PWSection>
        <div className="login-btn">
          <MoveToNextBtn
            title="로그인"
            width="353px"
            height="72px"
            background="#3184FF"
            fontSize="20px"
            onClick={() => handleLogin}
            isDisabled={
              loginInput.userEmail === '' || loginInput.password === ''
            }
          />
        </div>
        <div className="kakao-login">
          <span onClick={() => handleKakao}>카카오톡으로 로그인하기</span>
        </div>
      </div>
    </Wrapper>
  );
};

export default SignIn;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  padding: 0px 20px;
  align-items: start;
  justify-content: center;
  .login-btn {
    position: absolute;
    bottom: 124px;
  }
  .kakao-login {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 353px;
    position: absolute;
    bottom: 42px;
    color: var(--Primary-500, #3184ff);
    text-align: center;
    /* Body-16-SB */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 22.4px */
  }
`;

const PrevButton = styled.div`
  position: absolute;
  top: 24px;
  cursor: pointer;
`;

const PageIntro = styled.div`
  color: var(--Neutral-500, #1f1f1f);
  /* Head-24-B */
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 33.6px */
  margin-top: 78px;
`;

const EmailSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 353px;
  gap: 10px;
`;

const SubTitle = styled(PageIntro)`
  font-size: 20px;
  font-weight: 500;
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

const PWSection = styled(EmailSection)`
  .input-container {
    display: flex;
    flex-direction: column;
    width: 353px;
    position: relative;
  }
  .icon {
    position: absolute;
    top: 20px;
    right: 18px;
  }
`;
