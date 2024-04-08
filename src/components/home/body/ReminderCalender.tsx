import styled from 'styled-components';
import LargeView from '@svg/large-view-icon.svg';
import SmallView from '@svg/small-view-icon.svg';
import { useEffect, useState } from 'react';
import Calender from './Calender';
import { CalenderPostResponse } from '@/types/reminder';
import InsightList from './InsightList';
import dayjs from 'dayjs';
import CalenderModal from './CalenderModal';

export const calenderData: CalenderPostResponse = {
  date: '2024-03-18',
  remindRead: 1,
  remindTotal: 2,
  remindInsightList: [
    {
      insightId: 2,
      insightMainImage: '/image/디자인1.jpg',
      insightTitle: '알아두면 쓸모있는 시멘틱 마크업 개념',
      insightSummary:
        '미드저니는 UX/UI디자인, 그래픽 디자인 등 다양한 분야에서 활용될 수있습니다. 미드저니를 활용해 UX/UI 디자인을 수행하는 경우, 시나리오와 퍼소나를 아주 높은 퀄리티로 시각화 할 수 있습니다.',
      insightTagList: ['UI/UX', '사용자 경험'],
      todayRead: false,
    },
    {
      insightId: 2,
      insightMainImage: '/image/개발1.jpg',
      insightTitle: '디자인시스템에 모션 가이드 추가하는 방법',
      insightSummary:
        '미드저니는 UX/UI디자인, 그래픽 디자인 등 다양한 분야에서 활용될 수있습니다. 미드저니를 활용해 UX/UI 디자인을 수행하는 경우, 시나리오와 퍼소나를 아주 높은 퀄리티로 시각화 할 수 있습니다.',
      insightTagList: ['UI/UX', '사용자 경험'],
      todayRead: true,
    },
  ],
};

// TODO [2] - 날짜 클릭 시 해당 날짜에 리마인드 해야 하는 인사이트 호출
const ReminderCalender = () => {
  const [infoText, setInfoText] = useState<string>('');
  const [$isSmall, set$isSmall] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState(dayjs().format('MM/DD/YY'));
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const infoList = [
      '리마인드를 설정하면 캘린더에서 확인할 수 있어요!',
      `${30 - calenderData.remindTotal}개 더 저장하면 맞춤 콘텐츠를 추천해드려요!`,
    ];
    setInfoText(infoList[Math.floor(Math.random() * 2)]);
  }, []);

  const onClickView = () => {
    document.startViewTransition(() => {
      set$isSmall(!$isSmall);
    });
  };

  const onClickModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <Wrapper>
      <Calender
        onClickModal={onClickModal}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <ViewSetting>
        <div className="instruction">
          <p>{infoText}</p>
        </div>
        <div className="icons-box">
          <LargeViewIcon $isSmall={$isSmall} onClick={onClickView} />
          <SmallViewIcon $isSmall={$isSmall} onClick={onClickView} />
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
      {modalOpen ? (
        <CalenderModal
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          onClickModal={onClickModal}
        />
      ) : (
        <></>
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
