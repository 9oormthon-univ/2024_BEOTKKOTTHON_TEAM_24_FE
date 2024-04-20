import { NextPage } from 'next';
import styled from 'styled-components';
import TitleSettingsPanel from '@/components/home/header/TitleSettingPanel';
import ReminderQuestionBox from '@/components/home/header/ReminderQuestionBox';
import ReminderCalender from '@/components/home/body/ReminderCalender';
import Carousel from '@/components/landing/Carousel';
import { useRouter } from 'next/router';
import EmptyQuestionBox from '@/components/home/header/EmptyQuestionBox';
import NavigationLayout from '@/components/common/NavigationLayout';
import { questionData } from '@/constants/data';

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
