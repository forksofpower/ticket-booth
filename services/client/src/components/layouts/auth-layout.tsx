const AuthLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative flex h-screen flex-col justify-center overflow-hidden">
      <div className="card bg-base-200 m-auto w-full rounded-md p-6 shadow-lg lg:max-w-lg">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
