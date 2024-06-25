import styled from 'styled-components';
import Image from 'next/image';
import { Insight } from '@/types/insight';
import { useRouter } from 'next/router';
import { useCalendarPostResponseStore } from '@/store/reminder';
import { CalendarPostResponse } from '@/types/reminder';

interface CardProps {
  favicon: string;
  insightData: Insight;
}

const SummaryInsightCard = ({ favicon, insightData }: CardProps) => {
  const router = useRouter();
  const { recommendPostResponse, setRecommendPostResponse } =
    useCalendarPostResponseStore();
  const handleClick = () => {
    const updatedInsightList = recommendPostResponse.remindInsightList.map(
      (insight: Insight) =>
        insight.insightId === insightData.insightId
          ? {
              ...insight,
              isRead: true,
            }
          : insight,
    );
    const dataWithFlag: CalendarPostResponse = {
      ...recommendPostResponse,
      remindRead: updatedInsightList.filter(
        (insight) => insight.isRead === false,
      ).length,
      remindInsightList: updatedInsightList,
    };
    setRecommendPostResponse(dataWithFlag);
    router.push(`/insight/${insightData.insightId}`);
  };

  return (
    <Wrapper opacity={insightData.todayRead ? 0.6 : 1} onClick={handleClick}>
      {favicon && (
        <Image
          src={favicon}
          width={52}
          height={52}
          alt="Insight Card image"
          className="favicon"
        />
      )}
      <Image
        src={insightData.insightMainImage}
        width={353}
        height={86}
        alt="Insight Card image"
        className="img"
      />
      <Description>
        <div className="card-title">{insightData.insightTitle}</div>
        <div className="card-summary">{insightData.insightSummary}</div>
        <div className="card-tags">
          {insightData.insightTagList.map((v: string, i: number) => (
            <div key={v ? v.toString() : `${v}${i}`} className="card-tag">
              {v}
            </div>
          ))}
        </div>
      </Description>
    </Wrapper>
  );
};

interface CSSProps {
  opacity: number;
}

const Wrapper = styled.div<CSSProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  border-radius: 12px;
  background-color: #ffffff;
  margin: 22px 20px;
  box-shadow: 9px 9px 30px 0px #00000014;
  position: relative;
  opacity: ${(props) => props.opacity};

  .favicon {
    border: 10px solid #f9f9f9;
    border-radius: 100%;
    position: absolute;
    right: 26px;
    top: -26px;
  }

  .img {
    width: 100%;
    height: 86px;
    border-radius: 12px 12px 0 0;
    object-fit: cover;
  }
`;

const Description = styled.div`
  display: flex;
  height: 142px;
  flex-direction: column;
  justify-content: space-between;
  padding: 14px 16px 20px;

  .card-title {
    ${({ theme }) => theme.typo.Body_16_SB};
    word-break: keep-all;
  }

  .card-summary {
    ${({ theme }) => theme.typo.Caption_12_M};
    word-break: keep-all;
    color: ${({ theme }) => theme.palette.neutral[400]};
  }

  .card-tag {
    ${({ theme }) => theme.typo.Caption_12_M};
    display: inline-block;
    padding: 4px 10px;
    margin: 0 6px 0 0;
    border-radius: 6px;
    background-color: ${({ theme }) => theme.palette.folder.blue};
  }
`;

export default SummaryInsightCard;
