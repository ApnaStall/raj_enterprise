function LoginLayout({ children }) {
  return (
    <>
    <div className="min-h-screen flex items-center justify-center 
      bg-linear-to-br from-[#00E0E8] to-[#03519F] px-4">
      <div className="bg-white/90 backdrop-blur-xl w-full max-w-md 
        p-10 rounded-3xl shadow-2xl border border-white/50">
        {children}
      </div>
    </div>
    </>
  );
}

export default LoginLayout;
