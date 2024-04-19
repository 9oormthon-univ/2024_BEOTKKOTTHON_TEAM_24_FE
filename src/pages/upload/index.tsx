import BottomBtn from '@/components/common/BottomBtn';
import { NextPage } from 'next';
import Header from '@/components/common/Header';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGetFolder } from '@/hooks/api/useFolder';
import { getAccessToken } from '@/utils/auth';
import InputWithTitle from '@/components/common/InputWithTitle';
import UploadImage from '@/components/folder/UploadImage';

const LinkInput: NextPage = ({}) => {
  const router = useRouter();
  const [link, setLink] = useState<string>('');
  const [memo, setMemo] = useState('');
  const [imageList, setImageList] = useState<string[]>([]);
  const [errorText, setErrorText] = useState('');
  const [source, setSource] = useState('');
  const { data } = useGetFolder();

  useEffect(() => {
    if (!getAccessToken()) {
      alert('로그인 후 이용하실 수 있어요!');
      router.push('/signin');
    }
    const parsedUrl = new URL(window.location.href);
    const url = String(parsedUrl.searchParams.get('text'));
    url !== 'null' && setLink(url);
  }, []);

  const handleClickNext = async () => {
    // 입력 링크 유효성 검사
    if (!link) {
      alert('링크를 입력해주세요.');
      return;
    }
    console.log(data?.map((folder) => folder.folderName));
    // 인사이트 제목, 요약, 키워드 요청
    router.push(
      {
        pathname: '/upload/input-text',
        query: {
          link: link,
          imageList: imageList,
          insightImageList: imageList,
          memo: memo,
          folderNameList: data?.map((folder) => folder.folderName),
          source: source,
        },
      },
      '/upload/input-text',
    );
  };

  const handleInputLink = (link: string) => {
    setLink(link);
    const regex =
      /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    regex.test(link)
      ? setErrorText('')
      : setErrorText('*유효하지 않은 링크입니다.');
  };

  const handleMemo = (newMemo: string) => {
    memo.length < 500 && setMemo(newMemo);
    // console.log(imageList);
  };

  return (
    <>
      <Wrapper>
        <Header title="인사이트 저장" />
        <PageContainer className="no-scroll">
          <InputWithTitle
            errorText={errorText}
            linkIcon={true}
            title="인사이트 링크"
            value={link}
            onChnage={handleInputLink}
          />
          <UploadImage imageList={imageList} setImageList={setImageList} />
          <MemoSection>
            <SubTitle>메모</SubTitle>
            <MemoWrapper>
              <MemoInput
                value={memo}
                onChange={(e) => handleMemo(e.target.value)}
                placeholder="메모를 입력하세요."
              />
              <LetterCounter>{memo.length}/500자</LetterCounter>
            </MemoWrapper>
          </MemoSection>
          <InputWithTitle
            title="출처"
            value={source}
            onChnage={setSource}
            placeholder="출처를 입력하세요."
          />
        </PageContainer>
        <BottomBtn
          text="다음"
          onClick={handleClickNext}
          state={
            link.length === 0 && memo.length === 0 ? 'disabled' : 'activated'
          }
        />
      </Wrapper>
    </>
  );
};

export default LinkInput;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  height: 100vh;
  .no-scroll::-webkit-scrollbar {
    display: none;
  }

  :nth-child(3) {
    margin-bottom: 36px;
  }
`;

const PageContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 0 20px;
  margin: 26px 0 37.5px;
`;

const LinkSection = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  margin-top: 28px;
  width: 100%;

  .link-icon {
    position: absolute;
    top: 41px;
    left: 12px;
  }
`;

const MemoSection = styled(LinkSection)`
  margin-top: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const SubTitle = styled.div`
  color: #000;
  text-align: left;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px; /* 131.25% */
  letter-spacing: -0.32px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const MemoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  textarea::-webkit-scrollbar {
    display: none;
  }
  flex: 1;
  height: 100%;
`;

const MemoInput = styled.textarea`
  width: 100%;
  min-height: 51px;
  border: none;
  outline: none;
  margin-bottom: 0;
  padding: 12px 16px 30px 12px;
  background: #f4f5f7;
  color: #161616;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 19px;
  border-radius: 8px 8px 0px 0px;
  resize: none;
  flex: 1;
`;

const LetterCounter = styled.div`
  background: #f4f5f7;
  border-radius: 0px 0px 8px 8px;
  color: #a4a4a4;
  text-align: left;
  font-family: Pretendard;
  font-size: 11px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: -0.274px;
  margin-top: 0;
  padding: 16px;
`;
