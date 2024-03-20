import { NextPage } from 'next';
import { useState } from 'react';
import styled from 'styled-components';
import TitleSettingsPanel from '@/components/home/header/TitleSettingPanel';
import EmptyQuestionBox from '@/components/home/header/EmptyQuestionBox';
import ReminderQuestionBox from '@/components/home/header/ReminderQuestionBox';
import ReminderCalender from '@/components/home/body/ReminderCalender';
import BottomNavigation from '@/components/common/BottomNavigation';

const Home: NextPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [remind, setRemind] = useState<boolean>(false);

  return (
    <>
      <Wrapper>
        <TitleSettingsPanel />
        {remind ? <ReminderQuestionBox /> : <EmptyQuestionBox />}
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
