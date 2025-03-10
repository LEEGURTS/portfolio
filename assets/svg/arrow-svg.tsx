interface ArrowSVGProps {
  rotate?: number;
}

const ArrowSVG = ({ rotate }: ArrowSVGProps) => {
  return (
    <svg
      width="14"
      height="24"
      viewBox="0 0 7 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${rotate ?? 0}deg)` }}
    >
      <path
        d="M6 1L1 6L6 11"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowSVG;
