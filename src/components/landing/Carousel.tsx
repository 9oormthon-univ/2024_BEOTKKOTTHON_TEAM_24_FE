import { useMotionValue, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

type Props = {
  Slides: JSX.Element[];
  indicatorMargin: number; // px 없이 수치만
};

const DRAG_BUFFER = 50; // 페이지 이동을 유발하는 드래그 길이

// 애니메이션 설정
const SPRING_OPTIONS = {
  type: 'spring',
  mass: 3,
  stiffness: 400,
  damping: 50,
};

const Carousel = (props: Props) => {
  const [page, setPage] = useState(0);
  const dragX = useMotionValue(0);
  const [width, setWidth] = useState<number>(0);

  // 마우스 드래그를 통한 슬라이드 이동 함수
  const onDragEnd = () => {
    const x = dragX.get();

    x <= -DRAG_BUFFER &&
      page < props.Slides.length - 1 &&
      setPage((point) => point + 1);
    x >= DRAG_BUFFER && page > 0 && setPage((point) => point - 1);
  };

  useEffect(() => {
    const maxWidth =
      document.documentElement.clientWidth < 480
        ? document.documentElement.clientWidth
        : 480;
    setWidth(maxWidth);
  }, []);

  return (
    <>
      <Wrapper width={width}>
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          style={{
            x: dragX,
            width: props.Slides.length * width,
            marginBottom: props.indicatorMargin,
          }}
          animate={{ translateX: `-${page * width}px` }}
          transition={SPRING_OPTIONS}
          onDragEnd={onDragEnd}
          className="container"
        >
          {props.Slides.map((slide, idx) => {
            return (
              <div key={idx} className="slideBg">
                <motion.div key={idx} transition={SPRING_OPTIONS}>
                  {slide}
                </motion.div>
              </div>
            );
          })}
        </motion.div>
        <PageIndicator>
          {props.Slides.map((_, idx) => {
            return (
              <PageBtn
                key={idx}
                className={page === idx ? 'current' : ''}
                onClick={() => setPage(idx)}
              />
            );
          })}
        </PageIndicator>
      </Wrapper>
    </>
  );
};

export default Carousel;

interface CSSProps {
  width: number;
}

const Wrapper = styled.div<CSSProps>`
  width: ${(props) => props.width}px;
  overflow: hidden;
  .container {
    display: flex;
    align-items: center;
    justify-content: start;
    overflow: hidden;
  }
  .slideBg {
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${(props) => props.width}px;
    overflow: hidden;
  }
`;

const PageIndicator = styled.div`
  display: flex;
  /* align-items: center; */
  justify-content: center;
  gap: 6px;
  .current {
    width: 16px;
    height: 6px;
    border-radius: 20px;
    background: ${(props) => props.theme.palette.primary[500]};
  }
`;

const PageBtn = styled.button`
  width: 6px;
  height: 6px;
  border-radius: 20px;
  border: none;
  background: ${(props) => props.theme.palette.neutral[200]};
`;
