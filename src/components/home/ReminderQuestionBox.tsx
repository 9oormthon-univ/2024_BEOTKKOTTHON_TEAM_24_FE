import styled from 'styled-components';
import InsightCard from './InsightCard';

const ReminderQuestionBox = () => {
  return (
    <Wrapper>
      <div className="title">
        <strong>Q. 해당 인사이트를 어떻게 활용할 수 있을까요?</strong>
      </div>
      <input className="input" placeholder="답변을 입력해보세요."></input>
      <InsightCard isSmall={true} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: calc(100% - 40px);
  height: 197px;
  border-radius: 12px;
  margin: 0 20px;
  padding: 16px;
  background-color: #e9efff;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    width: 100%;
    font-size: 16px;
    font-weight: 600;
    display: flex;
    justify-content: left;
  }

  .input {
    width: 100%;
    font-size: 12px;
    font-weight: 500;
    padding: 10px;
    margin: 12px 0;
    border: 0;
    border-radius: 8px;
  }
`;

export default ReminderQuestionBox;
