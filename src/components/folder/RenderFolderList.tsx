import { Folder, FolderPatchRequest } from '@/types/folder';
import { colorDecoder } from '@/utils/folder';
import { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';

interface Props {
  folderList: Folder[];
  newFolderList: Folder[];
  setNewFolderList: Dispatch<SetStateAction<Folder[]>>;
  handleModalOn: (folder: Folder) => void;
  editedFolderList: FolderPatchRequest[];
  setEditedFolderList: Dispatch<SetStateAction<FolderPatchRequest[]>>;
}

const RenderFolderList = (props: Props) => {
  const { folderList, handleModalOn, newFolderList, setNewFolderList, editedFolderList, setEditedFolderList } = props;
  const folderNameList = newFolderList.map((folder) => folder.folderName);

  const [editingFolder, setEditingFolder] = useState('');
  const [newFolderName, setNewFolderName] = useState('');
  const handleBlur = () => {
    setNewFolderName('');
    setEditingFolder('');
  };

  const checkEnter = (key: string, folder: Folder) => {
    if (key === 'Enter') handlePressEnter(folder);
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

  const handlePressEnter = (folder: Folder) => {
    if (checkInputValid(newFolderName)) {
      const newList = newFolderList;
      newList[newFolderList.indexOf(folder)] = {
        ...folder,
        folderName: newFolderName,
      };
      setNewFolderList(newList);
      setEditedFolderList([
        ...editedFolderList,
        {
          folderId: folder.folderId,
          folderName: newFolderName,
          folderColor: folder.folderColor,
        },
      ]);
    }
    handleBlur();
  };

  return (
    <>
      {folderList.map((folder, idx) => (
        <FolderRow key={idx}>
          {colorDecoder(folder.folderColor, 'small')}
          <div className="text-container">
            {editingFolder === folder.folderName ? (
              <Input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onKeyDownCapture={(e) => checkEnter(e.key, folder)}
                onBlur={handleBlur}
                placeholder={folder.folderName}
              />
            ) : (
              <span
                className="name text"
                onClick={() => setEditingFolder(folder.folderName)}
              >
                {folder.folderName}
              </span>
            )}
            <span className="edit text" onClick={() => handleModalOn(folder)}>
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
  .text {
    font-family: Pretendard;
    font-style: normal;
    line-height: 140%; /* 25.2px */
  }
  .name {
    color: var(--Neutral-500, #1f1f1f);

    font-size: 18px;
    font-weight: 700;
  }
  .edit {
    color: var(--Neutral-300, #848484);
    font-size: 16px;
    font-weight: 600;
  }
  span {
    min-width: 28px;
  }
`;

const Input = styled.input`
  border: none;
  outline: none;

  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px; /* 123.529% */
  letter-spacing: -0.32px;
`;
