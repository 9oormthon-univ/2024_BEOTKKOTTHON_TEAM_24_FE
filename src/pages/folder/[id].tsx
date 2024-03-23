import Header from '@/components/common/Header';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import SearchIcon from '@svg/search-icon.svg';
import { useState } from 'react';
import SmallView from '@svg/small-view-icon.svg';
import LargeView from '@svg/large-view-icon.svg';
import { RemindInsight } from '@/types/reminder';
import SummaryInsightCard from '@/components/common/SummaryInsightCard';
import { calenderData } from '@/components/home/body/ReminderCalender';
import InsightCard from '@/components/home/InsightCard';
import ShareIcon from '@svg/share-icon-blue.svg';
import EditModal from '@components/folder/EditModal';

interface Props {}

const FolderDetail: NextPage<Props> = ({}) => {
  const router = useRouter();
  const { folderId } = router.query;
  const devKeywordList = ['전체', 'AI', '컴포넌트', '피그마', '사용성'];
  const [selectedTag, setSelectedTag] = useState('전체');
  const [searchInput, setSearchInput] = useState('');
  const [isSmall, setIsSmall] = useState(false);
  const [insightList, setInsightList] = useState<RemindInsight[]>(
    calenderData.remindInsightList,
  );
  const [isModalOn, setIsModalOn] = useState(false);
  const onClick = () => {
    setIsSmall(!isSmall);
  };
  const handleModalOn = () => {
    setIsModalOn(true);
    setInsightList(insightList); // 추후 삭제
  };
  const handleShare = (type: string) => {
    if (type === 'readonly') return;
    setIsModalOn(false);
    return;
  };
  return (
    <>
      <Wrapper>
        <Header title={String(folderId)} />
        <span className="link edit">편집</span>
        <ShareIcon className="share" onClick={() => handleModalOn()} />
        <SearchSection>
          <SearchIcon />
          <SearchInput
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="인사이트 검색"
          />
        </SearchSection>
        <div className="tag-list">
          {devKeywordList.map((keyword) => (
            <Tag
              key={keyword}
              className={selectedTag === keyword ? 'selected' : ''}
              onClick={() => setSelectedTag(keyword)}
            >
              {keyword}
            </Tag>
          ))}
        </div>
        <InfoSection>
          <div>
            <span className="count-text">전체 </span>
            <span className="count-text insight"> {insightList.length}</span>
          </div>
          <div className="icons-box">
            <LargeViewIcon isSmall={isSmall} onClick={onClick} />
            <SmallViewIcon isSmall={isSmall} onClick={onClick} />
          </div>
        </InfoSection>
        <InsightSection>
          {insightList?.map((insight, idx) =>
            isSmall ? (
              <InsightCard key={idx} insightData={insight} />
            ) : (
              <SummaryInsightCard
                key={idx}
                favicon="/svg/insight-favicon.svg"
                insightData={insight}
              />
            ),
          )}
        </InsightSection>
      </Wrapper>
      {isModalOn && (
        <EditModal
          type="share"
          onClose={() => setIsModalOn(false)}
          onClick1={() => handleShare('readonly')}
          onClick2={() => handleShare('copy')}
        />
      )}
      <FloatButton>URL 복사가 완료되었습니다.</FloatButton>
    </>
  );
};

export default FolderDetail;

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
  justify-content: center;
  .tag-list {
    display: flex;
    flex-direction: row;
    overflow: scroll;
    gap: 8px;
    margin-left: 20px;
  }
  .selected {
    border-radius: 5.268px;
    border: 1px solid var(--Neutral-150, #3184ff);
    background: var(--Primary-500, #3184ff);
    color: #fff;
  }
  .link {
    color: #3184ff;

    text-align: center;
    font-family: Pretendard;
    font-size: 17px;
    font-style: normal;
    font-weight: 500;
    line-height: 20.55px; /* 120.885% */
    letter-spacing: 0.511px;
  }
  .edit {
    position: absolute;
    top: 18px;
    right: 58px;
  }
  .share {
    position: absolute;
    top: 17px;
    right: 21px;
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

const Tag = styled.div`
  display: flex;
  height: 32px;
  padding: 0px 14px;
  justify-content: center;
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

const InfoSection = styled.div`
  width: calc(100% - 40px);
  margin: 18px auto;
  display: flex;
  justify-content: space-between;
  .icons-box {
    width: 48px;
    display: flex;
    justify-content: space-between;
  }
  .count-text {
    color: var(--Neutral-500, #1f1f1f);
    text-align: center;
    /* Body-14-M */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 19.6px */
  }
  .insight {
    font-size: 16px;
    font-weight: 600;
  }
`;

type IconProps = {
  isSmall: boolean;
};

const SmallViewIcon = styled(SmallView)<IconProps>`
  rect {
    fill: ${(props) => (props.isSmall ? '#1F1F1F' : '#E1E1E1')};
  }
`;

const LargeViewIcon = styled(LargeView)<IconProps>`
  rect {
    fill: ${(props) => (props.isSmall ? '#E1E1E1' : '#1F1F1F')};
  }
`;

const InsightSection = styled.div``;

const FloatButton = styled.button`
  position: fixed;
  bottom: 43px;
  display: flex;
  width: 353px;
  height: 56px;
  outline: none;
  border: none;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 8px;
  background: var(--Primary-500, #3184ff);

  color: #fff;
  /* Body-16-SB */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 22.4px */
`;
