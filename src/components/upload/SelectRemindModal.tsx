import styled from 'styled-components';
import { useState } from 'react';
import { InsightPostRequest } from '@/types/insight';
import GrabberIcon from '@svg/upload/grabber-icon.svg';
import { WEEKDAYS } from '@/constants/remind';
import SelectRemindType from './remind-modal/SelectRemindType';
import DefaultPeriod from './remind-modal/DefaultPeriod';
import WeekPeriod from './remind-modal/WeekPeriod';
import MonthPeriod from './remind-modal/MonthPeriod';

type Props = {
  remindType: string | undefined;
  onClose: () => void;
  onSelect: React.Dispatch<React.SetStateAction<InsightPostRequest>>;
  setRemindTerm: React.Dispatch<React.SetStateAction<string>>;
  insightInput: InsightPostRequest;
};

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

  const renderRemindPeriod = () => {
    switch (remindType) {
      case 'DEFAULT':
        return <DefaultPeriod />;
      case 'WEEK':
        return (
          <WeekPeriod selectedWeekDay={selectedWeekDay} handleDay={handleDay} />
        );
      case 'MONTH':
        return (
          <MonthPeriod
            selectedMonthDay={selectedMonthDay}
            handleDay={handleDay}
          />
        );
    }
  };

  return (
    <>
      <Wrapper>
        <ModalHeader>
          <GrabberIcon />
        </ModalHeader>
        <ModalBody>
          <ModalTitle>
            <p>리마인드 주기 설정</p>
            <CompleteBtn onClick={handleComplete}>완료</CompleteBtn>
          </ModalTitle>
          <SelectRemindType
            remindType={remindType}
            setRemindType={setRemindType}
            setSelectedWeekDay={setSelectedWeekDay}
            setSelectedMonthDay={setSelectedMonthDay}
          />
          {renderRemindPeriod()}
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

  p {
    color: #1f1f1f;
    text-align: center;
    font-size: 18px;
    font-weight: 700;
    line-height: 140%;
    margin-top: 18px;
  }
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
