import { NextPage } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { colorDecoder } from '@/utils/folder';
import NavigationLayout from '@/components/common/NavigationLayout';
import SearchSection from '@/components/common/SearchSection';
import { useGetFolder } from '@/hooks/api/useFolder';
import Header from '@/components/common/Header';

interface Props {}

const Folder: NextPage<Props> = ({}) => {
  const { data } = useGetFolder();
  const router = useRouter();
  const renderFolderList = () => {
    return (
      <div className="list-container">
        {data?.map((folder) => (
          <>
            <IconContainer
              onClick={() =>
                router.push(
                  {
                    pathname: `/folder/${folder.folderId}`,
                    query: {
                      name: folder.folderName,
                      id: folder.folderId,
                    },
                  },
                  `/folder/${folder.folderId}`,
                )
              }
            >
              {colorDecoder(folder.folderColor, 'big')}
              <span className="name">{folder.folderName}</span>
              <span className="count">{folder.insightCount}</span>
            </IconContainer>
          </>
        ))}
      </div>
    );
  };
  return (
    <>
      <NavigationLayout>
        <Wrapper>
          <Header
            title="폴더"
            isGoingBack={false}
            rightText="편집"
            onClick={() => router.push('/folder/edit')}
          />
          <SearchSection
            onClick={() => router.push('/folder/search')}
            placeholder="인사이트 검색"
            top={20}
            bottom={20}
          />
          <FolderSection>
            <div className="header">
              <div>
                <span className="title-m">전체 폴더</span>
                <span>{data?.length}</span>
              </div>
              <span
                className="link"
                onClick={() => router.push('/folder/make')}
              >
                폴더 생성
              </span>
            </div>
            {renderFolderList()}
          </FolderSection>
        </Wrapper>
      </NavigationLayout>
    </>
  );
};

export default Folder;

const Wrapper = styled.div`
  height: 100vh;
  position: relative;
  justify-content: center;
`;

const FolderSection = styled.div`
  width: calc(100% - 40px);
  height: calc(100% - 240px);
  margin: auto;
  padding-top: 3px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title-m {
    color: ${({ theme }) => theme.palette.neutral[500]};
    text-align: center;
    ${({ theme }) => theme.typo.Body_18_B};
    height: 28px;
    padding-right: 6px;
  }
  .list-container {
    display: flex;
    justify-content: space-between;
    margin-top: 36px;
    padding-bottom: 100px;
    gap: 52px 23px;
    flex-flow: wrap;
  }
  .link {
    color: ${({ theme }) => theme.palette.primary[500]};
  }
`;

const IconContainer = styled.div`
  position: relative;
  .name {
    position: absolute;
    left: 15px;
    bottom: 31px;
    color: ${({ theme }) => theme.palette.neutral[500]};
    text-align: center;
    ${({ theme }) => theme.typo.Body_16_SB};
  }
  .count {
    left: 15px;
    bottom: 11px;
    position: absolute;
    color: ${({ theme }) => theme.palette.neutral[400]};
    ${({ theme }) => theme.typo.Caption_12_M};
  }
`;
