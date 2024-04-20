import Header from '@/components/common/Header';
import NavigationLayout from '@/components/common/NavigationLayout';
import InsightCard from '@/components/common/InsightCard';
import SummaryInsightCard from '@/components/common/SummaryInsightCard';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { insightData1, insightData2 } from '@/constants/data';

const Saved: NextPage = ({}) => {
  const router = useRouter();
  const { id, title, summary, image, tagList } = router.query;
  const cardData = {
    insightId: Number(id),
    insightTitle: String(title),
    insightSummary: String(summary),
    insightMainImage: image ? String(image) : '/image/defaultImage.jpeg',
    insightTagList: tagList
      ? Array.isArray(tagList)
        ? tagList
        : [tagList]
      : [],
    todayRead: false,
  };

  return (
    <NavigationLayout>
      <Wrapper>
        <Header title="저장 완료" />
        <SummaryInsightCard
          favicon="/svg/insight-favicon.svg"
          insightData={cardData}
        />
        <div className="blue-text">확인하러 가기</div>
        <HrLine />
        <Title>관련 인사이트 둘러보기</Title>
        <InsightCard insightData={insightData1} />
        <InsightCard insightData={insightData2} />
      </Wrapper>
    </NavigationLayout>
  );
};

export default Saved;

const Wrapper = styled.div`
  .blue-text {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #3184ff;
    margin-bottom: 28px;
    text-align: center;
    font-size: 18px;
    font-weight: 700;
    line-height: 140%;
  }
`;

const Title = styled.div`
  width: 100%;
  margin-left: 20px;
  margin-top: 20px;
  color: #1f1f1f;
  font-size: 18px;
  font-weight: 700;
  line-height: 140%;
`;

const HrLine = styled.hr`
  width: 100%;
  height: 7px;
  border: 0;
  background-color: #f1f3f7;
`;
