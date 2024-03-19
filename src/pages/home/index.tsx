import { NextPage } from 'next';
import styled from 'styled-components';
import TitleSettingsPanel from '@/components/home/header/TitleSettingPanel';
import ReminderQuestionBox from '@/components/home/header/ReminderQuestionBox';
import ReminderCalender from '@/components/home/body/ReminderCalender';
import BottomNavigation from '@/components/common/BottomNavigation';

const Home: NextPage = () => {
  return (
    <>
      <Wrapper>
        <TitleSettingsPanel />
        <ReminderQuestionBox />
        <HrLine />
        <ReminderCalender />
        <BottomNavigation />
      </Wrapper>
    </>
  );
};

export default Home;

const Wrapper = styled.div`
  max-height: 100vh;
  background-color: #fbfbfb;
`;

const HrLine = styled.hr`
  width: 100%;
  height: 7px;
  border: 0;
  background-color: #f1f3f7;
`;
