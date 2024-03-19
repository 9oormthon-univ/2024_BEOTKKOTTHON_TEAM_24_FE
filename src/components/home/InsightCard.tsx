import styled from 'styled-components';
import Image from 'next/image';
import coverImg from '@image/디자인1.jpg';
import coverImg2 from '@image/디자인2.jpg';

type Props = {
  isSmall: boolean;
};

const InsightCard = (props: Props) => {
  return props.isSmall ? (
    <WrapperSmall>
      <Image
        src={coverImg}
        width={96}
        height={68}
        alt="Insight Card image"
        className="img"
      />
      <div className="card-title-tag">
        <div className="card-title">
          UX/UI 디자인에 미드저니 58,000% 활용하기
        </div>
        <div className="card-tag">AI</div>
        <div className="card-tag">미드저니</div>
      </div>
    </WrapperSmall>
  ) : (
    <WrapperLarge>
      <Image
        src={coverImg2}
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
    </WrapperLarge>
  );
};

const WrapperSmall = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background-color: #ffffff;

  .img {
    border-radius: 12px;
    margin: 8px 20px 8px 12px;
  }

  .title-tag {
    margin: 0;
    justify-content: space-between;
  }

  .card-title {
    margin: 0 10px 12px 0;
    font-size: 12px;
    font-weight: 700;
    word-break: keep-all;
    line-height: 18px;
  }

  .card-tag {
    font-size: 10px;
    font-weight: 600;
    display: inline-block;
    padding: 4px 10px;
    margin: 0 6px 0 0;
    border-radius: 6px;
    background-color: #ffe4e9;
  }
`;

const WrapperLarge = styled.div`
  height: 102px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background-color: #ffffff;
  margin: 22px 20px 0 20px;

  .img {
    border-radius: 12px;
    margin: 8px 20px 8px 12px;
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
