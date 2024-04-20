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
import FolderSetting from '@/components/upload/FolderSetting';

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
    folderName: '폴더',
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
                    {insightImageList ? (
                      <CardCover
                        src={String(thumbnail)}
                        alt="preview"
                        className="thumbnail"
                      />
                    ) : (
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
                <FolderSetting
                  folderName={insightInput.folderName}
                  setIsModal={setIsModal}
                />
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
  line-height: 140%;
`;

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

const RemindSection = styled(ImageSection)``;

const RemindIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  max-width: 200px;
  color: #3184ff;
  text-align: right;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  gap: 14px;
`;

const RemindSetter = styled(FolderIndicator)`
  display: flex;
  align-items: center;
  padding: 14px 16px;
`;
