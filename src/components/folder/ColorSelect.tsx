import styled from 'styled-components';
import CheckIcon from '@svg/folder/circle-with-check-icon.svg';

interface Props {
  color: string;
  code?: string;
  currentColor: string;
  onClick: () => void;
}

const ColorSelect = (props: Props) => {
  const { color, code, currentColor, onClick } = props;
  return (
    <Wrapper>
      <div className="container" key={color} onClick={onClick}>
        <Color
          className={`${currentColor === color && 'selected'}`}
          color={code}
        />
        <CheckIcon
          className={currentColor !== color ? 'invisible' : 'check-icon'}
        />
      </div>
    </Wrapper>
  );
};

export default ColorSelect;

const Wrapper = styled.div`
  max-height: 66px;
  .container {
    position: relative;
    max-height: 66px;
  }
  .unvisible {
    display: none;
  }
  .check-icon {
    position: absolute;
    top: -20px;
    right: -20px;
  }
`;

const Color = styled.div`
  width: 66px;
  height: 66px;
  flex-shrink: 0;
  border-radius: 8px;
  background-color: ${(props) => props.color};
  .selected {
    border: 2px solid var(--Primary-500, #3184ff);
  }
`;
