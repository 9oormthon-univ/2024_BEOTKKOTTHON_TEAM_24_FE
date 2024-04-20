import styled from 'styled-components';
import { useState } from 'react';
import { InsightPostRequest, RemindType } from '@/types/insight';
import GrabberIcon from '@svg/upload/grabber-icon.svg';
import ForgettingCurve from '@svg/upload/forgetting-curve.svg';
import { REMIND_TYPE, WEEKDAYS } from '@/constants/remind';

type Props = {
  remindType: string | undefined;
  onClose: () => void;
  onSelect: React.Dispatch<React.SetStateAction<InsightPostRequest>>;
  setRemindTerm: React.Dispatch<React.SetStateAction<string>>;
  insightInput: InsightPostRequest;
};

const periodSelection = [
  { remindType: REMIND_TYPE.DEFAULT, text: '추천 주기' },
  { remindType: REMIND_TYPE.WEEK, text: '매주 반복' },
  { remindType: REMIND_TYPE.MONTH, text: '매월 반복' },
];

const SelectRemindModal = (props: Props) => {
  const [remindType, setRemindType] = useState(props.insightInput.remindType);
  const [selectedWeekDay, setSelectedWeekDay] = useState<number[]>([]);
  const [selectedMonthDay, setSelectedMonthDay] = useState<number[]>([]);

  const renderRemindTerm = () => {
    switch (remindType) {
      case 'DEFAULT':
        props.setRemindTerm('추천 주기');
        break;
      case 'WEEK':
        if (selectedWeekDay.length === 7) {
          props.setRemindTerm('매일 마다 ');
          break;
        }
        const resultWeek = WEEKDAYS.filter((day) =>
          selectedWeekDay.includes(WEEKDAYS.indexOf(day) + 1),
        );
        const printContentWeek = resultWeek?.join('/');
        props.setRemindTerm(printContentWeek + '마다 ');
        break;
      case 'MONTH':
        const resultMonth =
          selectedMonthDay && Array.from(selectedMonthDay, (day) => `${day}일`);
        const printContent = resultMonth?.join(', ');
        props.setRemindTerm(printContent + '마다 ');
        break;
    }
  };

  const handleComplete = () => {
    if (remindType === 'DEFAULT') {
      props.onSelect({
        ...props.insightInput,
        enable: true,
        remindType: remindType,
        remindDays: [0],
      });
      renderRemindTerm();
      props.onClose();
      return;
    }
    const selectedDay =
      remindType === 'WEEK' ? selectedWeekDay : selectedMonthDay;
    if (selectedDay.length === 0) {
      console.log('emptuy');
      setRemindType('DEFAULT');
      props.onSelect({
        ...props.insightInput,
        enable: true,
        remindType: 'DEFAULT',
        remindDays: [0],
      });
      renderRemindTerm();
      props.onClose();
      return;
    }
    props.onSelect({
      ...props.insightInput,
      enable: true,
      remindType: remindType,
      remindDays: selectedDay,
    });
    renderRemindTerm();
    props.onClose();
  };

  const handleType = (type: RemindType) => {
    setRemindType(type);
    setSelectedWeekDay([]);
    setSelectedMonthDay([]);
  };

  const handleDay = (day: number) => {
    if (remindType === 'WEEK') {
      if (selectedWeekDay.includes(day)) {
        const newWeekDay = selectedWeekDay.filter((element) => element !== day);
        setSelectedWeekDay(newWeekDay);
        return;
      }
      const newWeekDay = [...selectedWeekDay, day].sort();
      setSelectedWeekDay(newWeekDay);
    }
    if (remindType === 'MONTH') {
      if (selectedMonthDay.includes(day)) {
        const newMonthDay = selectedMonthDay.filter(
          (element) => element !== day,
        );
        setSelectedMonthDay(newMonthDay);
        return;
      }
      if (selectedMonthDay.length === 3) {
        alert('반복 일은 최대 3일까지 선택 가능합니다.');
        return;
      }
      const newMonthDay = [...selectedMonthDay, day].sort();
      setSelectedMonthDay(newMonthDay);
    }
  };

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
            className={selectedMonthDay.includes(day) ? 'selected' : ''}
            onClick={() => handleDay(day)}
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
    <>
      <Wrapper>
        <ModalHeader>
          <GrabberIcon />
        </ModalHeader>
        <ModalBody>
          <ModalTitle>
            <Title>리마인드 주기 설정</Title>
            <CompleteBtn onClick={handleComplete}>완료</CompleteBtn>
          </ModalTitle>
          <RemindTermSection>
            <SubTitle>리마인드 주기 선택</SubTitle>
            <TermList>
              {periodSelection.map((value, i) => (
                <Term
                  key={i}
                  onClick={() => handleType(value.remindType as RemindType)}
                  className={remindType === value.remindType ? 'selected' : ''}
                >
                  {value.text}
                </Term>
              ))}
            </TermList>
          </RemindTermSection>
          {remindType === 'DEFAULT' && (
            <RecommendBg>
              <RecommendText>
                <span className="colored">망각곡선 주기</span>에 맞추어 리마인드
                알림을 제공해요!
              </RecommendText>
              <ForgettingCurve />
              <SubText>
                *망각 곡선(forgetting curve)은 시간이 지날수록 학습한 내용을
                얼마나 잊는지에 대한 그래프
              </SubText>
            </RecommendBg>
          )}
          {remindType === 'WEEK' && (
            <div>
              <SubTitle>반복 요일 선택</SubTitle>
              <WeekDayList>
                {WEEKDAYS.map((day, i) => (
                  <WeekDay
                    key={i}
                    className={
                      selectedWeekDay.includes(i + 1) ? 'selected' : ''
                    }
                    onClick={() => handleDay(i + 1)}
                  >
                    {day}
                  </WeekDay>
                ))}
              </WeekDayList>
            </div>
          )}
          {remindType === 'MONTH' && (
            <div>
              <SubTitle>반복 일 선택</SubTitle>
              <MonthDayBg>{renderCalendar()}</MonthDayBg>
            </div>
          )}
        </ModalBody>
      </Wrapper>
      <ModalBg onClick={() => props.onClose()} />
    </>
  );
};

export default SelectRemindModal;

const ModalBg = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  flex-shrink: 0;
  background: rgba(0, 0, 0, 0.63);
  backdrop-filter: blur(1.5px);
  z-index: 1;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  flex-shrink: 0;
  z-index: 20;
`;

const ModalHeader = styled.div`
  display: flex;
  width: 100%;
  height: 38px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-bottom: 1px solid var(--Neutral-150, #e1e1e1);
  border-radius: 8px 8px 0px 0px;
  background: white;
`;

const ModalBody = styled.div`
  width: 100%;
  height: 608px;
  background: white;
  display: flex;
  flex-direction: column;
  padding: 0px 20px;
  gap: 34px;
`;

const ModalTitle = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  color: #1f1f1f;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  line-height: 140%; /* 25.2px */
  margin-top: 18px;
`;

const CompleteBtn = styled.div`
  position: absolute;
  top: 18px;
  right: 0px;
  color: #3184ff;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
  cursor: pointer;
`;

const RemindTermSection = styled.div``;

const SubTitle = styled.div`
  margin-bottom: 16px;
  color: var(--Neutral-500, #1f1f1f);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
`;

const TermList = styled.div`
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

const Term = styled.div`
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

const RecommendBg = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 40px 16px 29px;
  align-items: center;
  border-radius: 8.235px;
  background: #f4f5f7;
  gap: 19px;
`;

const RecommendText = styled.p`
  color: #1f1f1f;
  width: 170px;
  word-break: keep-all;
  text-align: left;
  margin-right: 114px;
  /* Body-16-SB */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  .colored {
    color: #3184ff;
  }
`;

const SubText = styled(RecommendText)`
  color: #000;
  width: 284px;
  font-size: 8px;
  font-style: normal;
  font-weight: 400;
  line-height: 9.723px;
  letter-spacing: -0.148px;
  margin: 0;
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
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
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
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 23.981px;
  letter-spacing: -0.365px;
  cursor: pointer;
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
