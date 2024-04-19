import styled from 'styled-components';
import Image from 'next/image';
import { Insight } from '@/types/insight';

interface Props {
  favicon?: string;
  insightData: Insight;
}

const InsightCard = ({ favicon, insightData }: Props) => {
  const imageList = [
    '/image/개발1.jpg',
    '/image/개발2.jpg',
    '/image/개발3.jpg',
    '/image/디자인1.jpg',
    '/image/디자인2.jpg',
    '/image/디자인3.jpg',
    '/image/기획1.jpg',
    '/image/기획2.jpg',
    '/image/기획3.jpg',
  ];
  return (
    <Wrapper>
      {favicon ? (
        <Image
          src={favicon}
          width={52}
          height={52}
          alt="Insight Card image"
          className="favicon"
        />
      ) : (
        <></>
      )}
      <Image
        src={imageList[insightData.insightId % 9]}
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
  box-shadow: 9px 9px 30px 0px #00000014;
  position: relative;

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
