import { NextPage } from 'next';
import styled from 'styled-components';
import BottomNavigation from '@/components/common/BottomNavigation';

const Folder: NextPage = () => {
  return (
    <Wrapper>
      <div></div>
      <BottomNavigation />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #fbfbfb;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default Folder;
