import Header from '@/components/common/Header';
import NavigationLayout from '@/components/common/NavigationLayout';
import SummaryInsightCard from '@/components/common/SummaryInsightCard';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';

interface Props {}

const Saved: NextPage<Props> = ({}) => {
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
    <>
      <NavigationLayout>
        <Wrapper>
          <Header title="저장 완료" />
          <CardSection>
            <SummaryInsightCard
              favicon="/svg/insight-favicon.svg"
              insightData={cardData}
            />
          </CardSection>
          <div className="blue">확인하러 가기</div>
          <HrLine />
          <Title>관련 인사이트 둘러보기</Title>
          <SummaryInsightCard
            favicon="/svg/insight-favicon.svg"
            insightData={{
              insightId: 2,
              insightMainImage: '/image/디자인3.jpg',
              insightTitle: '디자인시스템에 모션 가이드 추가하는 방법',
              insightSummary:
                '오이오랩은 최고 품질의 유기농 냉간 압착 오일과 혁신적인 방법을 사용하여 얻은 식물 추출물로 구성된 천연 성분을 기반으로 스킨케어 제품을 만듭니다.',
              insightTagList: ['브랜딩', '패키지'],
              todayRead: false,
            }}
          />
          <SummaryInsightCard
            favicon="/svg/insight-favicon.svg"
            insightData={{
              insightId: 2,
              insightMainImage: '/image/디자인3.jpg',
              insightTitle: 'UX/UI 디자인에 미드저니 58,000% 활용하기',
              insightSummary:
                '미드저니는 UX/UI디자인, 그래픽 디자인 등 다양한 분야에서 활용될 수 있습니다. 미드저니를 활용해 UX/UI 디자인을 수행하는 경우, 시나리오와 퍼소나를 아주 높은 퀄리티로 시각화 할 수 있습니다.',
              insightTagList: ['AI', '미드 저니'],
              todayRead: true,
            }}
          />
        </Wrapper>
      </NavigationLayout>
    </>
  );
};

export default Saved;

const Wrapper = styled.div`
  .blue {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--Primary-500, #3184ff);
    margin-bottom: 28px;
    text-align: center;
    /* Body-18-B */
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%; /* 25.2px */
  }
`;

const Title = styled.div`
  width: 100%;
  margin-left: 20px;
  margin-top: 20px;
  color: var(--Neutral-500, #1f1f1f);
  /* Body-18-B */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 25.2px */
`;
const CardSection = styled.div``;

const HrLine = styled.hr`
  width: 100%;
  height: 7px;
  border: 0;
  background-color: #f1f3f7;
`;
