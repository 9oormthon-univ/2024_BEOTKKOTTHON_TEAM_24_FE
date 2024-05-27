import { NextPage } from 'next';
import styled from 'styled-components';
import { useRemind } from '@/store/remind';
import Header from '@/components/common/Header';
import SummaryInsightCard from '@/components/common/SummaryInsightCard';
import Carousel from '@/components/landing/Carousel';
import Image from 'next/image';

const InsightDetail: NextPage = () => {
  const { answer } = useRemind();
  return (
    <Wrapper>
      <Header title="인사이트 저장" />
      <SummaryInsightCard
        favicon="/svg/insight-favicon.svg"
        insightData={{
          insightId: 2,
          insightMainImage: '/image/디자인3.jpg',
          insightTitle: '디자인시스템에 모션 가이드 추가하는 방법',
          insightSummary:
            '미드저니는 UX/UI디자인, 그래픽 디자인 등 다양한 분야에서 활용될 수있습니다. 미드저니를 활용해 UX/UI 디자인을 수행하는 경우, 시나리오와 퍼소나를 아주 높은 퀄리티로 시각화 할 수 있습니다.',
          insightTagList: ['UI/UX', '사용자 경험'],
          todayRead: false,
        }}
      />
      <PageContainer className="no-scroll">
        <LinkSection>
          <SubTitle>인사이트 링크</SubTitle>
          <Input
            type="text"
            placeholder="https://www.behance.net/gallery/193.."
          />
          <svg
            className="link-icon"
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Link">
              <path
                id="Vector"
                d="M13.6238 17.3138L9.25881 21.6788C8.73033 22.1888 8.02453 22.4739 7.29006 22.4739C6.55559 22.4739 5.84979 22.1888 5.32131 21.6788C5.06212 21.4206 4.85645 21.1138 4.71612 20.7759C4.57579 20.4381 4.50355 20.0758 4.50355 19.71C4.50355 19.3442 4.57579 18.9819 4.71612 18.6441C4.85645 18.3062 5.06212 17.9994 5.32131 17.7413L9.68631 13.3763C9.89815 13.1644 10.0172 12.8771 10.0172 12.5775C10.0172 12.2779 9.89815 11.9906 9.68631 11.7788C9.47447 11.5669 9.18715 11.4479 8.88756 11.4479C8.58797 11.4479 8.30065 11.5669 8.08881 11.7788L3.72381 16.155C2.84446 17.1122 2.36888 18.372 2.39639 19.6715C2.4239 20.971 2.95238 22.2096 3.87145 23.1286C4.79052 24.0477 6.02912 24.5762 7.32859 24.6037C8.62806 24.6312 9.88792 24.1556 10.8451 23.2763L15.2213 18.9113C15.4332 18.6994 15.5522 18.4121 15.5522 18.1125C15.5522 17.8129 15.4332 17.5256 15.2213 17.3138C15.0095 17.1019 14.7221 16.9829 14.4226 16.9829C14.123 16.9829 13.8357 17.1019 13.6238 17.3138ZM23.2763 3.72376C22.3299 2.78327 21.0499 2.2554 19.7157 2.2554C18.3815 2.2554 17.1014 2.78327 16.1551 3.72376L11.7788 8.08877C11.6739 8.19366 11.5907 8.31818 11.5339 8.45523C11.4772 8.59228 11.448 8.73917 11.448 8.88752C11.448 9.03586 11.4772 9.18275 11.5339 9.3198C11.5907 9.45684 11.6739 9.58137 11.7788 9.68626C11.8837 9.79116 12.0082 9.87436 12.1453 9.93113C12.2823 9.9879 12.4292 10.0171 12.5776 10.0171C12.7259 10.0171 12.8728 9.9879 13.0098 9.93113C13.1469 9.87436 13.2714 9.79116 13.3763 9.68626L17.7413 5.32126C18.2698 4.81122 18.9756 4.52618 19.7101 4.52618C20.4445 4.52618 21.1503 4.81122 21.6788 5.32126C21.938 5.57944 22.1437 5.88625 22.284 6.2241C22.4243 6.56195 22.4966 6.92418 22.4966 7.29002C22.4966 7.65585 22.4243 8.01808 22.284 8.35593C22.1437 8.69378 21.938 9.00059 21.6788 9.25876L17.3138 13.6238C17.2084 13.7283 17.1247 13.8528 17.0676 13.9899C17.0104 14.127 16.981 14.274 16.981 14.4225C16.981 14.571 17.0104 14.7181 17.0676 14.8552C17.1247 14.9923 17.2084 15.1167 17.3138 15.2213C17.4184 15.3267 17.5428 15.4104 17.6799 15.4675C17.817 15.5246 17.964 15.554 18.1126 15.554C18.2611 15.554 18.4081 15.5246 18.5452 15.4675C18.6823 15.4104 18.8067 15.3267 18.9113 15.2213L23.2763 10.845C24.2168 9.89864 24.7447 8.61861 24.7447 7.28439C24.7447 5.95017 24.2168 4.67014 23.2763 3.72376ZM9.93381 17.0663C10.0389 17.1705 10.1636 17.253 10.3007 17.309C10.4377 17.365 10.5845 17.3934 10.7326 17.3925C10.8806 17.3934 11.0274 17.365 11.1645 17.309C11.3015 17.253 11.4262 17.1705 11.5313 17.0663L17.0663 11.5313C17.2782 11.3194 17.3972 11.0321 17.3972 10.7325C17.3972 10.4329 17.2782 10.1456 17.0663 9.93376C16.8545 9.72192 16.5672 9.60291 16.2676 9.60291C15.968 9.60291 15.6807 9.72192 15.4688 9.93376L9.93381 15.4688C9.82837 15.5733 9.74467 15.6978 9.68756 15.8349C9.63044 15.972 9.60104 16.119 9.60104 16.2675C9.60104 16.416 9.63044 16.5631 9.68756 16.7002C9.74467 16.8373 9.82837 16.9617 9.93381 17.0663Z"
                fill="#565656"
              />
            </g>
          </svg>
        </LinkSection>
        <div>
          <Carousel
            Slides={[
              <Image
                width={350}
                height={350}
                src={'/image/image.png'}
                key={0}
                alt=""
              />,
              <Image
                width={350}
                height={350}
                src={'/image/image2.png'}
                key={1}
                alt=""
              />,
              <Image
                width={350}
                height={350}
                src={'/image/image3.png'}
                key={2}
                alt=""
              />,
            ]}
            indicatorMargin={16}
          />
        </div>
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
  margin: 20px;
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
