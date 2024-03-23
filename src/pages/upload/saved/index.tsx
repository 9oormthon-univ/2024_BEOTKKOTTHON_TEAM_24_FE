import Header from '@/components/common/Header';
import NavigationLayout from '@/components/common/NavigationLayout';
import InsightCard from '@/components/home/InsightCard';
import { RemindInsight } from '@/types/reminder';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface Props {}

const Saved: NextPage<Props> = ({}) => {
  const router = useRouter();
  const { id, title, summary, image, tagList } = router.query;
  const [cardData, setCardData] = useState<RemindInsight>({
    insightId: 0,
    insightTitle: '',
    insightSummary: '',
    insightMainImage: '',
    insightTagList: [],
    todayRead: false,
  });
  useEffect(() => {
    setCardData({
      insightId: Number(id),
      insightTitle: String(title),
      insightSummary: String(summary),
      insightMainImage: String(image),
      insightTagList: tagList
        ? Array.isArray(tagList)
          ? tagList
          : [tagList]
        : [],
      todayRead: false,
    });
  }, []);
  return (
    <>
      <NavigationLayout>
        <Wrapper>
          <Header title="저장 완료" />
          <CardSection>
            <InsightCard insightData={cardData} />
          </CardSection>
        </Wrapper>
      </NavigationLayout>
    </>
  );
};

export default Saved;

const Wrapper = styled.div``;

const CardSection = styled.div``;
