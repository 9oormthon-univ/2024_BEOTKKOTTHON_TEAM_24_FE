import styled from 'styled-components';
import Image from 'next/image';
import coverImg from '@image/디자인1.jpg';

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
      <div className="title-tag">
        <div className="title">UX/UI 디자인에 미드저니 58,000% 활용하기</div>
        <div className="tag">AI</div>
        <div className="tag">미드저니</div>
      </div>
    </WrapperSmall>
  ) : (
    <WrapperLarge>
      <div>d</div>
    </WrapperLarge>
  );
};

const WrapperSmall = styled.div`
  width: 100%;
  height: 200px;
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

  .title {
    margin: 0 0 12px;
    font-size: 12px;
    font-weight: 700;
    word-break: keep-all;
  }

  .tag {
    font-size: 10px;
    font-weight: 600;
    display: inline-block;
    padding: 4px 10px;
    margin: 0 6px 0 0;
    border-radius: 6px;
    background-color: #ffe4e9;
  }
`;

const WrapperLarge = styled.div``;

export default InsightCard;
