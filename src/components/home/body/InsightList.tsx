import styled from 'styled-components';
import InsightCard from '../InsightCard';
import SummaryInsightCard from '@components/common/SummaryInsightCard';
import { CalenderPostResponse } from '@/types/reminder';

interface Props {
  $isSmall: boolean;
  calenderData: CalenderPostResponse;
}

const InsightList = ({ $isSmall, calenderData }: Props) => {
  return (
    <View>
      <div>
        <div className="view-title">
          <span>리마인드 인사이트</span>
          <span>
            {calenderData.remindRead}/{calenderData.remindTotal}
          </span>
        </div>
        {$isSmall ? (
          <InsightCard insightData={calenderData.remindInsightList[0]} />
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
      <div>
        <div className="view-title">
          <span>추천 인사이트</span>
          <span>1/3</span>
        </div>
        {$isSmall ? (
          <InsightCard insightData={calenderData.remindInsightList[0]} />
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
  );
};

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

export default InsightList;
