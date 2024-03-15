import { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface insightInput {
  title: string | string[] | undefined,
  summary: string | string[] | undefined,
  keywords: string[],
}

const Upload: NextPage = ({}) => {
  const router = useRouter()
  const [insightInput, setInsightInput] = useState<insightInput>({
    title: "",
    summary: "",
    keywords: [],
  })

  useEffect(() => {
    const { title, summary, keywords } = router.query;
    setInsightInput({
      title: title,
      summary: summary,
      keywords: (keywords ? (Array.isArray(keywords) ? keywords : [keywords]) : [])
    });
  }, [router.query]);

  return (
    <>
    <Wrapper>
      <PageContainer>
          제목
          <Input type="text" value={insightInput.title} onChange={(e) => setInsightInput({...insightInput, title: e.currentTarget.value})}/>
          <Input type="textarea" value={insightInput.summary} onChange={(e) => setInsightInput({...insightInput, summary: e.currentTarget.value})}/>
          {insightInput.keywords && insightInput.keywords.map((keyword: string, idx: number) => <p key={idx}>{keyword}</p>)}=
        </PageContainer>
    </Wrapper>
    </>
  )
}

export default Upload;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: center;
  align-items: center;
  justify-content: center;
  margin: auto;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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