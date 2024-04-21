interface Props {
  setIsAddingTag: (value: boolean) => void;
}

export default function AddTagIcon(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => props.setIsAddingTag(true)}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M7.84473 1.42969V14.5703"
        stroke="#565656"
        stroke-width="1.8125"
        stroke-linecap="round"
      />
      <path
        d="M14.6416 7.77344L1.50098 7.77344"
        stroke="#565656"
        stroke-width="1.8125"
        stroke-linecap="round"
      />
    </svg>
  );
}
