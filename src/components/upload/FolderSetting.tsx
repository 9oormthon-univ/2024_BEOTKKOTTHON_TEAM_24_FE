import styled from 'styled-components';
import RightIcon from '@svg/upload/right-arrow-icon.svg';

interface Props {
  folderName: string;
  setIsModal: (value: string) => void;
}

const FolderSetting = (props: Props) => {
  return (
    <Wrapper>
      <p>폴더 설정</p>
      <FolderIndicator>
        {props.folderName}
        <ChangeFolderBtn onClick={() => props.setIsModal('folder')}>
          <span>폴더 설정</span>
          <RightIcon />
        </ChangeFolderBtn>
      </FolderIndicator>
    </Wrapper>
  );
};

export default FolderSetting;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  position: relative;
  width: 100%;

  p {
    margin-bottom: 8px;
    ${({ theme }) => theme.typo.Body_14_M};
  }
`;

const FolderIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 14px 16px;
  align-items: flex-end;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.palette.neutral[100]};
`;

const ChangeFolderBtn = styled.div`
  display: flex;
  align-items: center;
  color: #7f7f7f;
  text-align: center;
  ${({ theme }) => theme.typo.Body_16_M};
  cursor: pointer;

  span {
    margin-right: 8px;
  }
`;
