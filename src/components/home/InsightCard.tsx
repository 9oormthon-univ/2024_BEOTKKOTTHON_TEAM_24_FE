import styled from 'styled-components';
import Image from 'next/image';
import { RemindInsight } from '@/types/reminder';

interface Props {
  insightData: RemindInsight;
}

const InsightCard = ({ insightData }: Props) => {
  return (
    <Wrapper>
      <Image
        src={insightData.insightMainImage}
        width={109}
        height={78}
        alt="Insight Card image"
        className="img"
      />
      <div className="card-title-tag">
        <div className="card-title">{insightData.insightTitle}</div>
        <div className="card-tag">
          {insightData.insightTagList.map((value) => value)}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 102px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 12px;
  background-color: #ffffff;
  margin: 22px 20px;

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
    font-size: 16px;
    font-weight: 600;
    word-break: keep-all;
    line-height: 20px;
  }

  .card-tag {
    font-size: 12px;
    font-weight: 600;
    display: inline-block;
    padding: 4px 10px;
    margin: 0 6px 0 0;
    border-radius: 6px;
    background-color: #d7ebff;
  }
`;

export default InsightCard;
