import styled from 'styled-components';
import Image from 'next/image';

interface CardProps {
  coverImg: string;
  title: string;
  summary: string;
  tags: string[];
}

const SummaryInsightCard = ({ coverImg, title, summary, tags }: CardProps) => {
  return (
    <Wrapper>
      <Image
        src={coverImg}
        width={353}
        height={86}
        alt="Insight Card image"
        className="img"
      />
      <Description>
        <div className="card-title">{title}</div>
        <div className="card-summary">{summary}</div>
        <div className="card-tags">
          {tags.map((v, i) => (
            <div key={v ? v.toString() : `${v}${i}`} className="card-tag">
              UI/UX
            </div>
          ))}
        </div>
      </Description>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  border-radius: 12px;
  background-color: #ffffff;
  margin: 22px 20px;

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
    font-size: 16px;
    font-weight: 600;
    word-break: keep-all;
    line-height: 20px;
  }

  .card-summary {
    font-size: 12px;
    font-weight: 500;
    line-height: 17px;
    word-break: keep-all;
    color: #565656;
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

export default SummaryInsightCard;
