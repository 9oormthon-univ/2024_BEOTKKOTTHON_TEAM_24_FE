import styled from 'styled-components';
import { motion } from 'framer-motion';

type Props = {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  $isSelected: boolean;
};

const ToggleSlider = (props: Props) => {
  return (
    <>
      <Wrapper>
        <SlideContainer
          className="switch"
          data-ison={!props.$isSelected}
          onClick={props.onClick}
        >
          <motion.div className="handle" layout transition={spring} />
        </SlideContainer>
      </Wrapper>
    </>
  );
};

const spring = {
  type: 'spring',
  stiffness: 500,
  damping: 30,
};
export default ToggleSlider;

const Wrapper = styled.div`
  .switch {
    width: 51px;
    height: 31px;
    background: var(--Fills-Secondary, rgba(120, 120, 128, 0.16));
    display: flex;
    justify-content: flex-start;
    border-radius: 50px;
    cursor: pointer;
  }
  .switch[data-ison='false'] {
    justify-content: flex-end;
    background: ${({ theme }) => theme.palette.primary[500]};
  }
`;

const SlideContainer = styled.div`
  display: flex;
  width: 51px;
  height: 31px;
  position: relative;
  flex-shrink: 0;
  border-radius: 30px;
  align-items: center;
  line-height: 13px;
  .selected {
    background: var(--icon-color, #fff);
    box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.25);
    color: black;
  }
  .handle {
    width: 27px;
    height: 27px;
    flex-shrink: 0;
    margin: 0px 2px;
    border-radius: 30px;
    background: white;
    box-shadow:
      0px 3px 1px 0px rgba(0, 0, 0, 0.06),
      0px 3px 8px 0px rgba(0, 0, 0, 0.15),
      0px 0px 0px 1px rgba(0, 0, 0, 0.04);
  }
`;
