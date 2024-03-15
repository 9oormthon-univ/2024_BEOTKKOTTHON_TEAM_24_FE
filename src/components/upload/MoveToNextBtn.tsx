import styled from 'styled-components';

type Props = {
  title: string,
  onClick: React.MouseEventHandler<HTMLDivElement>,
  width: string,
  height: string,
  fontSize: string,
  background: string,
}

const MoveToNextBtn = (props: Props) => {
  const { title, onClick, width, height, fontSize, background} = props;
  return (
    <>
    <div onClick={onClick}>
      <OutLay width={width} height={height} fontSize={fontSize} background={background}>
        {title}
      </OutLay>
    </div>
    </>
  )
}

export default MoveToNextBtn;

const OutLay = styled.div<{width: string, height: string, fontSize: string, background: string}>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: ${(props) => props.fontSize};
  display: flex;
  align-items: center;
  justify-content: center;
`;