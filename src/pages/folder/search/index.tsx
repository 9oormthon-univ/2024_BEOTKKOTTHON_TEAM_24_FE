import { NextPage } from 'next';
import styled from 'styled-components';
import SearchIcon from '@svg/search-icon.svg';
import NavigationLayout from '@/components/common/NavigationLayout';
import Header from '@/components/common/Header';
import LargeView from '@svg/large-view-icon.svg';
import SmallView from '@svg/small-view-icon.svg';
import { useLayoutEffect, useEffect, useState } from 'react';
import { useSearchFolder } from '@/hooks/api/useFolder';
import { FolderSearchGetResponse } from '@/types/insight';
import SummaryInsightCard from '@/components/folder/SummaryInsightCard';
import InsightCard from '@/components/folder/InsightCard';

const FolderSearch: NextPage = ({}) => {
  const [$isSmall, set$isSmall] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<FolderSearchGetResponse>([]);
  const [result, setResult] = useState<FolderSearchGetResponse>([]);
  const [keyword, setKeyword] = useState<string>('');
  const { data, isSuccess, mutate } = useSearchFolder();
  const onClickView = () => {
    set$isSmall(!$isSmall);
  };

  useLayoutEffect(() => {
    mutate(' ');
  }, []);

  useEffect(() => {
    isSuccess &&
      setSearchData(
        Array.from(
          { length: 500 },
          (_, index) => index,
        ).reduce<FolderSearchGetResponse>((acc) => {
          acc.push(...data);
          return acc;
        }, []),
      );
    isSuccess &&
      setResult(
        Array.from(
          { length: 500 },
          (_, index) => index,
        ).reduce<FolderSearchGetResponse>((acc) => {
          acc.push(...data);
          return acc;
        }, []),
      );
  }, [isSuccess, data]);

  useEffect(() => {
    setResult(
      searchData.filter(
        (value) =>
          value.insightTitle.toLowerCase().includes(keyword) ||
          value.insightSummary.toLowerCase().includes(keyword) ||
          value.hashTagList.some((v) => v.toLowerCase().includes(keyword)),
      ),
    );
  }, [keyword]);

  return (
    <>
      <NavigationLayout>
        <Header title="검색" />
        <Wrapper>
          <SearchSection>
            <SearchIcon />
            <SearchInput
              placeholder="인사이트 검색"
              autoFocus
              onChange={(e) => setKeyword(e.target.value)}
            />
          </SearchSection>
          <ViewSetting>
            <div>
              <span>전체 </span>
              <span className="title-m">{result.length}</span>
            </div>
            <div className="icons-box">
              <LargeViewIcon $isSmall={$isSmall} onClick={onClickView} />
              <SmallViewIcon $isSmall={$isSmall} onClick={onClickView} />
            </div>
          </ViewSetting>
          <ResultSection>
            {result.map((value, i) =>
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

const SearchSection = styled.div`
  display: flex;
  width: calc(100% - 40px);
  margin: 20px auto;
  padding: 10px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  background: #f4f5f7;
`;

const SearchInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px; /* 131.25% */
  letter-spacing: -0.32px;
  background: #f4f5f7;
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
