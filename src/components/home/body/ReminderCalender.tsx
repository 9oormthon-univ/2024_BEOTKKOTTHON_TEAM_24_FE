import styled from 'styled-components';
import InsightCard from '../InsightCard';
import LargeViewIcon from '@svg/large-view-icon.svg';
import SmallViewIcon from '@svg/small-view-icon.svg';
import { useEffect, useState } from 'react';
import Calender from './Calender';

const ReminderCalender = () => {
  const [view, setView] = useState<boolean>(false);

  useEffect(() => {}, [view]);

  const onClick = () => {
    setView(!view);
  };

  return (
    <Wrapper>
      <Calender />
      <ViewSetting>
        <div className="instruction">
          <p>15개 더 저장하면 맞춤 콘텐츠를 추천해드려요!</p>
        </div>
        <div className="icons-box">
          <LargeViewIcon onClick={onClick} />
          <SmallViewIcon onClick={onClick} />
        </div>
      </ViewSetting>
      <InsightCard isSmall={false} />
      <InsightCard isSmall={false} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fbfbfb;
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

export default ReminderCalender;
