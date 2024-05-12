import styled from 'styled-components';
import Image from 'next/image';

interface Props {
  totalLength: number;
  reminderInfo: {
    reminderQuestion: string;
    insightId: number;
    reminderId: number;
    insightTitle: string;
    insightMainImage: string;
    insightTagList: string[];
  };
  onClick?: () => void;
}

const ReminderQuestionBox = ({ totalLength, reminderInfo }: Props) => {
  const margin = totalLength === 1 ? 50 : 0;

  return (
    <Wrapper margin={margin}>
      <div className="reminder-title">
        <strong>Q. {reminderInfo.reminderQuestion}</strong>
      </div>
      <button className="reminder-input">답변을 입력해보세요.</button>
      <Insight>
        <Image
          src={reminderInfo.insightMainImage}
          alt="Insight Card image"
          style={{ objectFit: 'cover' }}
          height={68}
          width={96}
          className="reminder-img"
        />
        <TitleTagBox>
          <div className="title">{reminderInfo.insightTitle}</div>
          <div className="tag-box">
            {reminderInfo.insightTagList.map((value, i) => (
              <div className="tag" key={i}>
                {value}
              </div>
            ))}
          </div>
        </TitleTagBox>
      </Insight>
    </Wrapper>
  );
};

interface CSSProps {
  margin: number;
}

const Wrapper = styled.div<CSSProps>`
  width: calc(100% - 40px);
  display: inline-block;
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

    strong {
      word-break: keep-all;
      line-height: 140%;
    }
  }

  .reminder-input {
    width: 100%;
    font-size: 12px;
    font-weight: 500;
    padding: 10px;
    margin: 12px 0;
    border: 0;
    color: #848484;
    border-radius: 8px;
    background-color: #ffffff;
    text-align: left;
  }
`;

const Insight = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;
  background-color: #ffffff;
  flex: 1;
  padding: 8px 12px;

  .reminder-img {
    border-radius: 12px;
    margin-right: 20px;
  }
`;

const TitleTagBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-height: 68px;

  .title {
    font-size: 12px;
    font-weight: 700;
    word-break: keep-all;
    line-height: 18px;
  }

  .tag {
    font-size: 10px;
    font-weight: 600;
    display: inline-block;
    padding: 4px 10px;
    margin: 0 6px 6px 0;
    border-radius: 6px;
    background-color: #ffe4e9;
  }
`;

export default ReminderQuestionBox;
