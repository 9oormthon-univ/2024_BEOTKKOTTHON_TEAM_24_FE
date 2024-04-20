interface Props {
  idx: number;
  handleDeleteTag: (value: number) => void;
}

export default function DeleteTagIcon(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => props.handleDeleteTag(props.idx)}
      className="delete-btn"
      width="19"
      height="20"
      viewBox="0 0 19 20"
      fill="none"
    >
      <path
        d="M13.5265 14.5091C11.0363 16.9992 6.99888 16.9992 4.5087 14.5091C2.01851 12.0189 2.01851 7.98149 4.5087 5.4913C6.99888 3.00112 11.0363 3.00112 13.5265 5.4913C16.0166 7.98149 16.0166 12.0189 13.5265 14.5091Z"
        fill="#848484"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.3432 7.6752C11.5068 7.83884 11.5068 8.10416 11.3432 8.2678L7.28518 12.3258C7.12154 12.4894 6.85623 12.4894 6.69258 12.3258C6.52894 12.1622 6.52894 11.8968 6.69258 11.7332L10.7506 7.6752C10.9142 7.51156 11.1795 7.51156 11.3432 7.6752Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.3434 12.3256C11.1797 12.4892 10.9144 12.4892 10.7508 12.3256L6.69276 8.2676C6.52912 8.10396 6.52912 7.83865 6.69276 7.67501C6.8564 7.51137 7.12172 7.51137 7.28536 7.67501L11.3434 11.733C11.507 11.8966 11.507 12.162 11.3434 12.3256Z"
        fill="white"
      />
    </svg>
  );
}
