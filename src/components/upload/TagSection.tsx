import AutosizeInput from 'react-input-autosize';
import { useState } from 'react';
import styled from 'styled-components';
import { InsightPostRequest } from '@/types/insight';
import DeleteTagIcon from '@svg/upload/DeleteTagIcon';
import AddTagIcon from '@svg/upload/AddTagIcon';

interface Props {
  insightInput: InsightPostRequest;
  setInsightInput: (value: InsightPostRequest) => void;
}

const TagSection = (props: Props) => {
  const { insightInput, setInsightInput } = props;
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const handleDeleteTag = (idx: number) => {
    if (insightInput.insightTagList.length === 1) {
      alert('인사이트 저장에는 최소 태그 1개 이상이 필요해요!');
      return;
    }
    const newKeywords = insightInput.insightTagList.filter(
      (tag) => insightInput.insightTagList.indexOf(tag) !== idx,
    );
    setInsightInput({ ...insightInput, insightTagList: newKeywords });
  };

  const checkEnter = (key: string) => {
    if (key === 'Enter') {
      const newKeywords = [...insightInput.insightTagList, tagInput];
      setInsightInput({ ...insightInput, insightTagList: newKeywords });
      setTagInput('');
      setIsAddingTag(false);
    }
  };

  const handleBlur = () => {
    setIsAddingTag(false);
    setTagInput('');
  };

  return (
    <ImageSection>
      <div>태그</div>
      <TagCounter>{insightInput.insightTagList.length}/3</TagCounter>
      <TagList>
        {insightInput.insightTagList.map((tag, idx) => (
          <TagWrapper key={idx}>
            <span>{tag}</span>
            <DeleteTagIcon idx={idx} handleDeleteTag={handleDeleteTag} />
          </TagWrapper>
        ))}
        {insightInput.insightTagList.length < 3 && (
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
              <AddTagIcon setIsAddingTag={setIsAddingTag} />
            )}
          </TagWrapper>
        )}
      </TagList>
    </ImageSection>
  );
};

export default TagSection;

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
