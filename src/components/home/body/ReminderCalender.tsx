import styled from 'styled-components';
import InsightCard from '../InsightCard';
import LargeView from '@svg/large-view-icon.svg';
import SmallView from '@svg/small-view-icon.svg';
import { useState } from 'react';
import Calender from './Calender';
import SummaryInsightCard from '@components/common/SummaryInsightCard';

const ReminderCalender = () => {
  const [isSmall, setIsSmall] = useState<boolean>(true);

  const onClick = () => {
    setIsSmall(!isSmall);
  };

  return (
    <Wrapper>
      <Calender />
      <ViewSetting>
        <div className="instruction">
          <p>15개 더 저장하면 맞춤 콘텐츠를 추천해드려요!</p>
        </div>
        <div className="icons-box">
          <LargeViewIcon isSmall={isSmall} onClick={onClick} />
          <SmallViewIcon isSmall={isSmall} onClick={onClick} />
        </div>
      </ViewSetting>
      <View>
        <div>
          <div className="view-title">
            <span>리마인드 인사이트</span>
            <span>1/3</span>
          </div>
          {isSmall ? (
            <InsightCard />
          ) : (
            <SummaryInsightCard
              coverImg="/image/디자인2.jpg"
              title="디자인시스템에 모션 가이드 추가하는 방법"
              summary="미드저니는 UX/UI디자인, 그래픽 디자인 등 다양한 분야에서 활용될 수
              있습니다. 미드저니를 활용해 UX/UI 디자인을 수행하는 경우, 시나리오와
              퍼소나를 아주 높은 퀄리티로 시각화 할 수 있습니다."
              tags={['UI/UX', '사용자 경험']}
            />
          )}
        </div>
        <div>
          <div className="view-title">
            <span>추천 인사이트</span>
            <span>1/3</span>
          </div>
          {isSmall ? (
            <InsightCard />
          ) : (
            <SummaryInsightCard
              coverImg="/image/디자인3.jpg"
              title="디자인시스템에 모션 가이드 추가하는 방법"
              summary="미드저니는 UX/UI디자인, 그래픽 디자인 등 다양한 분야에서 활용될 수
              있습니다. 미드저니를 활용해 UX/UI 디자인을 수행하는 경우, 시나리오와
              퍼소나를 아주 높은 퀄리티로 시각화 할 수 있습니다."
              tags={['UI/UX', '사용자 경험']}
            />
          )}
        </div>
      </View>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fbfbfb;
`;

type IconProps = {
  isSmall: boolean;
};

const SmallViewIcon = styled(SmallView)<IconProps>`
  rect {
    fill: ${(props) => (props.isSmall ? '#1F1F1F' : '#E1E1E1')};
  }
`;

const LargeViewIcon = styled(LargeView)<IconProps>`
  rect {
    fill: ${(props) => (props.isSmall ? '#E1E1E1' : '#1F1F1F')};
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

const View = styled.div`
  .view-title {
    :first-child {
      margin-left: 20px;
    }
    :last-child {
      margin-left: 10px;
      color: #3184ff;
    }
  }
`;

export default ReminderCalender;
