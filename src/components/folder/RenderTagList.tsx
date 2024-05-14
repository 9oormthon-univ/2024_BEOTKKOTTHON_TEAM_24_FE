import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

interface Props {
  tagList?: string[],
  selectedTag: string,
  setSelectedTag: Dispatch<SetStateAction<string>>,
}

const RenderTagList = (props: Props) => {
  const { tagList, selectedTag, setSelectedTag} = props;
  const uniqueTagList = tagList?.filter((value, index) => tagList?.indexOf(value) === index)
  uniqueTagList?.unshift('전체')

  return (
    <>
      <div className="tag-list">
        {uniqueTagList?.map((keyword) => (
          <Tag
            key={keyword}
            className={selectedTag === keyword ? 'selected' : ''}
            onClick={() => setSelectedTag(keyword)}
          >
            {keyword}
          </Tag>
        ))}
      </div>
    </>
  );
};

export default RenderTagList;

const Tag = styled.div`
  display: flex;
  flex-direction: row;
  height: 32px;
  padding: 0px 14px;
  justify-content: center;
  text-align: center;
  align-items: center;
  color: var(--Neutral-300, #848484);

  text-align: center;
  /* Body-14-B */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 22.4px */
  border-radius: 5.268px;
  border: 1px solid var(--Neutral-150, #e1e1e1);
  background: #fff;
`;
