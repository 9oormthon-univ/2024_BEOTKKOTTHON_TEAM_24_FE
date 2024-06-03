import styled from 'styled-components';
import { WEEKDAYS } from '@/constants/remind';

interface Props {
  selectedWeekDay: number[];
  handleDay: (value: number) => void;
}

const WeekPeriod = (props: Props) => {
  return (
    <Wrapper>
      <p>반복 요일 선택</p>
      <WeekDayList>
        {WEEKDAYS.map((day, i) => (
          <WeekDay
            key={i}
            className={props.selectedWeekDay.includes(i + 1) ? 'selected' : ''}
            onClick={() => props.handleDay(i + 1)}
          >
            {day}
          </WeekDay>
        ))}
      </WeekDayList>
    </Wrapper>
  );
};

export default WeekPeriod;

const Wrapper = styled.div`
  p {
    margin-bottom: 16px;
    color: ${(props) => props.theme.palette.neutral[500]};
    ${({ theme }) => theme.typo.Body_16_SB};
  }
`;

const WeekDayList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;

  .selected {
    display: flex;
    width: 42px;
    height: 52px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 9.136px;
    background: ${(props) => props.theme.palette.primary[100]};
    color: ${(props) => props.theme.palette.primary[500]};
    ${({ theme }) => theme.typo.Head_20_B};
  }
`;

const WeekDay = styled.div`
  display: flex;
  height: 52px;
  padding: 12px 14px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 11.419px;
  border-radius: 9.136px;
  background: ${(props) => props.theme.palette.primary[100]};
  color: ${(props) => props.theme.palette.neutral[500]};
  ${({ theme }) => theme.typo.Body_16_M};
  cursor: pointer;
`;
