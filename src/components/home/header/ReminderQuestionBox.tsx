import styled from 'styled-components';
import Image from 'next/image';

interface Props {
  totalLenght: number;
  reminderInfo: {
    reminderQuestion: string;
    insightId: number;
    reminderId: number;
    insightTitle: string;
    insightMainImage: string;
    insightTagList: string[];
  };
}

const ReminderQuestionBox = ({ totalLenght, reminderInfo }: Props) => {
  const margin = totalLenght === 1 ? 50 : 0;
  return (
    <Wrapper margin={margin}>
      <div className="reminder-title">
        <strong>Q. {reminderInfo.reminderQuestion}</strong>
      </div>
      <input
        className="reminder-input"
        placeholder="답변을 입력해보세요."
      ></input>
      <Insight>
        <Image
          src={reminderInfo.insightMainImage}
          width={96}
          height={68}
          alt="Insight Card image"
          className="img"
        />
        <div className="card-title-tag">
          <div className="card-title">{reminderInfo.insightTitle}</div>
          {reminderInfo.insightTagList.map((value, i) => (
            <div className="card-tag" key={i}>
              {value}
            </div>
          ))}
        </div>
      </Insight>
    </Wrapper>
  );
};

interface CSSProps {
  margin: number;
}

const Wrapper = styled.div<CSSProps>`
  width: calc(100% - 40px);
  height: 197px;
  border-radius: 12px;
  margin: 0 20px ${(props) => props.margin}px;
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
