import styled from 'styled-components';
import InsightCard from '../../common/InsightCard';
import SummaryInsightCard from '@components/common/SummaryInsightCard';
import { CalendarPostResponse } from '@/types/reminder';
import { insightData1 } from '@/constants/data';

interface Props {
  $isSmall: boolean;
  calendarData: CalendarPostResponse;
}

const InsightList = ({ $isSmall, calendarData }: Props) => {
  const { remindRead, remindTotal, remindInsightList } = calendarData;
  return (
    <View>
      <div>
        <div className="view-title">
          <span>리마인드 인사이트</span>
          <span>
            {remindRead}/{remindTotal}
          </span>
        </div>
        {remindInsightList.map((insight, idx) =>
          $isSmall ? (
            <InsightCard insightData={insight} key={idx} />
          ) : (
            <SummaryInsightCard
              favicon="/svg/insight-favicon.svg"
              insightData={insight}
              key={idx}
            />
          ),
        )}
      </div>
      <div>
        <div className="view-title">
          <span>추천 인사이트</span>
          <span>1/1</span>
        </div>
        {$isSmall ? (
          <InsightCard insightData={remindInsightList[1]} />
        ) : (
          <SummaryInsightCard
            favicon="/svg/insight-favicon.svg"
            insightData={insightData1}
          />
        )}
      </div>
    </View>
  );
};

const View = styled.div`
  display: flex;
  flex-direction: column;

  .view-title {
    :first-child {
      margin-left: 20px;
    }
    :last-child {
      margin-left: 10px;
      color: ${({ theme }) => theme.palette.primary[500]};
    }
  }
`;

export default InsightList;
