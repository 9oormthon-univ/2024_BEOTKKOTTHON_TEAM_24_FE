import styled from 'styled-components';
import FolderImg from '@svg/reinput-folder.svg';
import { useRouter } from 'next/router';

const EmptyQuestionBox = () => {
  const router = useRouter();

  return (
    <Wrapper>
      <div className="text-img">
        <div className="text-box">
          <span>인사이트가 비어있어요</span>
          <p>
            소중한 자료를 저장하면<br></br>매일 리마인드 질문을 드려요
          </p>
        </div>
        <FolderImg />
      </div>
      <button onClick={() => router.push('/upload')}>인사이트 저장하기</button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: calc(100% - 40px);
  height: 197px;
  border-radius: 12px;
  margin: 0 20px 48px;
  padding: 10px 20px 18px;
  background: ${({ theme }) => theme.palette.primary[100]};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .text-img {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .text-box {
    width: 182px;

    span {
      font-size: 14px;
      font-weight: 600;
      color: ${({ theme }) => theme.palette.primary[500]};
    }
    p {
      ${({ theme }) => theme.typo.Body_16_SB};
      color: ${({ theme }) => theme.palette.neutral[500]};
    }
  }

  button {
    width: 100%;
    height: 58px;
    ${({ theme }) => theme.typo.Body_16_SB};
    color: ${({ theme }) => theme.palette.primary[500]};
    background-color: #ffffff;
    border: ${({ theme }) => theme.palette.primary[500]} solid 1px;
    border-radius: 12px;
  }
`;

export default EmptyQuestionBox;
