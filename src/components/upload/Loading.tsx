import Image from 'next/image';
import styled from 'styled-components';
import loadingGIF from '../../../public/loading.gif';
import { loadingBlurURL } from '@/constants/loadingBlurURL';

const Loading = () => {
  return (
    <LoadingWrapper>
      <Image
        src={loadingGIF}
        alt="loading"
        placeholder="blur"
        blurDataURL={loadingBlurURL}
        width={192}
        height={192}
      />
      <LoadingTitle>인사이트 정리중 ••</LoadingTitle>
      <LoadingContent>
        쉽게 리마인드 할 수 있도록 인사이트를 정리하고 있어요!
      </LoadingContent>
    </LoadingWrapper>
  );
};

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoadingTitle = styled.div`
  color: ${(props) => props.theme.palette.primary[500]};
  text-align: center;
  ${({ theme }) => theme.typo.Head_20_B};
  margin-top: 22px;
`;

const LoadingContent = styled.div`
  color: ${(props) => props.theme.palette.neutral[500]};
  width: 179px;
  text-align: center;
  ${({ theme }) => theme.typo.Body_16_SB};
  white-space: wrap;
  word-break: keep-all;
  margin-top: 14px;
`;

export default Loading;
