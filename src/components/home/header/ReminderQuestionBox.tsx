import styled from 'styled-components';
import Image from 'next/image';
import coverImg from '@image/디자인1.jpg';

const ReminderQuestionBox = () => {
  return (
    <Wrapper>
      <div className="reminder-title">
        <strong>Q. 해당 인사이트를 어떻게 활용할 수 있을까요?</strong>
      </div>
      <input
        className="reminder-input"
        placeholder="답변을 입력해보세요."
      ></input>
      <Insight>
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
      </Insight>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: calc(100% - 40px);
  height: 197px;
  border-radius: 12px;
  margin: 0 20px 48px;
  padding: 16px;
  background-color: #e9efff;
  display: flex;
  flex-direction: column;
  align-items: center;

  .reminder-title {
    width: 100%;
    font-size: 16px;
    font-weight: 600;
    display: flex;
    justify-content: left;
  }

  .reminder-input {
    width: 100%;
    font-size: 12px;
    font-weight: 500;
    padding: 10px;
    margin: 12px 0;
    border: 0;
    border-radius: 8px;
  }
`;

const Insight = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;
  background-color: #ffffff;

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

export default ReminderQuestionBox;
