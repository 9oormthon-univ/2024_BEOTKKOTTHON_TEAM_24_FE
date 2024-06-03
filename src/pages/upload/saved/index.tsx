import Header from '@/components/common/Header';
import NavigationLayout from '@/components/common/NavigationLayout';
import InsightCard from '@/components/common/InsightCard';
import SummaryInsightCard from '@/components/common/SummaryInsightCard';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { insightData1, insightData2 } from '@/constants/data';
import { useGetInsight } from '@/hooks/api/useInsight';
import { Insight } from '@/types/insight';
import { useEffect, useState } from 'react';

const Saved: NextPage = ({}) => {
  const router = useRouter();
  const { insightId } = router.query;
  const { data, isSuccess } = useGetInsight(Number(insightId));
  const [insight, setInsight] = useState<Insight>();

  useEffect(() => {
    if (!isSuccess || !data) return;
    const { insightTitle, insightMainImage, insightSummary, insightTagList } =
      data;
    setInsight({
      insightId: Number(insightId),
      insightTitle,
      insightMainImage,
      insightSummary,
      insightTagList,
    });
  }, [isSuccess, data, insightId]);

  return (
    <NavigationLayout>
      <Wrapper>
        <Header title="저장 완료" />
        {insight && (
          <SummaryInsightCard
            favicon="/svg/insight-favicon.svg"
            insightData={insight}
          />
        )}
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
    color: ${(props) => props.theme.palette.primary[500]};
    margin-bottom: 28px;
    text-align: center;
    ${({ theme }) => theme.typo.Body_18_B};
  }
`;

const Title = styled.div`
  width: 100%;
  margin-left: 20px;
  margin-top: 20px;
  color: ${(props) => props.theme.palette.neutral[500]};
  ${({ theme }) => theme.typo.Body_18_B};
`;

const HrLine = styled.hr`
  width: 100%;
  height: 7px;
  border: 0;
  background-color: ${(props) => props.theme.palette.neutral[100]};
`;
