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
import OptionalTextarea from '@/components/common/OptionalTextarea';

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
            onChange={(e) => handleInputLink(e.target.value)}
          />
          <UploadImage imageList={imageList} setImageList={setImageList} />
          <OptionalTextarea
            bottom={30}
            titleTypo="big"
            title="메모"
            counter={true}
            value={memo}
            onChange={(e) => handleMemo(e.target.value)}
            placeholder="메모를 입력하세요."
          />
          <InputWithTitle
            title="출처"
            value={source}
            onChange={(e) => setSource(e.target.value)}
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
  padding-bottom: 36px;
  .no-scroll::-webkit-scrollbar {
    display: none;
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
  margin: 26px 0 38px;
`;
