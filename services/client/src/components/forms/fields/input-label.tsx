export const InputLabel: React.FC<{ label: string }> = ({ label }) => {
  return (
    <label className="label">
      <span className="label-text text-base">{label}</span>
    </label>
  );
};
