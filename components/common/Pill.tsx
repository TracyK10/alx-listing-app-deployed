interface PillProps {
  label: string;
  onClick?: () => void;
}

const Pill = ({ label, onClick }: PillProps) => (
  <button
    onClick={onClick}
    className="bg-gray-200 text-sm rounded-full px-4 py-1 hover:bg-gray-300"
  >
    {label}
  </button>
);

export default Pill;
