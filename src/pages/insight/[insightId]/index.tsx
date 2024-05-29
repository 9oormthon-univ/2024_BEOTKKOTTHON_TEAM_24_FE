import { NextPage } from 'next';
import styled from 'styled-components';
import { useRemind } from '@/store/remind';
import Header from '@/components/common/Header';
import SummaryInsightCard from '@/components/common/SummaryInsightCard';
import Carousel from '@/components/landing/Carousel';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useGetInsight } from '@/hooks/api/useInsight';
import LinkIcon from '@svg/link-icon.svg';

const InsightDetail: NextPage = () => {
  const { answer } = useRemind();
  const router = useRouter();
  const { insightId } = router.query;
  const { data, isSuccess } = useGetInsight(Number(insightId));

  return (
    <Wrapper>
      <Header rightText="편집" />
      {isSuccess && (
        <SummaryInsightCard
          favicon="/svg/insight-favicon.svg"
          insightData={{
            insightId: data.insightId,
            insightMainImage: data.insightMainImage,
            insightTitle: data.insightTitle,
            insightSummary: data.insightTitle,
            insightTagList: data.insightTagList,
            todayRead: false,
          }}
        />
      )}
      <PageContainer className="no-scroll">
        <LinkSection>
          <SubTitle>인사이트 링크</SubTitle>
          <Input type="text" placeholder={data?.insightUrl} disabled />
          <LinkIcon className="link-icon" />
        </LinkSection>
        {isSuccess && data.insightImageList.length > 0 && (
          <CarouselWrapper>
            <Carousel
              Slides={data?.insightImageList.map((img, idx) => (
                <Image
                  key={idx}
                  src={img}
                  height={440}
                  width={353}
                  alt="img"
                  objectFit="cover"
                />
              ))}
              indicatorMargin={16}
            />
          </CarouselWrapper>
        )}
        <MemoWrapper>
          <MemoInput placeholder="미드저니는 UX/UI디자인, 그래픽 디자인 등 다양한 분야에서 활용될 수 있습니다. 미드저니를 활용해 UX/UI 디자인을 수행하는 경우, 시나리오와 퍼소나를 아주 높은 퀄리티로 시각화 할 수 있습니다. " />
        </MemoWrapper>
        <SourceSection>
          <SubTitle>출처</SubTitle>
          <SourceInput placeholder="비핸스 김구름" />
        </SourceSection>
        <HrLine />
        <RemindSection>
          <SubTitle>리마인드 1</SubTitle>
          <div className="remind">
            <p>24/04/13</p>
            <p>Q. 해당 인사이트를 어떻게 활용할 수 있을까요?</p>
            <p>{answer}</p>
          </div>
        </RemindSection>
      </PageContainer>
    </Wrapper>
  );
};
export default InsightDetail;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  height: 100vh;
  .no-scroll::-webkit-scrollbar {
    display: none;
  }
  .remind {
    width: 100%;
    height: 210px;
    border-radius: 8px;
    background-color: #ffe4e9;
    margin-bottom: 36px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    :nth-child(1) {
      font-size: 12px;
      font-weight: 500;
      color: #848484;
    }
    :nth-child(2) {
      font-size: 16px;
      font-weight: 600;
      color: #1f1f1f;
    }
    :nth-child(3) {
      font-size: 14px;
      font-weight: 500;
      color: #1f1f1f;
      line-height: 20px;
    }
  }
`;

const SubTitle = styled.div`
  color: #000;
  text-align: left;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px; /* 131.25% */
  letter-spacing: -0.32px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const LinkSection = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  margin: 10px 0 20px;
  width: 100%;

  .link-icon {
    position: absolute;
    top: 41px;
    left: 12px;
  }
`;

const SourceSection = styled(LinkSection)`
  margin: 24px 0 38px;
`;

const CarouselWrapper = styled.div`
  display: inline-block;
  margin-bottom: 20px;
`;

const PageContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 0 20px;
`;

const Input = styled.input`
  width: 100%;
  height: 51px;
  font-size: 15px;
  border: none;
  outline: none;
  padding: 10px;
  border-radius: 8.235px;
  background: #f4f5f7;
  color: black;
  padding-left: 54px;
`;

const SourceInput = styled(Input)`
  height: 48px;
  padding: 14px 16px;
`;

const MemoWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  textarea::-webkit-scrollbar {
    display: none;
  }
  min-height: 130px;
`;

const MemoInput = styled.textarea`
  width: 100%;
  min-height: 51px;
  border: none;
  outline: none;
  margin-bottom: 0;
  padding: 12px 16px 30px 12px;
  background: #f4f5f7;
  color: #1f1f1f;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 19px;
  border-radius: 8px;
  resize: none;
  flex: 1;
  line-height: 20px;
`;

const HrLine = styled.hr`
  width: calc(100% + 40px);
  min-height: 14px;
  border: 0;
  background-color: #f1f3f7;
`;

const RemindSection = styled.div`
  width: 100%;
  margin-top: 20px;
`;
