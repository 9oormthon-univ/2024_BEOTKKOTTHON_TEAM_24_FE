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
    <Wrapper>
      <TitleBox>
        <p className="title">태그</p>
        <p className="counter">{insightInput.insightTagList.length}/3</p>
      </TitleBox>
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
    </Wrapper>
  );
};

export default TagSection;

const Wrapper = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const TitleBox = styled.div`
  width: 100%;
  ${({ theme }) => theme.typo.Body_14_M};
  margin-bottom: 8px;
  display: flex;
  flex-direction: row;

  .title {
    margin-right: 9px;
  }

  .counter {
    color: ${({ theme }) => theme.palette.primary[500]};
  }
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
  background: ${({ theme }) => theme.palette.neutral[100]};
  color: ${({ theme }) => theme.palette.neutral[500]};
  text-align: center;
  ${({ theme }) => theme.typo.Body_14_M};
`;
