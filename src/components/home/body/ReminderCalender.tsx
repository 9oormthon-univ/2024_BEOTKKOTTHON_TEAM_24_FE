import styled from 'styled-components';
import LargeView from '@svg/large-view-icon.svg';
import SmallView from '@svg/small-view-icon.svg';
import { useEffect, useState } from 'react';
import Calender from './Calender';
import { CalenderPostResponse } from '@/types/reminder';
import InsightList from './InsightList';
import dayjs from 'dayjs';

export const calenderData: CalenderPostResponse = {
  date: '2024-03-18',
  remindRead: 1,
  remindTotal: 2,
  remindInsightList: [
    {
      insightId: 1,
      insightTitle: '스프링 어노테이션',
      insightMainImage: '/image/개발2.jpg',
      insightTagList: ['Spring'],
      todayRead: true,
    },
    {
      insightId: 2,
      insightTitle: '스프링 어노테이션',
      insightMainImage: '/image/디자인1.jpg',
      insightTagList: ['Spring'],
      todayRead: false,
    },
  ],
};

// TODO [2] - 날짜 클릭 시 해당 날짜에 리마인드 해야 하는 인사이트 호출
const ReminderCalender = () => {
  const [infoText, setInfoText] = useState<string>('');
  const [$isSmall, set$isSmall] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState(dayjs().format('MM/DD/YY'));

  useEffect(() => {
    const infoList = [
      '리마인드를 설정하면 캘린더에서 확인할 수 있어요!',
      `${30 - calenderData.remindTotal}개 더 저장하면 맞춤 콘텐츠를 추천해드려요!`,
    ];
    setInfoText(infoList[Math.floor(Math.random() * 2)]);
  }, []);

  const onClick = () => {
    set$isSmall(!$isSmall);
  };

  return (
    <Wrapper>
      <Calender selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <ViewSetting>
        <div className="instruction">
          <p>{infoText}</p>
        </div>
        <div className="icons-box">
          <LargeViewIcon $isSmall={$isSmall} onClick={onClick} />
          <SmallViewIcon $isSmall={$isSmall} onClick={onClick} />
        </div>
      </ViewSetting>
      {dayjs().isSame(selectedDate, 'day') ? (
        <InsightList $isSmall={$isSmall} calenderData={calenderData} />
      ) : (
        <EmptyInsight>
          <p>확인 할 인사이트가 없습니다.</p>
          <p>추천 인사이트는 당일에만 확인할 수 있어요!</p>
        </EmptyInsight>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fbfbfb;
  margin-bottom: 140px;
`;

type IconProps = {
  $isSmall: boolean;
};

const SmallViewIcon = styled(SmallView)<IconProps>`
  rect {
    fill: ${(props) => (props.$isSmall ? '#1F1F1F' : '#E1E1E1')};
  }
`;

const LargeViewIcon = styled(LargeView)<IconProps>`
  rect {
    fill: ${(props) => (props.$isSmall ? '#E1E1E1' : '#1F1F1F')};
  }
`;

const ViewSetting = styled.div`
  margin: 20px 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .instruction {
    display: inline-block;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 500;
    color: #3184ff;
    padding: 6px 10px;
    background-color: #e9efff;
  }

  .icons-box {
    width: 48px;
    display: flex;
    justify-content: space-between;
  }
`;

const EmptyInsight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 20px;
  font-size: 16px;
  font-weight: 600;
  flex: 1;

  :first-child {
    color: #565656;
    margin-bottom: 10px;
  }

  :last-child {
    color: #3184ff;
  }
`;

export default ReminderCalender;
