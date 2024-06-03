import styled from 'styled-components';
import SearchIcon from '@svg/search-icon.svg';

interface Props {
  top?: number;
  bottom?: number;
  autoFocus?: boolean;
  placeholder: string;
  value?: string;
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchSection = (props: Props) => {
  const autoFocus = props.autoFocus || false;
  return (
    <Wrapper top={props.top} bottom={props.bottom} onClick={props.onClick}>
      <SearchIcon />
      <SearchInput
        value={props.value}
        placeholder={props.placeholder}
        autoFocus={autoFocus}
        onChange={props.onChange}
      />
    </Wrapper>
  );
};

type WrapperProps = {
  top?: number;
  bottom?: number;
};

const Wrapper = styled.div<WrapperProps>`
  height: 42px;
  display: flex;
  width: calc(100% - 40px);
  margin: ${(props) => props.top || 0}px auto ${(props) => props.bottom || 0}px;
  padding: 10px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  background: ${(props) => props.theme.palette.neutral[100]};
`;

const SearchInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  ${({ theme }) => theme.typo.Body_16_SB};

  background: ${(props) => props.theme.palette.neutral[100]};
`;

export default SearchSection;
