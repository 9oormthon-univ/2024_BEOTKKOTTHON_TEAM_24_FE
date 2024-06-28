import { NextPage } from 'next';
import styled from 'styled-components';
import Header from '@/components/common/Header';
import Carousel from '@/components/landing/Carousel';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useGetInsight } from '@/hooks/api/useInsight';
import InputWithTitle from '@/components/common/InputWithTitle';
import Answer from '@/components/insight/Answer';

const InsightDetail: NextPage = () => {
  const router = useRouter();
  const { insightId } = router.query;
  const { data, isSuccess } = useGetInsight(Number(insightId));

  return (
    <Wrapper>
      <Header rightText="편집" />
      <div className="thumbnail">
        {isSuccess && (
          <Image
            fill
            objectFit="cover"
            style={{
              borderRadius: '12px',
            }}
            src={data.insightMainImage}
            alt="thumbnail"
          />
        )}
      </div>
      <PageContainer>
        <Title>{data?.insightTitle}</Title>
        <Summary>{data?.insightSummary}</Summary>
        <Tag>
          {data?.insightTagList.map((value, idx) => (
            <div key={idx} className="tag">
              {value}
            </div>
          ))}
        </Tag>
        <InputWithTitle
          top={10}
          bottom={18}
          linkIcon
          value={data?.insightUrl}
          onClick={() => data?.insightUrl && router.push(data.insightUrl)}
        />
        {isSuccess && data.insightImageList.length > 0 && (
          <CarouselWrapper>
            <Carousel
              Slides={data?.insightImageList.map((img, idx) => (
                <div key={idx} className="imgList">
                  <Image
                    fill
                    objectFit="cover"
                    style={{
                      borderRadius: '12px',
                    }}
                    src={img}
                    alt="thumbnail"
                  />
                </div>
              ))}
              indicatorMargin={16}
            />
          </CarouselWrapper>
        )}
        {data?.insightSource && (
          <InputWithTitle
            top={10}
            bottom={24}
            title="출처"
            value={data.insightSource}
          />
        )}
        {data?.reminderQuestionList &&
          data?.reminderQuestionList.length > 0 && (
            <>
              <HrLine />
              <SubTitle>리마인드 {data?.reminderQuestionList.length}</SubTitle>
              {data.reminderQuestionList.map((answer) => {
                return (
                  answer.reminderAnswer &&
                  answer.answeredAt && (
                    <Answer
                      reminderQuestion={answer.reminderQuestion}
                      reminderAnswer={answer.reminderAnswer}
                      answeredAt={answer.answeredAt}
                    />
                  )
                );
              })}
            </>
          )}
      </PageContainer>
    </Wrapper>
  );
};
export default InsightDetail;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;

  .thumbnail {
    height: 162px;
    width: calc(100% - 40px);
    position: relative;
    margin: 14px 0 20px;
  }

  .imgList {
    height: 458px;
    width: calc(100vw - 40px);
    position: relative;
  }
`;

const Title = styled.h1`
  display: inline-block;
  width: 100%;
  margin: 6px 0 10px;
  align-content: left;
  word-break: keep-all;
  color: ${({ theme }) => theme.palette.neutral[500]};
  ${({ theme }) => theme.typo.Head_20_B};
`;

const Summary = styled.p`
  color: #353535;
  margin: 14px 0 8px;
  ${({ theme }) => theme.typo.Body_14_M};
`;

const Tag = styled.div`
  width: 100%;
  margin: 6px 0 14px;
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  ${({ theme }) => theme.typo.Body_14_M};

  .tag {
    border-radius: 8px;
    margin-right: 8px;
    padding: 6px 14px;
    display: inline-block;
    height: 32px;
    white-space: nowrap;
    background-color: ${({ theme }) => theme.palette.neutral[100]};
  }
`;

const SubTitle = styled.div`
  color: ${({ theme }) => theme.palette.neutral[500]};
  ${({ theme }) => theme.typo.Body_14_B};
  width: 100%;
  text-align: left;
  display: flex;
  flex-direction: row;
  margin: 24px 0 8px;
`;

const CarouselWrapper = styled.div`
  display: inline-block;
  margin-bottom: 20px;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 20px 20px;
`;

const HrLine = styled.hr`
  width: calc(100% + 40px);
  min-height: 14px;
  border: 0;
  background-color: ${({ theme }) => theme.palette.neutral[100]};
`;
