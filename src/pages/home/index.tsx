import { NextPage } from 'next';
import styled from 'styled-components';
import TitleSettingsPanel from '@/components/home/header/TitleSettingPanel';
import ReminderQuestionBox from '@/components/home/header/ReminderQuestionBox';
import ReminderCalender from '@/components/home/body/ReminderCalender';
// import BottomNavigation from '@/components/common/BottomNavigation';
import { QuestionGetResponse } from '@/types/reminder';
import Carousel from '@/components/landing/Carousel';
import { useRouter } from 'next/router';
import EmptyQuestionBox from '@/components/home/header/EmptyQuestionBox';
import NavigationLayout from '@/components/common/NavigationLayout';

export const questionData: QuestionGetResponse = {
  todayClear: false,
  ReminderQuestionList: [
    {
      reminderQuestion: '해당 인사이트를 어떻게 활용할 수 있을까요?',
      insightId: 23,
      reminderId: 18,
      insightTitle: 'UX/UI 디자인에 미드저니 58,000% 활용하기',
      insightMainImage: '/image/디자인2.jpg',
      insightTagList: ['AI', '미드저니'],
    },
    {
      reminderQuestion: '이 인사이트를 어떤 사람에게 추천해주고 싶나요?',
      insightId: 25,
      reminderId: 20,
      insightTitle: '디자인시스템에 모션 가이드 추가하는 방법',
      insightMainImage: '/image/디자인1.jpg',
      insightTagList: ['디자인', '퍼블리싱'],
    },
  ],
};

const Home: NextPage = () => {
  const router = useRouter();

  const onClick = () => {
    router.push('/reminder');
  };

  const renderInnerComponent = () => {
    const dataLength = questionData.ReminderQuestionList.length;
    if (dataLength === 0) {
      return <EmptyQuestionBox />;
    } else if (dataLength === 1) {
      return (
        <ReminderQuestionBox
          totalLength={questionData.ReminderQuestionList.length}
          reminderInfo={questionData.ReminderQuestionList[0]}
        />
      );
    } else {
      return (
        <div className="carousel">
          <Carousel
            Slides={questionData.ReminderQuestionList.map((value, index) => (
              <ReminderQuestionBox
                key={index}
                totalLength={questionData.ReminderQuestionList.length}
                reminderInfo={value}
              />
            ))}
            indicatorMargin={16}
          />
        </div>
      );
    }
  };

  return (
    <NavigationLayout>
      <Wrapper>
        <TitleSettingsPanel questionData={questionData} />
        <div onClick={onClick}>{renderInnerComponent()}</div>
        <HrLine />
        <ReminderCalender />
        {/* <BottomNavigation /> */}
      </Wrapper>
    </NavigationLayout>
  );
};

export default Home;

const Wrapper = styled.div`
  background-color: #ffffff;
  overflow-x: hidden;
  overflow-y: auto;

  .carousel {
    padding-bottom: 28px;
  }
`;

const HrLine = styled.hr`
  width: 100%;
  height: 7px;
  border: 0;
  background-color: #f1f3f7;
`;
