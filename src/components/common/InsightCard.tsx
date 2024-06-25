import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Insight } from '@/types/insight';
import { CalendarPostResponse } from '@/types/reminder';
import { useCalendarPostResponseStore } from '@/store/reminder';

interface Props {
  favicon?: string;
  insightData: Insight;
}

const InsightCard = ({ favicon, insightData }: Props) => {
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
    <Wrapper
      opacity={insightData.isRead === true ? 0.6 : 1}
      onClick={handleClick}
    >
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
        width={109}
        height={78}
        alt="Insight Card image"
        className="img"
      />
      <div className="card-title-tag">
        <div className="card-title">{insightData.insightTitle}</div>
        <div className="card-tags">
          {insightData.insightTagList.map((v: string, i: number) => (
            <div key={v ? v.toString() : `${v}${i}`} className="card-tag">
              {v}
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

interface CSSProps {
  opacity: number;
}

const Wrapper = styled.div<CSSProps>`
  height: 102px;
  display: flex;
  flex-direction: row;
  align-items: center;
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
    border-radius: 12px;
    margin: 8px 20px 8px 12px;
  }

  .card-title-tag {
    margin: 0 20px 0 0;
  }

  .title-tag {
    margin: 0;
    justify-content: space-between;
  }

  .card-title {
    width: 100%;
    margin: 0 10px 12px 0;
    ${({ theme }) => theme.typo.Body_16_SB};
    word-break: keep-all;
    line-height: 20px;
  }

  .card-tag {
    ${({ theme }) => theme.typo.Caption_12_M};
    display: inline-block;
    padding: 4px 10px;
    margin: 0 6px 0 0;
    border-radius: 6px;
    background-color: #d7ebff;
  }
`;

export default InsightCard;
