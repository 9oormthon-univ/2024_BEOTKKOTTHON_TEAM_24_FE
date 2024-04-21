import styled from 'styled-components';
import { RemindType } from '@/types/insight';
import { REMIND_TYPE } from '@/constants/remind';

interface Props {
  remindType: RemindType;
  setRemindType: (value: RemindType) => void;
  setSelectedWeekDay: (value: number[]) => void;
  setSelectedMonthDay: (value: number[]) => void;
}

const periodSelection = [
  { remindType: REMIND_TYPE.DEFAULT, text: '추천 주기' },
  { remindType: REMIND_TYPE.WEEK, text: '매주 반복' },
  { remindType: REMIND_TYPE.MONTH, text: '매월 반복' },
];

const SelectRemindType = ({
  remindType,
  setRemindType,
  setSelectedWeekDay,
  setSelectedMonthDay,
}: Props) => {
  const handleType = (type: RemindType) => {
    setRemindType(type);
    setSelectedWeekDay([]);
    setSelectedMonthDay([]);
  };
  return (
    <Wrapper>
      <p>리마인드 주기 선택</p>
      <PeriodList>
        {periodSelection.map((value, i) => (
          <Period
            key={i}
            onClick={() => handleType(value.remindType as RemindType)}
            className={remindType === value.remindType ? 'selected' : ''}
          >
            {value.text}
          </Period>
        ))}
      </PeriodList>
    </Wrapper>
  );
};

export default SelectRemindType;

const Wrapper = styled.div`
  p {
    margin-bottom: 16px;
    color: #1f1f1f;
    font-size: 16px;
    font-weight: 600;
    line-height: 140%;
  }
`;

const PeriodList = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 48px;
  border-radius: 8px;
  background: #f4f5f7;
  cursor: pointer;
  .selected {
    border-radius: 8px;
    background: #3184ff;
    color: white;
  }
`;

const Period = styled.div`
  display: flex;
  width: 118px;
  height: 48px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 8px;
  background: #f4f5f7;
  color: #848484;
`;
