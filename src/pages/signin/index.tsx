import { NextPage } from 'next';
import { useState } from 'react';
import styled from 'styled-components';
import VisibleIcon from '@svg/visible-icon.svg';
import UnvisibleIcon from '@svg/unvisible-icon.svg';
import Header from '@/components/common/Header';
import BottomBtn from '@/components/common/BottomBtn';
import { useRouter } from 'next/router';
import { LoginPostRequest } from '@/types/user';
import { useLogin } from '@/hooks/api/useAuth';

interface Props {}

const SignIn: NextPage<Props> = ({}) => {
  const [isPWOpen, setIsPWOpen] = useState(false);
  const [loginInput, setLoginInput] = useState<LoginPostRequest>({
    userEmail: '',
    userPassword: '',
  });
  const router = useRouter();
  const { isError, mutate } = useLogin();

  return (
    <Wrapper>
      <Header onClick={() => router.back()} />
      <InputContainer>
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
              value={loginInput.userPassword}
              onChange={(e) =>
                setLoginInput({ ...loginInput, userPassword: e.target.value })
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
          <ErrorText>
            {isError && '*잘못된 이메일 혹은 비밀번호입니다.'}
          </ErrorText>
        </PWSection>
      </InputContainer>
      <BottomBtn
        text="로그인"
        state={
          loginInput.userEmail === '' || loginInput.userPassword === ''
            ? 'disabled'
            : 'activated'
        }
        onClick={() => mutate(loginInput)}
      />
      <BottomBtn text="카카오톡으로 로그인하기" state="transparent" />
    </Wrapper>
  );
};

export default SignIn;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;

  :nth-child(3) {
    margin-bottom: 16px;
  }

  :nth-child(4) {
    margin-bottom: 36px;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 0px 20px;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  flex: 1;
`;

const PageIntro = styled.div`
  color: ${({ theme }) => theme.palette.neutral[500]};
  ${({ theme }) => theme.typo.Head_24_B};
  margin-top: 20px;
  width: 100%;
`;

const EmailSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
`;

const SubTitle = styled(PageIntro)`
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

const PWSection = styled(EmailSection)`
  width: 100%;
  .input-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
  }
  .icon {
    position: absolute;
    top: 20px;
    right: 18px;
  }
`;

const ErrorText = styled.div`
  height: 36px;
  padding: 8px 0;
  color: ${({ theme }) => theme.palette.system.warning};
  ${({ theme }) => theme.typo.Body_14_M};
`;
