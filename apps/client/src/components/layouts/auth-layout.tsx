const AuthLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative flex flex-col justify-center h-screen overflow-hidden">
      <div className="card w-full p-6 m-auto bg-base-200 rounded-md shadow-lg lg:max-w-lg">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
