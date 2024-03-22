import { NextPage } from 'next';
import styled from 'styled-components';
import NavigationLayout from '@/components/common/NavigationLayout';

const Folder: NextPage = () => {
  return (
    <NavigationLayout>
      <Wrapper></Wrapper>
    </NavigationLayout>
  );
};

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default Folder;
