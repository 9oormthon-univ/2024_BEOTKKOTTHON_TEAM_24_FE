import styled from 'styled-components';

interface Props {
  selectedMonthDay: number[];
  handleDay: (value: number) => void;
}

const MonthPeriod = (props: Props) => {
  const renderCalendar = () => {
    const days = [];
    for (let i = 0; i < 5; i++) {
      const row = [];
      for (let j = 0; j < 7; j++) {
        const day = i * 7 + j + 1;
        if (day > 31) {
          row.push(<td key={day}></td>);
          continue;
        }
        row.push(
          <td
            key={day}
            className={props.selectedMonthDay.includes(day) ? 'selected' : ''}
            onClick={() => props.handleDay(day)}
          >
            {day}
          </td>,
        );
      }
      days.push(<tr>{row}</tr>);
    }
    return days;
  };

  return (
    <Wrapper>
      <p>반복 일 선택</p>
      <MonthDayBg>{renderCalendar()}</MonthDayBg>
    </Wrapper>
  );
};

export default MonthPeriod;

const Wrapper = styled.div`
  p {
    margin-bottom: 16px;
    color: var(--Neutral-500, #1f1f1f);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
  }
`;

const MonthDayBg = styled.div`
  display: flex;
  width: 100%;
  padding: 18px 0px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  border-radius: 8px;
  background: #f4f5f7;
  tr {
    display: flex;
    display: flex;
    height: 40px;
    padding: 0px 15px;
    justify-content: space-between;
    align-items: flex-start;
    align-self: stretch;
  }
  td {
    display: flex;
    width: 40px;
    height: 40px;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: #1f1f1f;
    text-align: center;
    font-size: 18px;
    font-weight: 400;
    line-height: 140%;
  }
  .selected {
    border-radius: 30px;
    background: #e9efff;
    color: #3184ff;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    line-height: 140%;
  }
`;
