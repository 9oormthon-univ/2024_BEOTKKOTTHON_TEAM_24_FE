import Header from '@/components/common/Header';
import { COLORLIST } from '@/constants/colors';
import { NextPage } from 'next';
import { useState } from 'react';
import styled from 'styled-components';
import ColorSelect from '@/components/folder/ColorSelect';
import BottomBtn from '@/components/common/BottomBtn';
import { usePostFolder } from '@/hooks/api/useFolder';
import { FolderPostRequest } from '@/types/folder';
import { useRouter } from 'next/router';

interface Props {}

const FolderMake: NextPage<Props> = ({}) => {
  const router = useRouter();
  const [newFolder, setNewFolder] = useState<FolderPostRequest>({
    folderName: '',
    folderColor: 'BLUE',
  });
  const [isValidName, setIsValidName] = useState(true);
  const { mutate, error } = usePostFolder();

  const handleInput = (value: string) => {
    const regex = /^[가-힣a-zA-Z]{2,15}$/;
    setNewFolder({ ...newFolder, folderName: value });
    setIsValidName(regex.test(value));
  };

  const handlePostFolder = () => {
    mutate(newFolder);
    if (error) {
      alert('폴더 생성에 실패했습니다. 다시 시도해주세요.');
    }
    router.push('/folder');
  };
  return (
    <>
      <Wrapper>
        <Header title="폴더 생성하기" />
        <PageInner>
          <TitleSection>
            <SubTitle>폴더명</SubTitle>
            <Input
              type="text"
              value={newFolder.folderName}
              onChange={(e) => handleInput(e.target.value)}
              placeholder="폴더명을 입력해 주세요."
            />
            <ValidateText className={isValidName ? '' : 'error'}>
              {newFolder.folderName.length > 15
                ? '15자 이내로 작성해주세요.'
                : '*2글자 이상의 한글 혹은 영문으로 작성해주세요.'}
            </ValidateText>
          </TitleSection>
          <ColorSection>
            <SubTitle>폴더 색상</SubTitle>
            <div className="list">
              {COLORLIST.map((color: { color: string; code: string }) => (
                <ColorSelect
                  key={color.color}
                  color={color.color}
                  code={color.code}
                  currentColor={newFolder.folderColor}
                  onClick={() =>
                    setNewFolder({ ...newFolder, folderColor: color.color })
                  }
                />
              ))}
            </div>
          </ColorSection>
        </PageInner>
        <div onClick={handlePostFolder}>
          <BottomBtn
            text="완료"
            state={
              newFolder.folderName && isValidName ? 'activated' : 'disabled'
            }
          />
        </div>
      </Wrapper>
    </>
  );
};

export default FolderMake;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: ${({ theme }) => theme.palette.system.background};
  position: relative;
  justify-content: center;
  > :last-child {
    margin-bottom: 36px;
  }
`;

const PageInner = styled.div`
  flex: 1;
`;

const TitleSection = styled.div`
  display: flex;
  width: calc(100% - 40px);
  margin: 20px auto;
  flex-direction: column;
  gap: 10px;
  .error {
    color: ${({ theme }) => theme.palette.system.warning};
  }
  input::placeholder {
    color: ${({ theme }) => theme.palette.neutral[200]};
  }
`;

const SubTitle = styled.div`
  margin-bottom: 8px;
  color: ${({ theme }) => theme.palette.neutral[500]};
  ${({ theme }) => theme.typo.Head_20_M};
`;

const Input = styled.input`
  width: 100%;
  margin: auto;
  height: 51px;
  ${({ theme }) => theme.typo.Body_18_R};
  border: none;
  outline: none;
  padding: 10px;
  border-radius: 8.235px;
  background: ${({ theme }) => theme.palette.neutral[100]};
  color: black;
`;

const ValidateText = styled.div`
  margin-top: 14px;
  color: ${({ theme }) => theme.palette.neutral[200]};
  ${({ theme }) => theme.typo.Body_14_M};
`;

const ColorSection = styled.div`
  width: calc(100% - 40px);
  margin: 36px auto;
  display: flex;
  flex-direction: column;
  .list {
    width: 100%;
    display: flex;
    flex-flow: wrap;
    margin-top: 36px;
    gap: 29px;
  }
`;
