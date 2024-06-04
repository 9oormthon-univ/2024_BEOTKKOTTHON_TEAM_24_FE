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
    color: ${({ theme }) => theme.palette.neutral[500]};
    ${({ theme }) => theme.typo.Body_16_SB};
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
  background: ${({ theme }) => theme.palette.neutral[100]};
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
    color: ${({ theme }) => theme.palette.neutral[500]};
    text-align: center;
    ${({ theme }) => theme.typo.Body_18_R};
  }
  .selected {
    border-radius: 30px;
    background: ${({ theme }) => theme.palette.primary[100]};
    color: ${({ theme }) => theme.palette.primary[500]};
    text-align: center;
    ${({ theme }) => theme.typo.Head_20_B};
  }
`;
