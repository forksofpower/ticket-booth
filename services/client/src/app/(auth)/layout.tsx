const AuthLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative flex h-screen flex-col justify-center overflow-hidden px-6 py-12 lg:px-8">
      {children}
    </div>
  );
};

export default AuthLayout;
