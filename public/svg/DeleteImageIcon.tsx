interface Props {
  idx: number;
  onClick: (value: number) => void;
}

export default function DeleteImageIcon(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => props.onClick(props.idx)}
      style={{
        position: 'absolute',
        right: '7px',
        top: '7px',
        cursor: 'pointer',
      }}
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
    >
      <path
        d="M13.5265 13.5266C11.0363 16.0168 6.99888 16.0168 4.5087 13.5266C2.01851 11.0365 2.01851 6.99907 4.5087 4.50888C6.99888 2.01869 11.0363 2.01869 13.5265 4.50888C16.0166 6.99907 16.0166 11.0365 13.5265 13.5266Z"
        fill="#2B2B2B"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.3432 6.69278C11.5068 6.85642 11.5068 7.12174 11.3432 7.28538L7.28518 11.3434C7.12154 11.507 6.85623 11.507 6.69258 11.3434C6.52894 11.1797 6.52894 10.9144 6.69258 10.7508L10.7506 6.69278C10.9142 6.52914 11.1795 6.52914 11.3432 6.69278Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.3443 11.3432C11.1807 11.5068 10.9154 11.5068 10.7517 11.3432L6.69374 7.28518C6.5301 7.12154 6.5301 6.85622 6.69374 6.69258C6.85738 6.52894 7.12269 6.52894 7.28634 6.69258L11.3443 10.7506C11.508 10.9142 11.508 11.1795 11.3443 11.3432Z"
        fill="white"
      />
    </svg>
  );
}
