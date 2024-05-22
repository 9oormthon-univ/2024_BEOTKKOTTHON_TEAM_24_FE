import Header from '@/components/common/Header';
import { NextPage } from 'next';
import styled from 'styled-components';
import { useState } from 'react';
import SmallView from '@svg/small-view-icon.svg';
import LargeView from '@svg/large-view-icon.svg';
import { Insight } from '@/types/insight';
import SummaryInsightCard from '@/components/common/SummaryInsightCard';
import { calendarData } from '@/constants/data';
import ShareIcon from '@svg/share-icon-blue.svg';
import EditModal from '@components/folder/EditModal';
import SearchSection from '@/components/common/SearchSection';
import { useGetFolderInsight } from '@/hooks/api/useInsight';
import { useRouter } from 'next/router';
import RenderTagList from '@/components/folder/RenderTagList';
import InsightCard from '@/components/common/InsightCard';
import useCopyClipboard from '@/hooks/custom/useCopyClipboard';
import BottomBtn from '@/components/common/BottomBtn';

interface Props {}

const FolderDetail: NextPage<Props> = ({}) => {
  const [selectedTag, setSelectedTag] = useState('전체');
  const [searchInput, setSearchInput] = useState('');
  const [isSmall, setIsSmall] = useState(false);
  const [insightList, setInsightList] = useState<Insight[]>(
    calendarData.remindInsightList,
  );
  const [isModalOn, setIsModalOn] = useState(false);
  const [isCopy, onCopy] = useCopyClipboard();

  const router = useRouter();
  const { data } = useGetFolderInsight(Number(router.query.id));
  const tagList = data?.map((insight) => insight.insightTagList).flat();
  const insightListFilteredByTag =
    selectedTag == '전체'
      ? data
      : data?.filter((insight) => insight.insightTagList.includes(selectedTag));
  const searchedInsightList =
    searchInput === ''
      ? insightListFilteredByTag
      : insightListFilteredByTag?.filter((insight) =>
          insight.insightTitle.toLowerCase().includes(searchInput),
        );

  const handleModalOn = () => {
    setIsModalOn(true);
    setInsightList(insightList); // 추후 삭제
  };

  return (
    <>
      <Wrapper>
        <Header title={String(router.query.name)} />
        <span className="link edit">편집</span>
        <ShareIcon className="share" onClick={() => handleModalOn()} />
        <SearchSection
          value={searchInput}
          placeholder="인사이트 검색"
          autoFocus={true}
          top={20}
          bottom={20}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <RenderTagList
          tagList={tagList}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
        />
        <InfoSection>
          <div className="count-box">
            <span className="count-text">전체&nbsp;</span>
            <span className="count-text insight">
              {searchedInsightList?.length}
            </span>
          </div>
          <div className="icons-box">
            <LargeViewIcon
              isSmall={isSmall}
              onClick={() => setIsSmall(false)}
            />
            <SmallViewIcon isSmall={isSmall} onClick={() => setIsSmall(true)} />
          </div>
        </InfoSection>
        <InsightSection>
          {searchedInsightList?.map((insight) =>
            isSmall ? (
              <InsightCard
                key={insight.insightId}
                favicon="/svg/insight-favicon.svg"
                insightData={{
                  insightId: insight.insightId,
                  insightMainImage: '/image/reinput.jpeg',
                  insightTitle: insight.insightTitle,
                  insightSummary: insight.insightSummary,
                  insightTagList: insight.insightTagList,
                  todayRead: false,
                }}
              />
            ) : (
              <SummaryInsightCard
                key={insight.insightId}
                favicon="/svg/insight-favicon.svg"
                insightData={{
                  insightId: insight.insightId,
                  insightMainImage: '/image/reinput.jpeg',
                  insightTitle: insight.insightTitle,
                  insightSummary: insight.insightSummary,
                  insightTagList: insight.insightTagList,
                  todayRead: false,
                }}
              />
            ),
          )}
        </InsightSection>
        <div className="notification">
          {isCopy && (
            <BottomBtn text="URL 복사가 완료되었습니다." state="activated" />
          )}
        </div>
      </Wrapper>
      {isModalOn && (
        <EditModal
          type="share"
          shareTargetId={Number(router.query.id)}
          onClose={() => setIsModalOn(false)}
          onCopy={onCopy}
        />
      )}
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
    overflow-x: scroll;
    gap: 8px;
    margin-left: 20px;
    -ms-overflow-style: none;
    scrollbar-width: none;
    white-space: nowrap;
  }
  .tag-list::-webkit-scrollbar {
    display: none;
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
  .notification {
    display: inline-block;
    width: 100%;
    max-width: 480px;
    position: fixed;
    bottom: 20px;
  }
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
  .count-box {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .count-text {
    color: var(--Neutral-500, #1f1f1f);
    text-align: center;

    /* Body-14-M */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
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
