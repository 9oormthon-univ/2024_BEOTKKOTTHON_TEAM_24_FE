import ToggleSlider from '@/components/upload/ToggleSlider';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import AutosizeInput from 'react-input-autosize';
import SelectRemindModal from '@/components/upload/SelectRemindModal';
import SelectFolderModal from '@/components/upload/SelectFolderModal';
export interface insightInput {
  title: string | string[] | undefined;
  summary: string | string[] | undefined;
  keywords: string[];
  memo: string | string[] | undefined;
  imageList: string | string[] | undefined;
  folder: { name: string; mainColor: string; subColor: string; };
  isRemind: boolean;
  remindType: string;
  remindDay?: number[];
}

const Upload: NextPage = ({}) => {
  const router = useRouter();
  const [insightInput, setInsightInput] = useState<insightInput>({
    title: '',
    summary: '',
    keywords: [],
    memo: '',
    imageList: [],
    folder: { name: '미드저니', mainColor: '#A1D0FF', subColor: '#D7EBFF' },
    isRemind: false,
    remindType: '',
    remindDay: [],
  });
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [isModal, setIsModal] = useState('');
  const [remindTerm, setRemindTerm] = useState('');

  const handleImgChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e?.target.files) return;
    // 이미지 화면에 띄우기
  };

  const handleDeleteTag = (idx: number) => {
    if (insightInput.keywords.length === 1) {
      alert('인사이트 저장에는 최소 태그 1개 이상이 필요해요!');
      return;
    }
    const newKeywords = insightInput.keywords.filter(
      (tag) => insightInput.keywords.indexOf(tag) !== idx,
    );
    setInsightInput({ ...insightInput, keywords: newKeywords });
  };

  const checkEnter = (key: string) => {
    if (key === 'Enter') {
      const newKeywords = [...insightInput.keywords, tagInput];
      setInsightInput({ ...insightInput, keywords: newKeywords });
      setTagInput('');
      setIsAddingTag(false);
    }
  };

  const handleBlur = () => {
    setIsAddingTag(false);
    setTagInput('');
  };

  const handleRemindToggle = () => {
    insightInput.isRemind === true &&
      setInsightInput({ ...insightInput, isRemind: false, remindType: '' });
    if (insightInput.isRemind === false) {
      setIsModal('remind');
      setInsightInput({
        ...insightInput,
        isRemind: true,
        remindType: 'recommend',
      });
    }
  };

  const renderRemindTerm = () => {
    const weekData = ['월', '화', '수', '목', '금', '토', '일'];
    switch (insightInput.remindType) {
      case '':
        return;
      case 'recommend':
        setRemindTerm('추천 주기');
        break;
      case 'weekly':
        if (insightInput.remindDay?.length === 7) {
          setRemindTerm('매일 마다 ');
          break;
        }
        const resultWeek = weekData.filter((day) =>
          insightInput.remindDay?.includes(weekData.indexOf(day) + 1),
        );
        const printContentWeek = resultWeek?.join('/');
        setRemindTerm(printContentWeek + '마다 ');
        break;
      case 'monthly':
        const resultMonth =
          insightInput.remindDay &&
          Array.from(insightInput.remindDay, (day) => `${day}일`);
        const printContent = resultMonth?.join(', ');
        setRemindTerm(printContent + '마다 ');
        break;
    }
  };

  useEffect(() => {
    const { title, summary, keywords, memo, imageList } = router.query;
    setInsightInput({
      title: title,
      summary: summary,
      keywords: keywords
        ? Array.isArray(keywords)
          ? keywords
          : [keywords]
        : [],
      memo: memo,
      imageList: imageList
        ? Array.isArray(imageList)
          ? imageList
          : [imageList]
        : [],
      folder: insightInput.folder,
      isRemind: insightInput.isRemind,
      remindType: insightInput.remindType,
    });
    renderRemindTerm();
  }, [
    router.query,
    insightInput.remindType,
    insightInput.isRemind,
    insightInput.remindDay,
  ]);
  return (
    <>
      <Wrapper>
        <PageContainer>
          <Header>
            <PageName>인사이트 저장</PageName>
            <CancelBtn>
              <Link href="/upload/">
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
          <PageIntro>리마인드 카드 설정</PageIntro>
          <ImageSection>
            <div className="image-wrapper">
              <CardCover src={insightInput.imageList?.[0]} alt="preview" />
              <label htmlFor="imgfile">
                <ChangeImgBtn>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                  >
                    <path
                      d="M1.09977 17H1.31177L3.6438 16.5703C4.70382 16.3555 5.65783 15.8183 6.39984 15.0664L16.046 5.39811C16.682 4.86098 17 4.00158 17 3.14218C17 2.28278 16.682 1.53081 16.046 0.886256C14.88 -0.295419 12.8659 -0.295419 11.5939 0.886256L1.94778 10.4471C1.20577 11.1991 0.67576 12.1659 0.463757 13.2401L0.0397506 15.7109C-0.066251 16.0332 0.0397507 16.4629 0.357755 16.6777C0.569759 16.8926 0.781761 17 1.09977 17ZM13.0779 2.49763C13.2899 2.28278 13.608 2.17536 13.82 2.17536C14.138 2.17536 14.35 2.28278 14.562 2.49763C14.774 2.71248 14.88 2.92733 14.88 3.14218C14.88 3.24961 14.88 3.57188 14.562 3.89416L14.138 4.32386L12.6539 2.92733L13.0779 2.49763ZM2.58379 13.7773C2.68979 13.1327 3.00779 12.5956 3.5378 12.0585L11.1699 4.43128L12.6539 5.82781L5.02182 13.455C4.59782 13.8847 3.96181 14.207 3.3258 14.3144L2.47779 14.5292L2.58379 13.7773Z"
                      fill="white"
                    />
                  </svg>
                </ChangeImgBtn>
              </label>
              <FileInput
                type="file"
                onChange={handleImgChange}
                name="imgfile"
                id="imgfile"
                accept=".png, .jpeg, .jpg"
                multiple
              />
            </div>
          </ImageSection>
          <TitleSection>
            <SubTitle>제목</SubTitle>
            <Input
              type="text"
              value={insightInput.title}
              onChange={(e) =>
                setInsightInput({ ...insightInput, title: e.target.value })
              }
            />
          </TitleSection>
          <SummarySection>
            <SubTitle>인사이트 요약</SubTitle>
            <SumamryInput
              value={insightInput.summary}
              onChange={(e) =>
                setInsightInput({ ...insightInput, summary: e.target.value })
              }
            />
          </SummarySection>
          <TagSection>
            <SubTitle>태그</SubTitle>
            <TagList>
              {insightInput.keywords.map((tag, idx) => (
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
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.3432 7.6752C11.5068 7.83884 11.5068 8.10416 11.3432 8.2678L7.28518 12.3258C7.12154 12.4894 6.85623 12.4894 6.69258 12.3258C6.52894 12.1622 6.52894 11.8968 6.69258 11.7332L10.7506 7.6752C10.9142 7.51156 11.1795 7.51156 11.3432 7.6752Z"
                      fill="white"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.3434 12.3256C11.1797 12.4892 10.9144 12.4892 10.7508 12.3256L6.69276 8.2676C6.52912 8.10396 6.52912 7.83865 6.69276 7.67501C6.8564 7.51137 7.12172 7.51137 7.28536 7.67501L11.3434 11.733C11.507 11.8966 11.507 12.162 11.3434 12.3256Z"
                      fill="white"
                    />
                  </svg>
                </TagWrapper>
              ))}
              {insightInput.keywords.length < 3 && (
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
              {insightInput.folder.name}
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
                {insightInput.isRemind === true && remindTerm}
                <ToggleSlider
                  isSelected={insightInput.isRemind}
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
            />
          )}
          {isModal === 'folder' && (
            <SelectFolderModal
              onClose={() => setIsModal('')}
              insightInput={insightInput}
              onSelect={setInsightInput}
            />
          )}
        </PageContainer>
      </Wrapper>
    </>
  );
};

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
  overflow-y: scroll;
`;

const Input = styled.input`
  width: 353px;
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

const PageIntro = styled.div`
  width: 351px;
  padding-right: 40px;
  text-align: left;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 25px;
  word-break: keep-all;
`;

const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 17px;
  position: relative;
  width: 364px;
  height: 220px;
  border-radius: 13px;
  .image-wrapper {
    position: relative;
  }
`;

const ChangeImgBtn = styled.div`
  position: absolute;
  top: 11px;
  right: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 100%;
  background: #2b2b2b;
  cursor: pointer;
`;

const FileInput = styled.input`
  display: none;
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
  width: 353px;
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
  width: 353px;
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
  width: 121px;
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
