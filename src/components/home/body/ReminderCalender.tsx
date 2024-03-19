import styled from 'styled-components';
import InsightCard from '../InsightCard';
import ListViewIcon from '/Users/kwaksj329/2024_beotkkotthon_team_24_fe/public/svg/list-view-icon.svg';

const ReminderCalender = () => {
  return (
    <Wrapper>
      <ViewSetting>
        <div></div>
        <ListViewIcon />
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

const ViewSetting = styled.div``;

export default ReminderCalender;
