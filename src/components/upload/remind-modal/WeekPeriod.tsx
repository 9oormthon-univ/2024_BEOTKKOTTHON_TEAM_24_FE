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
    color: #1f1f1f;
    font-size: 16px;
    font-weight: 600;
    line-height: 140%;
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
    background: #e9efff;
    color: #3184ff;
    font-size: 20px;
    font-weight: 700;
    line-height: 140%;
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
  background: #f4f5f7;
  color: #1f1f1f;
  font-size: 16px;
  font-weight: 500;
  line-height: 23.981px;
  letter-spacing: -0.365px;
  cursor: pointer;
`;
