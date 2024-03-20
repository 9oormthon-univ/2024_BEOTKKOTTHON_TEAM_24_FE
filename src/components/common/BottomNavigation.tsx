import styled from 'styled-components';
import { useRouter } from 'next/router';
import PlusIcon from '@svg/nav-plus-icon.svg';
import HomeIcon from '@svg/nav-home-icon.svg';
import FolderIcon from '@svg/nav-folder-icon.svg';

const BottomNavigation = () => {
  const router = useRouter();

  return (
    <Wrapper>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 393 124"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <PlusIcon onClick={() => router.push('/upload')} />
        <g filter="url(#filter0_d_512_6560)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M175.987 49.9285C168.584 41.9003 160.243 32 149.323 32H20C8.95431 32 0 40.9543 0 52V118.5H393V52C393 40.9543 384.046 32 373 32H249.677C238.757 32 230.416 41.9003 223.013 49.9285C217.419 55.9955 208.963 59.5 199.5 59.5C190.037 59.5 181.581 55.9955 175.987 49.9285Z"
            fill="white"
          />
        </g>
        <HomeIcon onClick={() => router.push('/home')} />
        <FolderIcon onClick={() => router.push('/folder')} />
        <defs>
          <filter
            id="filter0_d_512_6560"
            x="-15"
            y="7"
            width="423"
            height="116.5"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="-10" />
            <feGaussianBlur stdDeviation="7.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.342139 0 0 0 0 0.33618 0 0 0 0 0.33618 0 0 0 0.1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_512_6560"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_512_6560"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: sticky;
  left: 0;
  bottom: 0;
  width: 100%;
`;

export default BottomNavigation;
