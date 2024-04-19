import BottomBtn from '@/components/common/BottomBtn';
import { NextPage } from 'next';
import Image from 'next/image';
import Header from '@/components/common/Header';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGetFolder } from '@/hooks/api/useFolder';
import { getAccessToken } from '@/utils/auth';
import InputWithTitle from '@/components/common/InputWithTitle';

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

  const handleClickDelete = (idx: number) => {
    const newList = imageList.filter((img) => idx !== imageList.indexOf(img));
    setImageList(newList);
  };

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e?.target.files) return;
    // 이미지 화면에 띄우기
    const newImagesURL = Array.from(
      e?.target.files,
      (file: Blob | MediaSource) => URL.createObjectURL(file),
    );
    const newList = imageList.concat(newImagesURL);
    if (newList.length > 10) {
      alert('이미지는 10장 이상 추가할 수 없습니다.');
      return;
    }
    setImageList(newList);
  };

  const handleMemo = (newMemo: string) => {
    memo.length < 500 && setMemo(newMemo);
    console.log(imageList);
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
          <ImageSection>
            <SubTitle>
              이미지 <ImageCounter>{imageList.length}/10</ImageCounter>
            </SubTitle>
            {imageList.length < 1 ? ( // 이미지가 없는 초기 상태
              <div>
                <label htmlFor="imgfile">
                  <ImageWrapper>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="39"
                      height="39"
                      viewBox="0 0 39 39"
                      fill="none"
                    >
                      <path
                        d="M30.875 3.25H8.125C6.83207 3.25 5.59209 3.76361 4.67785 4.67785C3.76361 5.59209 3.25 6.83207 3.25 8.125V30.875C3.25 32.1679 3.76361 33.4079 4.67785 34.3221C5.59209 35.2364 6.83207 35.75 8.125 35.75H30.875C31.1423 35.7463 31.4087 35.7191 31.6712 35.6687L32.1587 35.555H32.2725H32.3537L32.955 35.3275L33.1662 35.2137C33.3287 35.1162 33.5075 35.035 33.67 34.9212C33.887 34.7616 34.0933 34.5879 34.2875 34.4012L34.4012 34.255C34.5608 34.0933 34.7075 33.9195 34.84 33.735L34.9862 33.5237C35.0997 33.3428 35.1976 33.1526 35.2787 32.955C35.3233 32.877 35.3614 32.7955 35.3925 32.7112C35.4737 32.5162 35.5225 32.305 35.5875 32.0937V31.85C35.6796 31.5325 35.7342 31.2052 35.75 30.875V8.125C35.75 6.83207 35.2364 5.59209 34.3221 4.67785C33.4079 3.76361 32.1679 3.25 30.875 3.25ZM8.125 32.5C7.69402 32.5 7.2807 32.3288 6.97595 32.024C6.6712 31.7193 6.5 31.306 6.5 30.875V23.8712L11.8462 18.5087C11.9973 18.3564 12.177 18.2355 12.3751 18.153C12.5731 18.0705 12.7855 18.0281 13 18.0281C13.2145 18.0281 13.4269 18.0705 13.6249 18.153C13.823 18.2355 14.0027 18.3564 14.1537 18.5087L28.1287 32.5H8.125ZM32.5 30.875C32.4985 31.0753 32.4599 31.2737 32.3862 31.46C32.3491 31.5392 32.3056 31.6153 32.2562 31.6875C32.2128 31.7563 32.1639 31.8215 32.11 31.8825L23.4162 23.1887L24.8462 21.7587C24.9973 21.6064 25.177 21.4855 25.3751 21.403C25.5731 21.3205 25.7855 21.2781 26 21.2781C26.2145 21.2781 26.4269 21.3205 26.6249 21.403C26.823 21.4855 27.0027 21.6064 27.1537 21.7587L32.5 27.1212V30.875ZM32.5 22.5225L29.445 19.5C28.515 18.6176 27.282 18.1257 26 18.1257C24.718 18.1257 23.485 18.6176 22.555 19.5L21.125 20.93L16.445 16.25C15.515 15.3676 14.282 14.8757 13 14.8757C11.718 14.8757 10.485 15.3676 9.555 16.25L6.5 19.2725V8.125C6.5 7.69402 6.6712 7.2807 6.97595 6.97595C7.2807 6.6712 7.69402 6.5 8.125 6.5H30.875C31.306 6.5 31.7193 6.6712 32.024 6.97595C32.3288 7.2807 32.5 7.69402 32.5 8.125V22.5225ZM21.9375 9.75C21.4554 9.75 20.9841 9.89296 20.5833 10.1608C20.1825 10.4286 19.87 10.8093 19.6855 11.2547C19.5011 11.7001 19.4528 12.1902 19.5468 12.663C19.6409 13.1359 19.873 13.5702 20.2139 13.9111C20.5548 14.252 20.9891 14.4841 21.462 14.5782C21.9348 14.6722 22.4249 14.6239 22.8703 14.4395C23.3157 14.255 23.6964 13.9425 23.9642 13.5417C24.232 13.1409 24.375 12.6696 24.375 12.1875C24.375 11.541 24.1182 10.921 23.6611 10.4639C23.204 10.0068 22.584 9.75 21.9375 9.75Z"
                        fill="#A6A6A6"
                      />
                    </svg>
                  </ImageWrapper>
                </label>
                <FileInput
                  type="file"
                  onChange={handleImage}
                  name="imgfile"
                  id="imgfile"
                  accept=".png, .jpeg, .jpg"
                  multiple
                />
              </div> // 이미지 추가 시
            ) : (
              <ImageListContainer className="no-scroll">
                {imageList.map((url, idx) => (
                  <div key={idx} className="image-wrapper">
                    <Image
                      src={url}
                      alt={'preview'}
                      className="addedImg"
                      key={idx}
                      width={131}
                      height={131}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => handleClickDelete(idx)}
                      className="delete-btn"
                      width="19"
                      height="19"
                      viewBox="0 0 19 19"
                      fill="none"
                    >
                      <path
                        d="M13.5265 13.5266C11.0363 16.0168 6.99888 16.0168 4.5087 13.5266C2.01851 11.0365 2.01851 6.99907 4.5087 4.50888C6.99888 2.01869 11.0363 2.01869 13.5265 4.50888C16.0166 6.99907 16.0166 11.0365 13.5265 13.5266Z"
                        fill="#2B2B2B"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.3432 6.69278C11.5068 6.85642 11.5068 7.12174 11.3432 7.28538L7.28518 11.3434C7.12154 11.507 6.85623 11.507 6.69258 11.3434C6.52894 11.1797 6.52894 10.9144 6.69258 10.7508L10.7506 6.69278C10.9142 6.52914 11.1795 6.52914 11.3432 6.69278Z"
                        fill="white"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.3443 11.3432C11.1807 11.5068 10.9154 11.5068 10.7517 11.3432L6.69374 7.28518C6.5301 7.12154 6.5301 6.85622 6.69374 6.69258C6.85738 6.52894 7.12269 6.52894 7.28634 6.69258L11.3443 10.7506C11.508 10.9142 11.508 11.1795 11.3443 11.3432Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                ))}
                <AddBtnWrapper>
                  <label htmlFor="imgfile">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="add-btn"
                      width="35"
                      height="35"
                      viewBox="0 0 35 35"
                      fill="none"
                    >
                      <circle cx="17.5" cy="17.5" r="17.5" fill="#D9D9D9" />
                      <path
                        d="M17.5 9.625V25.375"
                        stroke="#353535"
                        strokeWidth="2.3"
                        strokeLinecap="round"
                      />
                      <path
                        d="M25.375 17.5L9.625 17.5"
                        stroke="#353535"
                        strokeWidth="2.3"
                        strokeLinecap="round"
                      />
                    </svg>
                  </label>
                  <FileInput
                    type="file"
                    onChange={handleImage}
                    name="imgfile"
                    id="imgfile"
                    accept=".png, .jpeg, .jpg,"
                    multiple
                  />
                </AddBtnWrapper>
              </ImageListContainer>
            )}
          </ImageSection>
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

const ImageSection = styled(LinkSection)`
  position: relative;
  margin-top: 24px;
  width: 100%;
  .no-scroll::-webkit-scrollbar {
    display: none;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 131px;
  height: 131px;
  flex-shrink: 0;
  border-radius: 8.24px;
  background: #f4f5f7;
  cursor: pointer;
`;

const FileInput = styled.input`
  display: none;
`;

const ImageListContainer = styled.div`
  display: flex;
  width: 100%;
  overflow-x: scroll;
  .add-btn {
    margin-left: 23px;
    cursor: pointer;
  }
  .image-wrapper {
    position: relative;
    width: 131px;
    height: 131px;
    margin-right: 7px;
  }
  .delete-btn {
    position: absolute;
    right: 7px;
    top: 7px;
    cursor: pointer;
  }
  .addedImg {
    width: 131px;
    height: 131px;
    flex-shrink: 0;
    border-radius: 8.24px;
    background: #f4f5f7;
    object-fit: cover;
  }
`;

const AddBtnWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 131px;
  padding-right: 30px;
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

const ImageCounter = styled.div`
  /* position: absolute; */
  left: 324px;
  color: #595959;

  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px; /* 150% */
  letter-spacing: -0.32px;
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
