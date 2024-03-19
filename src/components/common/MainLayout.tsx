import styled from 'styled-components';

const MainLayout = (props: { children: React.ReactNode }) => {
  return <Wrapper>{props.children}</Wrapper>;
};

const Wrapper = styled.div`
  position: relative;
  flex-direction: column;
  justify-content: center;
  max-width: 480px;
  align-items: center;
  margin: 0 auto;
  min-height: 100vh;
`;

export default MainLayout;
