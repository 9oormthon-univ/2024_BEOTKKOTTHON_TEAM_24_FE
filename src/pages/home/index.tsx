import { NextPage } from 'next';
import styled from 'styled-components';
import TitleSettingsPanel from '@/components/home/header/TitleSettingPanel';
import ReminderQuestionBox from '@/components/home/header/ReminderQuestionBox';
import ReminderCalendar from '@/components/home/body/ReminderCalendar';
import Carousel from '@/components/landing/Carousel';
import { useRouter } from 'next/router';
import EmptyQuestionBox from '@/components/home/header/EmptyQuestionBox';
import NavigationLayout from '@/components/common/NavigationLayout';
import { useGetReminderQuestion } from '@/hooks/api/useReminder';

const Home: NextPage = () => {
  const router = useRouter();
  const { data, isSuccess } = useGetReminderQuestion();

  const onClick = () => {
    router.push('/reminder');
  };

  const renderInnerComponent = () => {
    const dataLength = data?.reminderQuestionList.length;
    if (dataLength === 0 || !isSuccess) {
      return <EmptyQuestionBox />;
    }
    if (dataLength === 1) {
      return (
        <ReminderQuestionBox
          totalLength={data.reminderQuestionList.length}
          reminderInfo={data.reminderQuestionList[0]}
        />
      );
    }
    return (
      <div className="carousel">
        <Carousel
          Slides={data.reminderQuestionList.map((value) => (
            <ReminderQuestionBox
              key={value.insightId}
              totalLength={data.reminderQuestionList.length}
              reminderInfo={value}
            />
          ))}
          indicatorMargin={16}
        />
      </div>
    );
  };

  return (
    <NavigationLayout>
      <Wrapper>
        {data && <TitleSettingsPanel questionData={data} />}
        <div onClick={onClick}>{renderInnerComponent()}</div>
        <HrLine />
        <ReminderCalendar />
      </Wrapper>
    </NavigationLayout>
  );
};

export default Home;

const Wrapper = styled.div`
  background-color: #fbfbfb;
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
