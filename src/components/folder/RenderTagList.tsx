import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

interface Props {
  tagList?: string[];
  selectedTag: string;
  setSelectedTag: Dispatch<SetStateAction<string>>;
}

const RenderTagList = (props: Props) => {
  const { tagList, selectedTag, setSelectedTag } = props;
  const uniqueTagList = tagList?.filter(
    (value, index) => tagList?.indexOf(value) === index,
  );
  uniqueTagList?.unshift('전체');

  return (
    <>
      <Wrapper className="tag-list">
        {uniqueTagList?.map((keyword) => (
          <Tag
            key={keyword}
            className={`${selectedTag === keyword && 'selected'}`}
            onClick={() => setSelectedTag(keyword)}
          >
            {keyword}
          </Tag>
        ))}
      </Wrapper>
    </>
  );
};

export default RenderTagList;

const Wrapper = styled.div`
  .selected {
    border-radius: 5.268px;
    border: 1px solid ${({ theme }) => theme.palette.primary[500]};
    background: ${({ theme }) => theme.palette.primary[500]};
    color: #fff;
    ${({ theme }) => theme.typo.Body_14_SB};
  }
`;

const Tag = styled.div`
  display: flex;
  flex-direction: row;
  height: 32px;
  padding: 0px 14px;
  justify-content: center;
  text-align: center;
  align-items: center;
  color: ${({ theme }) => theme.palette.neutral[300]};

  text-align: center;
  ${({ theme }) => theme.typo.Body_14_M};
  border-radius: 5.268px;
  border: 1px solid ${({ theme }) => theme.palette.neutral[150]};
  background: #fff;
`;
