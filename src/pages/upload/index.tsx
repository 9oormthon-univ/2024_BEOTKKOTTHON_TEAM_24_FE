import { useGetSummary } from '@/api/Insight';
import { NextPage } from 'next'
import { useState } from 'react';
import styled from 'styled-components';

const Upload: NextPage = ({}) => {
  const [link, setLink] = useState('');
  const { isLoading, error, summary } = useGetSummary(link);
  return (
    <>
    <Wrapper>
      <PageContainer>
          This is Upload Page
          <Input type="text" value={link} onChange={(e) => setLink(e.target.value)}/>
          {isLoading && <p>Loading...</p>}
          {error && <p>{error.message}</p>}
          {summary && <p>Summary: {summary}</p>}
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