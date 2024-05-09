import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SelectRemindModal from '@/components/upload/SelectRemindModal';
import SelectFolderModal from '@/components/upload/SelectFolderModal';
import { useGetSummary } from '@/hooks/api/useInsight';
import Image from 'next/image';
import Header from '@/components/common/Header';
import BottomBtn from '@/components/common/BottomBtn';
import defaultImage from '@image/defaultImage.jpeg';
import { usePostInsight } from '@/hooks/api/useInsight';
import Loading from '@/components/upload/Loading';
import InputWithTitle from '@/components/common/InputWithTitle';
import TagSection from '@/components/upload/TagSection';
import OptionalTextarea from '@/components/common/OptionalTextarea';
import FolderSetting from '@/components/upload/FolderSetting';
import RemindSetting from '@/components/upload/RemindSetting';
import useInsightInput from '@/hooks/custom/useInsightInput';
import useLinkInput from '@/hooks/custom/useLinkInput';

const Upload: NextPage = ({}) => {
  const router = useRouter();
  const { insightLink, updateInsightLink } = useLinkInput();
  const { isLoading, error, result } = useGetSummary(
    String(insightLink.link),
    insightLink.folderList,
  );
  const { insightInput, setInsightInput, updateInsightInput } = useInsightInput(router.query)
  const { mutate } = usePostInsight();

  const [isModal, setIsModal] = useState('');
  const [remindTerm, setRemindTerm] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    updateInsightLink(router.query)
  }, []);

  useEffect(() => {
    if (result.title) {
      updateInsightInput(result);
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

  const handleSubmit = () => {
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
                <ImageSection>
                  <div className="image-wrapper">
                    {insightInput.insightMainImage ? (
                      <CardCover
                        src={insightInput.insightMainImage}
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
                <RemindSetting
                  insightInput={insightInput}
                  remindTerm={remindTerm}
                  setIsModal={setIsModal}
                  setInsightInput={setInsightInput}
                />
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

const PageIntro = styled.p`
  width: 100%;
  text-align: left;
  font-size: 18px;
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
  height: 220px;

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
`;

const CardCover = styled.img`
  width: 364px;
  height: 220px;
  border-radius: 12px;
`;
