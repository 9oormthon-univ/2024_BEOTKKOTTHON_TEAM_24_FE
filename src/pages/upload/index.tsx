import MoveToNextBtn from '@/components/upload/MoveToNextBtn';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';

const LinkInput: NextPage = ({}) => {
  const router = useRouter();
  const [link, setLink] = useState<string>('');
  const [memo, setMemo] = useState('');
  const [imageList, setImageList] = useState<string[]>([]);
  const [errorText, setErrorText] = useState('');

  const handleClickNext = async () => {
    // 입력 링크 유효성 검사
    if (!link) {
      alert('링크를 입력해주세요.');
      return;
    }
    // 인사이트 제목, 요약, 키워드 요청
    router.push(
      {
        pathname: '/upload/input-text',
        query: {
          link: link,
          imageList: imageList,
          memo: memo,
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
    const newImages = Array.from(e?.target.files, (file: Blob | MediaSource) =>
      URL.createObjectURL(file),
    );
    const newList = imageList.concat(newImages);
    if (newList.length > 10) {
      alert('이미지는 10장 이상 추가할 수 없습니다.');
      return;
    }
    setImageList(newList);
  };

  const handleMemo = (newMemo: string) => {
    memo.length < 500 && setMemo(newMemo);
  };

  return (
    <>
      <Wrapper>
        <PageContainer className="no-scroll">
          <Header>
            <PageName>인사이트 저장</PageName>
            <CancelBtn>
              <Link href="/">
                <svg
                  width="11"
                  height="18"
                  viewBox="0 0 11 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.25 8.94922C0.25 8.77995 0.279297 8.6237 0.337891 8.48047C0.402995 8.33724 0.500651 8.20052 0.630859 8.07031L8.23828 0.628906C8.45964 0.414062 8.72656 0.306641 9.03906 0.306641C9.25391 0.306641 9.44596 0.358724 9.61523 0.462891C9.79102 0.560547 9.93099 0.69401 10.0352 0.863281C10.1393 1.03255 10.1914 1.22461 10.1914 1.43945C10.1914 1.74544 10.071 2.01888 9.83008 2.25977L2.97461 8.94922L9.83008 15.6387C10.071 15.8796 10.1914 16.1562 10.1914 16.4688C10.1914 16.6771 10.1393 16.8659 10.0352 17.0352C9.93099 17.2109 9.79102 17.3477 9.61523 17.4453C9.44596 17.5495 9.25391 17.6016 9.03906 17.6016C8.72656 17.6016 8.45964 17.4909 8.23828 17.2695L0.630859 9.82812C0.500651 9.69792 0.402995 9.5612 0.337891 9.41797C0.279297 9.27474 0.25 9.11849 0.25 8.94922Z"
                    fill="#6F6F6F"
                  />
                </svg>
              </Link>
            </CancelBtn>
          </Header>
          <LinkSection>
            <SubTitle>인사이트 링크</SubTitle>
            <ErrorText>{errorText}</ErrorText>
            <Input
              type="text"
              value={link}
              onChange={(e) => handleInputLink(e.target.value)}
            />
            <svg
              className="link-icon"
              width="27"
              height="27"
              viewBox="0 0 27 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Link">
                <path
                  id="Vector"
                  d="M13.6238 17.3138L9.25881 21.6788C8.73033 22.1888 8.02453 22.4739 7.29006 22.4739C6.55559 22.4739 5.84979 22.1888 5.32131 21.6788C5.06212 21.4206 4.85645 21.1138 4.71612 20.7759C4.57579 20.4381 4.50355 20.0758 4.50355 19.71C4.50355 19.3442 4.57579 18.9819 4.71612 18.6441C4.85645 18.3062 5.06212 17.9994 5.32131 17.7413L9.68631 13.3763C9.89815 13.1644 10.0172 12.8771 10.0172 12.5775C10.0172 12.2779 9.89815 11.9906 9.68631 11.7788C9.47447 11.5669 9.18715 11.4479 8.88756 11.4479C8.58797 11.4479 8.30065 11.5669 8.08881 11.7788L3.72381 16.155C2.84446 17.1122 2.36888 18.372 2.39639 19.6715C2.4239 20.971 2.95238 22.2096 3.87145 23.1286C4.79052 24.0477 6.02912 24.5762 7.32859 24.6037C8.62806 24.6312 9.88792 24.1556 10.8451 23.2763L15.2213 18.9113C15.4332 18.6994 15.5522 18.4121 15.5522 18.1125C15.5522 17.8129 15.4332 17.5256 15.2213 17.3138C15.0095 17.1019 14.7221 16.9829 14.4226 16.9829C14.123 16.9829 13.8357 17.1019 13.6238 17.3138ZM23.2763 3.72376C22.3299 2.78327 21.0499 2.2554 19.7157 2.2554C18.3815 2.2554 17.1014 2.78327 16.1551 3.72376L11.7788 8.08877C11.6739 8.19366 11.5907 8.31818 11.5339 8.45523C11.4772 8.59228 11.448 8.73917 11.448 8.88752C11.448 9.03586 11.4772 9.18275 11.5339 9.3198C11.5907 9.45684 11.6739 9.58137 11.7788 9.68626C11.8837 9.79116 12.0082 9.87436 12.1453 9.93113C12.2823 9.9879 12.4292 10.0171 12.5776 10.0171C12.7259 10.0171 12.8728 9.9879 13.0098 9.93113C13.1469 9.87436 13.2714 9.79116 13.3763 9.68626L17.7413 5.32126C18.2698 4.81122 18.9756 4.52618 19.7101 4.52618C20.4445 4.52618 21.1503 4.81122 21.6788 5.32126C21.938 5.57944 22.1437 5.88625 22.284 6.2241C22.4243 6.56195 22.4966 6.92418 22.4966 7.29002C22.4966 7.65585 22.4243 8.01808 22.284 8.35593C22.1437 8.69378 21.938 9.00059 21.6788 9.25876L17.3138 13.6238C17.2084 13.7283 17.1247 13.8528 17.0676 13.9899C17.0104 14.127 16.981 14.274 16.981 14.4225C16.981 14.571 17.0104 14.7181 17.0676 14.8552C17.1247 14.9923 17.2084 15.1167 17.3138 15.2213C17.4184 15.3267 17.5428 15.4104 17.6799 15.4675C17.817 15.5246 17.964 15.554 18.1126 15.554C18.2611 15.554 18.4081 15.5246 18.5452 15.4675C18.6823 15.4104 18.8067 15.3267 18.9113 15.2213L23.2763 10.845C24.2168 9.89864 24.7447 8.61861 24.7447 7.28439C24.7447 5.95017 24.2168 4.67014 23.2763 3.72376ZM9.93381 17.0663C10.0389 17.1705 10.1636 17.253 10.3007 17.309C10.4377 17.365 10.5845 17.3934 10.7326 17.3925C10.8806 17.3934 11.0274 17.365 11.1645 17.309C11.3015 17.253 11.4262 17.1705 11.5313 17.0663L17.0663 11.5313C17.2782 11.3194 17.3972 11.0321 17.3972 10.7325C17.3972 10.4329 17.2782 10.1456 17.0663 9.93376C16.8545 9.72192 16.5672 9.60291 16.2676 9.60291C15.968 9.60291 15.6807 9.72192 15.4688 9.93376L9.93381 15.4688C9.82837 15.5733 9.74467 15.6978 9.68756 15.8349C9.63044 15.972 9.60104 16.119 9.60104 16.2675C9.60104 16.416 9.63044 16.5631 9.68756 16.7002C9.74467 16.8373 9.82837 16.9617 9.93381 17.0663Z"
                  fill="#565656"
                />
              </g>
            </svg>
          </LinkSection>
          <ImageSection>
            <SubTitle>이미지</SubTitle>
            <ImageCounter>{imageList.length}/10</ImageCounter>
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
          <SourceSection>
            <SubTitle>출처</SubTitle>
            <SourceInput placeholder="출처를 입력하세요." />
          </SourceSection>
          <div className="absolute">
            <MoveToNextBtn
              width="351px"
              height="69px"
              title="다음"
              fontSize="20px"
              background="#3184FF"
              onClick={handleClickNext}
              isDisabled={link.length === 0 && memo.length === 0}
            />
          </div>
        </PageContainer>
      </Wrapper>
    </>
  );
};

export default LinkInput;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  .no-scroll::-webkit-scrollbar {
    display: none;
  }
`;

const PageContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 393px;
  height: 852px;
  margin-bottom: 200px;
  .absolute {
    position: absolute;
    bottom: 35px;
  }
`;

const Input = styled.input`
  width: 353px;
  height: 51px;
  font-size: 15px;
  border: none;
  outline: none;
  padding: 10px;
  border-radius: 8.235px;
  background: #f4f5f7;
  color: black;
  padding-left: 54px;
`;

const Header = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 30px;
  width: 100%;
  height: 28px;
  align-items: center;
  justify-content: center;
`;

const PageName = styled.span`
  color: rgba(31, 31, 31, 0.9);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 27.146px; /* 135.732% */
  letter-spacing: 0.8px;
`;

const CancelBtn = styled.div`
  position: absolute;
  font-size: 12px;
  left: 18px;
`;

const LinkSection = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  margin-top: 44px;
  .link-icon {
    position: absolute;
    top: 41px;
    left: 12px;
  }
`;

const ErrorText = styled.div`
  height: 22px;
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  color: var(--System-Warning, #f1404b);
  text-align: right;
  /* Body-14-M */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 19.6px */
`;

const ImageSection = styled(LinkSection)`
  position: relative;
  margin-top: 24px;
  width: 353px;
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
  width: 353px;
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
`;

const ImageCounter = styled.div`
  position: absolute;
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
`;

const MemoInput = styled.textarea`
  width: 353px;
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

const SourceSection = styled(LinkSection)`
  margin-top: 24px;
`;

const SourceInput = styled(Input)`
  padding: 14px 16px;
`;
