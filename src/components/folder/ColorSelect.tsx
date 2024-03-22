import styled from 'styled-components';
import CheckIcon from '@svg/folder/circle-with-check-icon.svg';

interface Props {
  color: string,
  code?: string,
  newFolder : {
    folderColor: string,
    folderName: string,
  }
  onClick: () => void;
}

const ColorSelect = (props: Props) => {
  return (
    <Wrapper>
      <div className="container" key={props.color} onClick={props.onClick}>
        <Color
          className={props.newFolder.folderColor === props.color ? 'selected' : ''}
          color={props.code}
        />
        <CheckIcon
          className={
            props.newFolder.folderColor !== props.color ? 'unvisible' : 'check-icon'
          }
        />
      </div>
    </Wrapper>
  );
};

export default ColorSelect;

const Wrapper = styled.div`
  .container {
    position: relative;
  }
  .selected {
    border: 2px solid var(--Primary-500, #3184ff);
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
`;
