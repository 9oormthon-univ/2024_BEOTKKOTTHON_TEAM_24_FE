import { FolderPatchRequest } from '@/types/folder';
import { colorDecoder } from '@/utils/folder';
import { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';

interface Props {
  folderList: FolderPatchRequest[];
  newFolderList: FolderPatchRequest[];
  setNewFolderList: Dispatch<SetStateAction<FolderPatchRequest[]>>;
  handleModalOn: (folder: FolderPatchRequest) => void;
  editedFolderIdList: number[];
  setEditedFolderIdList: Dispatch<SetStateAction<number[]>>;
}

const RenderFolderList = (props: Props) => {
  const {
    folderList,
    handleModalOn,
    newFolderList,
    setNewFolderList,
    editedFolderIdList,
    setEditedFolderIdList,
  } = props;
  const folderNameList = newFolderList.map((folder) => folder.folderName);

  const [editingFolder, setEditingFolder] = useState(-1);
  const [newFolderName, setNewFolderName] = useState('');
  const handleBlur = () => {
    setNewFolderName('');
    setEditingFolder(-1);
  };

  const checkInputValid = (input: string) => {
    const regex = /^[가-힣a-zA-Z]{2,15}$/;
    if (!regex.test(input)) {
      alert('폴더 명은 2글자 이상의 영문, 한글로 작성해주세요.');
      return false;
    }
    if (folderNameList.includes(input)) {
      alert('이미 같은 이름의 폴더가 존재합니다!');
      return false;
    }
    return true;
  };

  const handlePressEnter = (key: string, folder: FolderPatchRequest) => {
    if (key !== 'Enter') return;
    if (checkInputValid(newFolderName)) {
      setNewFolderList(
        newFolderList.with(newFolderList.indexOf(folder), {
          ...folder,
          folderName: newFolderName,
        }),
      );
      setEditedFolderIdList([...editedFolderIdList, Number(folder.folderId)]);
    }
    handleBlur();
  };

  return (
    <>
      {folderList.map((folder, idx) => (
        <FolderRow key={idx}>
          {colorDecoder(String(folder.folderColor), 'small')}
          <div className="text-container">
            {editingFolder === folder.folderId ? (
              <Input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onKeyDownCapture={(e) => handlePressEnter(e.key, folder)}
                onBlur={handleBlur}
                placeholder={folder.folderName}
              />
            ) : (
              <span
                className="name"
                onClick={() => setEditingFolder(folder.folderId)}
              >
                {folder.folderName}
              </span>
            )}
            <span className="edit" onClick={() => handleModalOn(folder)}>
              편집
            </span>
          </div>
        </FolderRow>
      ))}
    </>
  );
};

export default RenderFolderList;

const FolderRow = styled.div`
  display: flex;
  margin: auto;
  flex-direction: row;
  width: calc(100% - 40px);
  .text-container {
    width: calc(100% - 100px - 40px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 28px;
  }
  .name {
    color: ${({ theme }) => theme.palette.neutral[500]};
    ${({ theme }) => theme.typo.Body_18_B};
  }
  .edit {
    color: ${({ theme }) => theme.palette.neutral[300]};
    ${({ theme }) => theme.typo.Body_16_SB};
  }
  span {
    min-width: 28px;
  }
`;

const Input = styled.input`
  border: none;
  outline: none;

  ${({ theme }) => theme.typo.Body_18_B};
`;
