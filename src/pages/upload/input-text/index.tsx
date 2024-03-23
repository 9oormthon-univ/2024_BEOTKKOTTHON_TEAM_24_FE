import ToggleSlider from '@/components/upload/ToggleSlider';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import AutosizeInput from 'react-input-autosize';
import SelectRemindModal from '@/components/upload/SelectRemindModal';
import SelectFolderModal from '@/components/upload/SelectFolderModal';
import { postInsight, useGetSummary } from '@/api/insight';
import loadingGIF from '../../../../public/loading.gif';
import { loadingBlurURL } from '@/constants/index';
import Image from 'next/image';
import Header from '@/components/common/Header';
import BottomBtn from '@/components/common/BottomBtn';
import { InsightPostRequest } from '@/types/insight';
import defaultImage from '@image/defaultImage.jpeg';
import LocalStorage from '@/hooks/LocalStorage';

type aiInput = {
  link: string;
  folderList: string[];
};

const Upload: NextPage = ({}) => {
  const router = useRouter();
  const [insightLink, setInsightLink] = useState<aiInput>({
    link: '',
    folderList: [],
  });
  const { isLoading, error, result } = useGetSummary(
    String(insightLink.link),
    insightLink.folderList,
  );
  const [insightInput, setInsightInput] = useState<InsightPostRequest>({
    insightUrl: '',
    insightTitle: '',
    insightSummary: '',
    insightMainImage: '',
    insightSource: '',
    viewCount: 0,
    hashTagList: [''],
    insightMemo: '',
    insightImageList: [''],
    folderName: '미드저니',
    enable: false,
    remindType: 'DEFAULT',
    remindDays: [1],
  });
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [isModal, setIsModal] = useState('');
  const [remindTerm, setRemindTerm] = useState('');
  const { memo, imageList, insightImageList, link, folderNameList } =
    router.query;
  const [thumbnail, setThumbnail] = useState<string | string[] | undefined>();
  const accessToken = LocalStorage.getItem('accessToken');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const newLink = String(link);
    setInsightLink({
      link: newLink,
      folderList: folderNameList
        ? Array.isArray(folderNameList)
          ? folderNameList
          : [folderNameList]
        : [],
    });
  }, []);

  useEffect(() => {
    if (result.title) {
      setInsightInput({
        ...insightInput,
        insightTitle: result.title,
        insightSummary: String(result.summary),
        hashTagList: result.keywords
          ? Array.isArray(result.keywords)
            ? result.keywords
            : result.keywords.split(', ')
          : [],
        insightMemo: String(memo),
        insightImageList: insightImageList
          ? Array.isArray(insightImageList)
            ? insightImageList
            : [insightImageList]
          : [],
        folderName: String(result.folderName),
      });
      setThumbnail(
        imageList ? (Array.isArray(imageList) ? imageList : [imageList]) : [],
      );
    }
    if (error) {
      console.error(error);
      alert('정보를 받아오는데 실패했습니다. 다시 시도해주세요.');
      router.push(
        {
          pathname: '/upload',
        },
        '/upload',
      );
    }
  }, [result.title]);

  const handleDeleteTag = (idx: number) => {
    if (insightInput.hashTagList.length === 1) {
      alert('인사이트 저장에는 최소 태그 1개 이상이 필요해요!');
      return;
    }
    const newKeywords = insightInput.hashTagList.filter(
      (tag) => insightInput.hashTagList.indexOf(tag) !== idx,
    );
    setInsightInput({ ...insightInput, hashTagList: newKeywords });
  };

  const checkEnter = (key: string) => {
    if (key === 'Enter') {
      const newKeywords = [...insightInput.hashTagList, tagInput];
      setInsightInput({ ...insightInput, hashTagList: newKeywords });
      setTagInput('');
      setIsAddingTag(false);
    }
  };

  const handleBlur = () => {
    setIsAddingTag(false);
    setTagInput('');
    console.log(thumbnail);
  };

  const handleRemindToggle = () => {
    insightInput.enable === true &&
      setInsightInput({
        ...insightInput,
        enable: false,
        remindType: 'DEFAULT',
      });
    if (insightInput.enable === false) {
      setIsModal('remind');
      setInsightInput({
        ...insightInput,
        enable: true,
        remindType: 'DEFAULT',
      });
    }
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    await postInsight(insightInput, String(accessToken));
  };

  return (
    <>
      <Wrapper>
        {isLoading ? (
          <LoadingWrapper>
            <Image
              src={loadingGIF}
              alt="loading"
              placeholder="blur"
              blurDataURL={loadingBlurURL}
              width={192}
              height={192}
            />
            <LoadingTitle>인사이트 정리중 ••</LoadingTitle>
            <LoadingContent>
              쉽게 리마인드 할 수 있도록 인사이트를 정리하고 있어요!
            </LoadingContent>
          </LoadingWrapper>
        ) : ( !isSaving && (
          <>
            <Header title="인사이트 저장" />
            <PageContainer className="no-scroll">
              <PageIntro>리마인드 카드 설정</PageIntro>
              <ImageSection className="image-section">
                <div className="image-wrapper">
                  {insightImageList !== undefined && (
                    <CardCover
                      src={thumbnail?.[0]}
                      alt="preview"
                      className="thumbnail"
                    />
                  )}
                  {insightImageList === undefined && (
                    <Image
                      src={defaultImage}
                      alt="default"
                      width={364}
                      height={220}
                      className="thumbnail"
                    />
                  )}
                </div>
              </ImageSection>
              <TitleSection>
                <SubTitle>제목</SubTitle>
                <Input
                  type="text"
                  value={insightInput.insightTitle}
                  onChange={(e) =>
                    setInsightInput({
                      ...insightInput,
                      insightTitle: e.target.value,
                    })
                  }
                />
              </TitleSection>
              <SummarySection>
                <SubTitle>인사이트 요약</SubTitle>
                <SumamryInput
                  value={insightInput.insightSummary}
                  className="no-scroll"
                  onChange={(e) =>
                    setInsightInput({
                      ...insightInput,
                      insightSummary: e.target.value,
                    })
                  }
                />
              </SummarySection>
              <TagSection>
                <SubTitle>태그</SubTitle>
                <TagCounter>{insightInput.hashTagList.length}/3</TagCounter>
                <TagList>
                  {insightInput.hashTagList.map((tag, idx) => (
                    <TagWrapper key={idx}>
                      <span>{tag}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => handleDeleteTag(idx)}
                        className="delete-btn"
                        width="19"
                        height="20"
                        viewBox="0 0 19 20"
                        fill="none"
                      >
                        <path
                          d="M13.5265 14.5091C11.0363 16.9992 6.99888 16.9992 4.5087 14.5091C2.01851 12.0189 2.01851 7.98149 4.5087 5.4913C6.99888 3.00112 11.0363 3.00112 13.5265 5.4913C16.0166 7.98149 16.0166 12.0189 13.5265 14.5091Z"
                          fill="#848484"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11.3432 7.6752C11.5068 7.83884 11.5068 8.10416 11.3432 8.2678L7.28518 12.3258C7.12154 12.4894 6.85623 12.4894 6.69258 12.3258C6.52894 12.1622 6.52894 11.8968 6.69258 11.7332L10.7506 7.6752C10.9142 7.51156 11.1795 7.51156 11.3432 7.6752Z"
                          fill="white"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11.3434 12.3256C11.1797 12.4892 10.9144 12.4892 10.7508 12.3256L6.69276 8.2676C6.52912 8.10396 6.52912 7.83865 6.69276 7.67501C6.8564 7.51137 7.12172 7.51137 7.28536 7.67501L11.3434 11.733C11.507 11.8966 11.507 12.162 11.3434 12.3256Z"
                          fill="white"
                        />
                      </svg>
                    </TagWrapper>
                  ))}
                  {insightInput.hashTagList.length < 3 && (
                    <TagWrapper key="addTag">
                      {isAddingTag ? (
                        <AutosizeInput
                          name="add-tag"
                          value={tagInput}
                          onKeyDownCapture={(e) => checkEnter(e.key)}
                          onChange={(e) => setTagInput(e.target.value)}
                          onBlur={handleBlur}
                          inputStyle={{
                            background: '#F4F5F7',
                            border: 'none',
                            outline: 'none',
                            fontSize: '14px',
                            color: '#1F1F1F',
                            textAlign: 'center',
                            fontFamily: 'Pretendard',
                            fontStyle: 'normal',
                            fontWeight: '500',
                            lineHeight: '140%',
                          }}
                        />
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          onClick={() => setIsAddingTag(true)}
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M7.84473 1.42969V14.5703"
                            stroke="#565656"
                            stroke-width="1.8125"
                            stroke-linecap="round"
                          />
                          <path
                            d="M14.6416 7.77344L1.50098 7.77344"
                            stroke="#565656"
                            stroke-width="1.8125"
                            stroke-linecap="round"
                          />
                        </svg>
                      )}
                    </TagWrapper>
                  )}
                </TagList>
              </TagSection>
              <FolderSection>
                <SubTitle>폴더 설정</SubTitle>
                <FolderIndicator>
                  {insightInput.folderName}
                  <ChangeFolderBtn onClick={() => setIsModal('folder')}>
                    <span>폴더 설정</span>
                    <svg
                      width="9"
                      height="15"
                      viewBox="0 0 9 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.95833 7.37565C8.95833 7.51671 8.93392 7.64692 8.88509 7.76628C8.83084 7.88563 8.74946 7.99957 8.64095 8.10807L2.30143 14.3092C2.11697 14.4883 1.89453 14.5778 1.63411 14.5778C1.45508 14.5778 1.29503 14.5344 1.15397 14.4476C1.00749 14.3662 0.890842 14.255 0.804036 14.1139C0.717231 13.9729 0.673828 13.8128 0.673828 13.6338C0.673828 13.3788 0.774197 13.1509 0.974935 12.9502L6.68783 7.37565L0.974936 1.80111C0.774198 1.60037 0.673829 1.36979 0.673829 1.10937C0.673829 0.935763 0.717232 0.778428 0.804038 0.637369C0.890843 0.490885 1.00749 0.376952 1.15397 0.295572C1.29503 0.208767 1.45508 0.165364 1.63412 0.165364C1.89453 0.165364 2.11697 0.257595 2.30143 0.442057L8.64095 6.64323C8.74946 6.75174 8.83084 6.86567 8.88509 6.98503C8.93392 7.10438 8.95833 7.23459 8.95833 7.37565Z"
                        fill="#7F7F7F"
                      />
                    </svg>
                  </ChangeFolderBtn>
                </FolderIndicator>
              </FolderSection>
              <RemindSection>
                <SubTitle>리마인드 설정</SubTitle>
                <RemindSetter>
                  <span>인사이트 다시 읽기</span>
                  <RemindIndicator>
                    {insightInput.enable === true && remindTerm}
                    <ToggleSlider
                      $isSelected={insightInput.enable}
                      onClick={handleRemindToggle}
                    />
                  </RemindIndicator>
                </RemindSetter>
              </RemindSection>
              {isModal === 'remind' && (
                <SelectRemindModal
                  remindType={insightInput.remindType}
                  onClose={() => setIsModal('')}
                  onSelect={setInsightInput}
                  insightInput={insightInput}
                  setRemindTerm={setRemindTerm}
                />
              )}
              {isModal === 'folder' && (
                <SelectFolderModal
                  onClose={() => setIsModal('')}
                  selectedFolder={insightInput.folderName}
                  insightInput={insightInput}
                  onSelect={setInsightInput}
                />
              )}
            </PageContainer>
            <div className="bottom-btn">
              <BottomBtn
                text="완료"
                state="activated"
                onClick={() => handleSubmit()}
              />
            </div>
          </>
        ))}
        {isSaving && (
          <LoadingWrapper>
            <Image
              src={loadingGIF}
              alt="loading"
              placeholder="blur"
              blurDataURL={loadingBlurURL}
              width={192}
              height={192}
            />
            <LoadingTitle>인사이트 저장중 ••</LoadingTitle>
            <LoadingContent>
              쉽게 리마인드 할 수 있도록 인사이트를 저장하고 있어요!
            </LoadingContent>
          </LoadingWrapper>
        )}
      </Wrapper>
    </>
  );
};

export default Upload;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  .no-scroll::-webkit-scrollbar {
    display: none;
  }
  .bottom-btn {
    width: 100%;
    display: fixed;
    margin-bottom: 36px;
  }
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoadingTitle = styled.div`
  color: #3184ff;

  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 28px */
  margin-top: 22px;
`;

const LoadingContent = styled.div`
  color: #1f1f1f;
  width: 179px;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 22.4px */
  white-space: wrap;
  word-break: keep-all;
  margin-top: 14px;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  padding: 0px 20px;
  height: 100vh;
  overflow-y: scroll;
`;

const Input = styled.input`
  width: 100%;
  height: 51px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  outline: none;
  padding: 10px;
  border-radius: 8.235px;
  background: #f4f5f7;
  color: black;
`;

const PageIntro = styled.div`
  width: 100%;
  text-align: left;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 25px;
  word-break: keep-all;
  margin-top: 8px;
`;

const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 17px;
  position: relative;
  width: 100%;

  border-radius: 13px;
  .image-wrapper {
    min-height: 164px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    .thumbnail {
      object-fit: cover;
    }
  }

  & .image-section {
    height: 220px;
  }
`;

const CardCover = styled.img`
  width: 364px;
  height: 220px;
  border-radius: 12px;
`;

const TitleSection = styled(ImageSection)``;

const SubTitle = styled.div`
  margin-bottom: 8px;
  color: var(--Neutral-500, #1f1f1f);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 19.6px */
`;

const SummarySection = styled(ImageSection)``;

const SumamryInput = styled.textarea`
  display: flex;
  width: 100%;
  padding: 14px 16px;
  flex-direction: column;
  align-items: flex-end;
  gap: 14px;

  border: none;
  border-radius: 8px;
  background: var(--Neutral-100, #f4f5f7);
  outline: none;
  resize: none;

  color: var(--Neutral-500, #1f1f1f);
  /* Body-14-M */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 19.6px */
`;

const TagSection = styled(ImageSection)``;

const TagCounter = styled.div`
  position: absolute;
  top: 0;
  left: 34px;
  color: var(--Primary-500, #3184ff);
  /* Body-14-M */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 19.6px */
`;

const TagList = styled.div`
  display: flex;
  flex-direction: row;
  flex-flow: row wrap;
`;

const TagWrapper = styled.div`
  position: relative;
  display: flex;
  width: auto;
  height: 32px;
  padding: 6px 10px 6px 10px;
  margin-right: 8px;
  margin-bottom: 8px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  border-radius: 8px;
  background: var(--Neutral-100, #f4f5f7);

  color: var(--Neutral-500, #1f1f1f);
  text-align: center;
  /* Body-14-M */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 19.6px */
`;

const FolderSection = styled(ImageSection)``;

const FolderIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 14px 16px;
  align-items: flex-end;
  gap: 14px;

  border: none;
  border-radius: 8px;
  background: var(--Neutral-100, #f4f5f7);
`;

const ChangeFolderBtn = styled.div`
  width: 78.5px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  color: #7f7f7f;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px; /* 131.25% */
  letter-spacing: -0.32px;
  cursor: pointer;
`;

const RemindSection = styled(ImageSection)``;

const RemindIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  max-width: 200px;
  color: var(--Primary-500, #3184ff);
  text-align: right;
  /* Body-14-M */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 19.6px */
  gap: 14px;
`;

const RemindSetter = styled(FolderIndicator)`
  display: flex;
  align-items: center;
  padding: 14px 16px;
`;
