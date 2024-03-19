import { NextPage } from 'next';
import styled from 'styled-components';
import TitleSettingsPanel from '@components/home/TitleSettingPanel';
import ReminderQuestionBox from '@components/home/ReminderQuestionBox';

const Home: NextPage = () => {
  return (
    <>
      <Wrapper>
        <TitleSettingsPanel />
        <ReminderQuestionBox />
      </Wrapper>
    </>
  );
};

export default Home;

const Wrapper = styled.div``;
