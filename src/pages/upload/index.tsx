import { useGetSummary } from '@/api/Insight';
import MoveToNextBtn from '@/components/upload/MoveToNextBtn';
import { NextPage } from 'next'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const LinkInput: NextPage = ({}) => {
  const router = useRouter();
  const [linkInput, setLinkInput] = useState('');
  const [link, setLink] = useState('');

  const { isLoading, error, result } = useGetSummary(link);

  useEffect(() => {
    if (result.title) {
      router.push({
        pathname: '/upload/input-text',
        query: {
          title: result.title,
          summary: result.summary,
          keywords: result.keywords,
        },
      }, '/upload/input-text')
    }
  }, [result, router])

  const handleClickNext = async () => {
    // 입력 링크 유효성 검사
    if (!linkInput) {
      alert('링크를 입력해주세요.');
      return;
    }
    // 링크 유효성 검사
    const regex = /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    if (!regex.test(linkInput)) {
      alert('유효한 링크를 입력해주세요.');
      return;
    }
    // 인사이트 제목, 요약, 키워드 요청
    setLink(linkInput);
    // 에러처리
    if (error) {
      console.error(error);
      alert('정보를 받아오는데 실패했습니다. 다시 시도해주세요.');
      return;
    }
  }

  return (
    <>
    <Wrapper>
      <PageContainer>
          <Header>
            <PageName>인사이트 저장</PageName>
            <CancelBtn><Link href="/">취소</Link></CancelBtn>
          </Header>
          <PageIntro>저장하고 싶은 인사이트를 입력해주세요</PageIntro>
          <Input type="text" value={linkInput} onChange={(e) => setLinkInput(e.target.value)}/>
          <MoveToNextBtn width="351px" height="69px" title="다음" fontSize="20px" background="#3184FF" onClick={handleClickNext}/>
          {isLoading && <p>Loading...</p>}
          {error && <p>{error.message}</p>}
        </PageContainer>
    </Wrapper>
    </>
  )
}

export default LinkInput;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: center;
  justify-content: center;
  margin: auto;
`;

const PageContainer = styled.div`
  display: flex;
  margin: 0px 18px 0px 18px;
  flex-direction: column;
  align-items: center;
  max-width: 393px;
  height: 852px;
`

const Input = styled.input`
  width: 200px;
  font-size : 15px;
  border-radius: 30px;
  outline: none;
  padding: 10px;
  background: white;
  color: black;
`;

const Header = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 48px;
  align-items: center;
  justify-content: center;
`;

const PageName = styled.span`
  font-size: 1rem;
  font-weight: 600;
  line-weight: 100%;
`;

const CancelBtn = styled.div`
  position: absolute;
  font-size: 12px;
  left: 18px;
`;

const PageIntro = styled.div`
  width: 261px;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
`;