import styled from 'styled-components';

type Props = {
  title: string,
  onClick: React.MouseEventHandler<HTMLDivElement>,
  width: string,
  height: string,
  fontSize: string,
  background: string,
  isDisabled: boolean,
}

const MoveToNextBtn = (props: Props) => {
  const { title, onClick, width, height, fontSize, background, isDisabled} = props;
  return (
    <>
    {isDisabled ? <Disabled width={width} height={height} fontSize={fontSize}>{title}</Disabled> :
    <div onClick={onClick}>
      <OutLay width={width} height={height} fontSize={fontSize} background={background}>
        {title}
      </OutLay>
    </div>
    }
    </>
  )
}

export default MoveToNextBtn;

const OutLay = styled.div<{width: string, height: string, fontSize: string, background: string}>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: ${(props) => props.fontSize};
  background: ${(props) => props.background};
  border-radius: 13px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Disabled = styled.div<{width: string, height: string, fontSize: string}>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: ${(props) => props.fontSize};
  border-radius: 13px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #878787;
`;