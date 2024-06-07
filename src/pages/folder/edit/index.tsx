import Header from '@/components/common/Header';
import { NextPage } from 'next';
import styled from 'styled-components';
import { useState } from 'react';
import { FolderPatchRequest } from '@/types/folder';
import EditModal from '@/components/folder/EditModal';
import SearchSection from '@/components/common/SearchSection';
import { useGetFolder, usePatchFolder } from '@/hooks/api/useFolder';
import RenderFolderList from '@/components/folder/edit/RenderFolderList';
import { useRouter } from 'next/router';

interface Props {}

const FolderEdit: NextPage<Props> = ({}) => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState('');
  const { data } = useGetFolder();
  const { mutate, error } = usePatchFolder();

  const [newFolderList, setNewFolderList] = useState<FolderPatchRequest[]>(
    data
      ? data.map(({ folderId, folderColor, folderName }) => ({
          ...{ folderId, folderColor, folderName },
        }))
      : [],
  );
  const [searchedFolderList, setSearchedFolderList] = useState<
    FolderPatchRequest[]
  >([]);
  const [targetFolder, setTargetFolder] = useState<FolderPatchRequest>(
    newFolderList[0],
  );
  const [editedFolderIdList, setEditedFolderIdList] = useState<number[]>([]);
  const [isModalOn, setIsModalOn] = useState(false);

  const handleSearch = (value: string) => {
    setSearchInput(value);
    setSearchedFolderList(
      newFolderList.filter((folder) => folder.folderName?.includes(value)),
    );
  };

  const handleModalOn = (folder: FolderPatchRequest) => {
    setTargetFolder(folder);
    setIsModalOn(true);
  };

  const handleSaveFolders = () => {
    const editedFolderList = newFolderList.filter((folder) =>
      editedFolderIdList.includes(folder.folderId),
    );
    const saveRequests = editedFolderList.map((folder) => mutate(folder));
    Promise.all(saveRequests).then(() => {
      alert('변경된 폴더 리스트가 저장되었습니다.');
      router.push('/folder');
    });
    if (error) {
      alert('폴더 저장에 실패하였습니다. 다시 시도해주세요');
    }
  };
  return (
    <>
      <Wrapper>
        <Header title="폴더 편집하기" />
        <span className="link save" onClick={() => handleSaveFolders()}>
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
          <RenderFolderList
            folderList={searchInput === '' ? newFolderList : searchedFolderList}
            handleModalOn={handleModalOn}
            newFolderList={newFolderList}
            setNewFolderList={setNewFolderList}
            editedFolderIdList={editedFolderIdList}
            setEditedFolderIdList={setEditedFolderIdList}
          />
        </FolderSection>
        {isModalOn && (
          <EditModal
            type="edit"
            targetFolder={targetFolder}
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
    color: ${({ theme }) => theme.palette.neutral[500]};
    text-align: center;
    ${({ theme }) => theme.typo.Head_20_B};
    height: 28px;
  }
  .link {
    color: ${({ theme }) => theme.palette.primary[500]};
    text-align: right;
    ${({ theme }) => theme.typo.Body_16_SB};
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
