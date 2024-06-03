import Pencil from '@svg/pencil-icon.svg';
import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';

interface Props {
  top?: number;
  bottom?: number;
  titleTypo?: 'small' | 'big';
  title?: string;
  reminder?: boolean;
  counter?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

// TODO: reminder 페이지 적용 및 컴포넌트 수정
const OptionalTextarea = (props: Props) => {
  const reminder = props.reminder || false;
  const counter = props.counter || false;
  const textareaProps = {
    className: reminder ? 'reminder' : 'upload',
    placeholder: props.placeholder,
    maxLength: 500,
    onChange: props.onChange,
    value: props.value,
  };

  return (
    <Wrapper top={props.top} bottom={props.bottom} counter={counter}>
      {!reminder && <Title className={props.titleTypo}>{props.title}</Title>}
      <div className="textarea-box">
        {reminder && <Pencil />}
        {counter ? (
          <textarea {...textareaProps} />
        ) : (
          <TextareaAutosize cacheMeasurements {...textareaProps} />
        )}
        {counter && <Counter>{props.value.length}/500자</Counter>}
      </div>
    </Wrapper>
  );
};

export default OptionalTextarea;

type WrapperProps = {
  top?: number;
  bottom?: number;
  counter: boolean;
};

const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  flex: ${(props) => (props.counter ? 1 : 0)};
  margin: ${(props) => props.top || 0}px 0 ${(props) => props.bottom || 0}px;
  box-sizing: content-box;
  display: flex;
  flex-direction: column;

  .textarea-box {
    width: 100%;
    height: 100%;
    position: relative;
  }

  textarea {
    ${({ theme }) => theme.typo.Body_14_M};
  }

  .reminder {
    flex: 1;
    margin: 20px;
    border-radius: 13px;
    padding: 60px 18px 47px;
    box-shadow: 9px 9px 30px 0px #00000014;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
  }

  .upload {
    height: 100%;
    width: 100%;
    min-height: 50px;
    border: none;
    outline: none;
    padding: 14px 16px ${(props) => (props.counter ? '30px' : '14px')};
    background: ${(props) => props.theme.palette.neutral[100]};
    color: #161616;
    border-radius: 8px;
    resize: none;
    flex: 1;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Title = styled.div`
  width: 100%;
  margin-bottom: 10px;
  left: 0;

  &.small {
    ${({ theme }) => theme.typo.Body_14_M};
  }

  &.big {
    ${({ theme }) => theme.typo.Body_16_SB};
  }
`;

const Counter = styled.p`
  position: absolute;
  right: 16px;
  bottom: 16px;
  text-align: right;
  ${({ theme }) => theme.typo.Caption_12_M};
  color: ${(props) => props.theme.palette.neutral[200]};
`;
