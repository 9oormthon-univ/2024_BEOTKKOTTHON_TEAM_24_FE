import { NextPage } from 'next';
import styled from 'styled-components';
import TitleSettingsPanel from '@/components/home/header/TitleSettingPanel';
// import EmptyQuestionBox from '@/components/home/header/EmptyQuestionBox';
import ReminderQuestionBox from '@/components/home/header/ReminderQuestionBox';
import ReminderCalender from '@/components/home/body/ReminderCalender';
import BottomNavigation from '@/components/common/BottomNavigation';
import { QuestionGetResponse } from '@/types/reminder';
import Carousel from '@/components/landing/Carousel';

export const questionData: QuestionGetResponse = {
  todayClear: false,
  ReminderQuestionList: [
    {
      reminderQuestion: '해당 인사이트를 어떻게 활용할 수 있을까요?',
      insightId: 23,
      reminderId: 18,
      insightTitle: 'UX/UI 디자인에 미드저니 58,000% 활용하기',
      insightMainImage: 'src/resources/static/1891288.png',
      insightTagList: ['AI', '미드저니'],
    },
    {
      reminderQuestion: '...',
      insightId: 25,
      reminderId: 20,
      insightTitle: '...?',
      insightMainImage: 'src/resources/static/1891280.png',
      insightTagList: ['디자인', '퍼블리싱'],
    },
  ],
};

const Home: NextPage = () => {
  return (
    <>
      <Wrapper>
        <TitleSettingsPanel questionData={questionData} />
        <Carousel
          Slides={[
            <ReminderQuestionBox key={1} />,
            <ReminderQuestionBox key={2} />,
            <ReminderQuestionBox key={3} />,
          ]}
        />
        {/* {questionData.ReminderQuestionList.length ? (
          <ReminderQuestionBox />
        ) : (
          <EmptyQuestionBox />
        )} */}
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
