import { NextPage } from 'next';
import styled from 'styled-components';
import NavigationLayout from '@/components/common/NavigationLayout';
import Header from '@/components/common/Header';
import LargeView from '@svg/large-view-icon.svg';
import SmallView from '@svg/small-view-icon.svg';
import { useEffect, useMemo, useState } from 'react';
import { useSearchFolder } from '@/hooks/api/useFolder';
import SummaryInsightCard from '@/components/folder/SummaryInsightCard';
import InsightCard from '@/components/common/InsightCard';
import { useTransition } from 'react';
import { FolderSearchPostResponse } from '@/types/folder';
import SearchSection from '@/components/common/SearchSection';

let count = 0;
let memoCount = 0;

const FolderSearch: NextPage = ({}) => {
  count++;
  console.log('rerender: ', count);
  const [$isSmall, set$isSmall] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');
  const { data, mutate, isSuccess } = useSearchFolder();
  const [result, setResult] = useState<FolderSearchPostResponse>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition();
  const onClickView = () => {
    set$isSmall(!$isSmall);
  };

  useEffect(() => {
    mutate(keyword);
  }, [keyword]);

  useEffect(() => {
    isSuccess && setResult(data);
  }, [data, isSuccess]);

  const typingKeyword = (inputValue: string) => {
    startTransition(() => {
      setKeyword(inputValue);
    });
  };

  const resultSection = useMemo(() => {
    memoCount++;
    console.log('memo rerendered: ', memoCount);
    return (
      <ResultSection>
        {result?.map((value, i) =>
          $isSmall ? (
            <InsightCard key={i} insightData={value} />
          ) : (
            <SummaryInsightCard
              key={i}
              favicon="/svg/insight-favicon.svg"
              insightData={value}
            />
          ),
        )}
      </ResultSection>
    );
  }, [result]);

  return (
    <>
      <NavigationLayout>
        <Header title="검색" />
        <Wrapper>
          <SearchSection
            autoFocus={true}
            placeholder="인사이트 검색"
            onChange={(e) => typingKeyword(e.target.value)}
            top={20}
            bottom={20}
          />
          <ViewSetting>
            <div>
              <span>전체 </span>
              <span className="title-m">{result?.length}</span>
            </div>
            <div className="icons-box">
              <LargeViewIcon $isSmall={$isSmall} onClick={onClickView} />
              <SmallViewIcon $isSmall={$isSmall} onClick={onClickView} />
            </div>
          </ViewSetting>
          {resultSection}
        </Wrapper>
      </NavigationLayout>
    </>
  );
};

export default FolderSearch;

const Wrapper = styled.div`
  height: 100vh;
  position: relative;
  justify-content: center;
  .title {
    color: #1f1f1f;
    text-align: center;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 27.146px; /* 135.732% */
    height: 28px;
    padding: 18px 20px 16px;
    height: 52px;
  }
  .link {
    color: var(--Primary-500, #3184ff);
    text-align: right;
    /* Body-16-SB */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 22.4px */
  }
  .edit {
    position: absolute;
    top: 20px;
    right: 20px;
  }
`;

const ResultSection = styled.div`
  padding-top: 3px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title-m {
    color: #1f1f1f;
    text-align: center;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 27.146px; /* 135.732% */
    height: 28px;
    padding-right: 6px;
  }
  .list-container {
    display: flex;
    justify-content: space-between;
    margin-top: 36px;
    gap: 52px 23px;
    flex-flow: wrap;
  }
`;

const ViewSetting = styled.div`
  margin: 20px 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .instruction {
    display: inline-block;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 500;
    color: #3184ff;
    padding: 6px 10px;
    background-color: #e9efff;
  }

  .icons-box {
    width: 48px;
    display: flex;
    justify-content: space-between;
  }
`;

type IconProps = {
  $isSmall: boolean;
};

const SmallViewIcon = styled(SmallView)<IconProps>`
  rect {
    fill: ${(props) => (props.$isSmall ? '#1F1F1F' : '#E1E1E1')};
  }
`;

const LargeViewIcon = styled(LargeView)<IconProps>`
  rect {
    fill: ${(props) => (props.$isSmall ? '#E1E1E1' : '#1F1F1F')};
  }
`;
