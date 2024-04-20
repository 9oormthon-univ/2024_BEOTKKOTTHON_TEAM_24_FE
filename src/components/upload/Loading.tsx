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
  color: #3184ff;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  line-height: 140%;
  margin-top: 22px;
`;

const LoadingContent = styled.div`
  color: #1f1f1f;
  width: 179px;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  white-space: wrap;
  word-break: keep-all;
  margin-top: 14px;
`;

export default Loading;
