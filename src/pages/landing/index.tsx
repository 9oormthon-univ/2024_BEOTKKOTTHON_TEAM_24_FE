import BottomBtn from '@/components/common/BottomBtn';
import Carousel from '@/components/landing/Carousel';
import { CarouselSlides } from '@/components/landing/CarouselSlides';
import { NextPage } from 'next';
import styled from 'styled-components';

interface Props {}

const Landing: NextPage<Props> = ({}) => {
  return (
    <>
      <Wrapper>
        <div className="carousel-container">
          <Carousel Slides={CarouselSlides} indicatorMargin={10} />
        </div>
        <BottomBtn text="로그인" state="activated" nextUrl="/signin" />
        <BottomBtn text="회원가입" state="borderline" nextUrl="/signup" />
      </Wrapper>
    </>
  );
};

export default Landing;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  .no-scroll::-webkit-scrollbar {
    display: none;
  }

  .carousel-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    height: 100%;
  }

  :nth-child(2) {
    margin-bottom: 16px;
  }

  :nth-child(3) {
    margin-bottom: 36px;
  }
`;
