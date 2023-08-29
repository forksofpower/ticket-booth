export const InputLabel: React.FC<{ label: string }> = ({ label }) => {
  return (
    <label className="label">
      <span className="text-base label-text">{label}</span>
    </label>
  );
};
