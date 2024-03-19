import styled from 'styled-components';
import InsightCard from '../InsightCard';

const ReminderCalender = () => {
  return (
    <Wrapper>
      <InsightCard isSmall={false} />
      <InsightCard isSmall={false} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: #fbfbfb;
`;

export default ReminderCalender;
