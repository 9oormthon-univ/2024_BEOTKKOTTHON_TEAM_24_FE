import Header from '@/components/common/Header';
import { NextPage } from 'next';
import styled from 'styled-components';
import { FolderList } from '@/constants/FolderList';
import { colorDecoder } from '@/utils/folder';
import { useState } from 'react';
import { Folder } from '@/types/folder';
import EditModal from '@/components/folder/EditModal';
import { useRouter } from 'next/router';
import SearchSection from '@/components/common/SearchSection';

interface Props {}

const FolderEdit: NextPage<Props> = ({}) => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState('');
  const [newFolderList, setNewFolderList] = useState<Folder[]>(FolderList);
  const [searchedFolderList, setSearchedFolderList] = useState<Folder[]>([]);
  const folderNameList = newFolderList.map((folder) => folder.folderName);
  const [isEditingFolder, setIsEditingFolder] = useState('');
  const [targetFolder, setTargetFolder] = useState<Folder>(newFolderList[0]);
  const [newFolderName, setNewFolderName] = useState('');
  const [isModalOn, setIsModalOn] = useState(false);

  const handleSearch = (value: string) => {
    setSearchInput(value);
    setSearchedFolderList(
      newFolderList.filter((folder) => folder.folderName.includes(value)),
    );
  };

  const handleBlur = () => {
    setNewFolderName('');
    setIsEditingFolder('');
  };

  const checkEnter = (key: string, folder: Folder) => {
    if (key === 'Enter') {
      if (folderNameList.includes(newFolderName)) {
        alert('이미 같은 이름의 폴더가 존재합니다!');
        handleBlur();
        return;
      }
      const newList = newFolderList;
      newList[newFolderList.indexOf(folder)] = {
        ...folder,
        folderName: newFolderName,
      };
      setNewFolderList(newList);
      setNewFolderName('');
      setIsEditingFolder('');
    }
  };

  const handleModalOn = (folder: Folder) => {
    setTargetFolder(folder);
    setIsModalOn(true);
  };

  const handleColorChange = () => {
    router.push(
      {
        pathname: '/folder/edit-color',
        query: {
          folderId: targetFolder.folderId,
          folderName: targetFolder.folderName,
          folderColor: targetFolder.folderColor,
          insightCount: targetFolder.insightCount,
        },
      },
      '/folder/edit-color',
    );
  };

  const handleDelete = () => {
    router.push(
      {
        pathname: '/folder/delete',
        query: {
          folderId: targetFolder.folderId,
        },
      },
      '/folder/delete',
    );
  };

  const saveFolder = () => {};
  return (
    <>
      <Wrapper>
        <Header title="폴더 편집하기" />
        <span className="link save" onClick={() => saveFolder()}>
          저장
        </span>
        <SearchSection
          value={searchInput}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="폴더 검색"
          top={20}
          bottom={20}
        />
        <FolderSection>
          {searchInput === '' &&
            newFolderList.map((folder, idx) => (
              <FolderRow key={idx}>
                {colorDecoder(folder.folderColor, 'small')}
                <div className="text-container">
                  {isEditingFolder === folder.folderName ? (
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
                      onClick={() => setIsEditingFolder(folder.folderName)}
                    >
                      {folder.folderName}
                    </span>
                  )}
                  <span
                    className="edit text"
                    onClick={() => handleModalOn(folder)}
                  >
                    편집
                  </span>
                </div>
              </FolderRow>
            ))}
          {searchInput !== '' &&
            searchedFolderList.map((folder, idx) => (
              <FolderRow key={idx}>
                {colorDecoder(folder.folderColor, 'small')}
                <div className="text-container">
                  {isEditingFolder === folder.folderName ? (
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
                      onClick={() => setIsEditingFolder(folder.folderName)}
                    >
                      {folder.folderName}
                    </span>
                  )}
                  <span
                    className="edit text"
                    onClick={() => handleModalOn(folder)}
                  >
                    편집
                  </span>
                </div>
              </FolderRow>
            ))}
        </FolderSection>
        {isModalOn && (
          <EditModal
            type="edit"
            onClick1={() => handleColorChange()}
            onClick2={() => handleDelete()}
            onClose={() => setIsModalOn(false)}
          />
        )}
      </Wrapper>
    </>
  );
};

export default FolderEdit;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  justify-content: center;
  .title {
    color: #1f1f1f;
    text-align: center;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 27.146px; /* 135.732% */
    height: 28px;
  }
  .link {
    color: var(--Primary-500, #3184ff);
    text-align: right;
    /* Body-16-SB */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 22.4px */
  }
  .save {
    position: absolute;
    top: 20px;
    right: 20px;
  }
`;

const FolderSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 17px;
`;

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
