import styled from 'styled-components';
import Image from 'next/image';
import coverImg from '@image/디자인2.jpg';

const InsightCard = () => {
  return (
    <Wrapper>
      <Image
        src={coverImg}
        width={109}
        height={78}
        alt="Insight Card image"
        className="img"
      />
      <div className="card-title-tag">
        <div className="card-title">
          디자인시스템에 모션 가이드 추가하는 방법
        </div>
        <div className="card-tag">UI/UX</div>
        <div className="card-tag">사용자 경험</div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 102px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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
