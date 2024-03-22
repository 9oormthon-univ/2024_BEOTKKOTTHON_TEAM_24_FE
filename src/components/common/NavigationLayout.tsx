import BottomNavigation from './BottomNavigation';
import styled from 'styled-components';

const NavigationLayout = (props: { children: React.ReactNode }) => {
  return (
    <Wrapper>
      {props.children}
      <BottomNavigation />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
`;

export default NavigationLayout;
