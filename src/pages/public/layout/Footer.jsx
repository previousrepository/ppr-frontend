const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-[var(--color-background)] dark:bg-[var(--color-dark-background)] text-[var(--color-text)] dark:text-[var(--color-dark-text)] px-6 py-6 text-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        {/* Left side */}
        <div>
          © {year} <strong>PPR</strong> – Project Repository System  
          <br />
          Powered by the Department of Computer Science, Federal University Birnin Kebbi
        </div>

        {/* Right side */}
        <div className="space-x-4 text-primary dark:text-primary-light">
          <span>Version 1.0</span>
          <a href="#" className="hover:underline">Feedback</a>
          <a href="#" className="hover:underline">Terms of Use</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
