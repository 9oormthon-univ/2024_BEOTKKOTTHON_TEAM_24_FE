import ToggleSlider from '@/components/upload/ToggleSlider';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SelectRemindModal from '@/components/upload/SelectRemindModal';
import SelectFolderModal from '@/components/upload/SelectFolderModal';
import { useGetSummary } from '@/api/insight';
import Image from 'next/image';
import Header from '@/components/common/Header';
import BottomBtn from '@/components/common/BottomBtn';
import { InsightPostRequest } from '@/types/insight';
import defaultImage from '@image/defaultImage.jpeg';
import { usePostInsight } from '@/hooks/api/useInsight';
import Loading from '@/components/upload/Loading';
import InputWithTitle from '@/components/common/InputWithTitle';
import TagSection from '@/components/upload/TagSection';
import OptionalTextarea from '@/components/common/OptionalTextarea';

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
    insightTagList: [''],
    insightMemo: '',
    insightImageList: [''],
    folderName: '',
    enable: false,
    remindType: 'DEFAULT',
    remindDays: [1],
  });
  const [isModal, setIsModal] = useState('');
  const [remindTerm, setRemindTerm] = useState('');
  const { source, memo, imageList, insightImageList, link, folderNameList } =
    router.query;
  const [thumbnail, setThumbnail] = useState<string | string[] | undefined>();
  const [isSaving, setIsSaving] = useState(false);
  const { mutate } = usePostInsight();

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
        insightSource: String(source),
        insightUrl: String(link),
        insightTitle: result.title,
        insightSummary: String(result.summary),
        insightMainImage: String(imageList?.[0]),
        insightTagList: result.keywords
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
        imageList ? (Array.isArray(imageList) ? imageList[0] : imageList) : [],
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
    mutate(insightInput);
  };

  return (
    <>
      <Wrapper>
        {isLoading ? (
          <Loading />
        ) : (
          !isSaving && (
            <>
              <Header title="인사이트 저장" />
              <PageContainer className="no-scroll">
                <PageIntro>리마인드 카드 설정</PageIntro>
                <ImageSection className="image-section">
                  <div className="image-wrapper">
                    {insightImageList !== undefined && (
                      <CardCover
                        src={String(thumbnail)}
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
                <InputWithTitle
                  top={18}
                  biggerTypo="input"
                  title="제목"
                  value={insightInput.insightTitle}
                  onChange={(e) =>
                    setInsightInput({
                      ...insightInput,
                      insightTitle: e.target.value,
                    })
                  }
                />
                <OptionalTextarea
                  titleTypo="small"
                  top={20}
                  title="인사이트 요약"
                  value={insightInput.insightSummary}
                  onChange={(e) =>
                    setInsightInput({
                      ...insightInput,
                      insightSummary: e.target.value,
                    })
                  }
                />
                <TagSection
                  insightInput={insightInput}
                  setInsightInput={setInsightInput}
                />
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
          )
        )}
        {isSaving && <Loading />}
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

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  padding: 0px 20px;
  height: 100vh;
  overflow-y: scroll;
  padding-bottom: 36px;
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

const SubTitle = styled.div`
  margin-bottom: 8px;
  color: var(--Neutral-500, #1f1f1f);
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
