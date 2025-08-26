import CallToAction from "./layout/CallToAction";
// import Footer from "./layout/Footer.js";
import HeroSection from "./layout/HeroSection";
import HowItWorks from "./layout/HowItWorks";
import KeyFeatures from "./layout/KeyFeatures";
// import PreviewPPR from "./layout/Preview.js";
import WhoCanUse from "./layout/WhoCanUse";
import WhyPPRMatters from "./layout/WhyPPRMatters";

const Landing = () => {
  const year = new Date().getFullYear();

  return (
    <>
      <HeroSection />

      <KeyFeatures />

      <WhoCanUse />

      <WhyPPRMatters />

      <HowItWorks />

      {/* <PreviewPPR /> */}

      <CallToAction />

      <footer className="w-full bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)] text-[var(--color-text)] dark:text-[var(--color-dark-text)] px-6 py-6 text-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          {/* Left side */}
          <div>
            © {year} <strong>PPR</strong> – Project Repository System
            <br />
            Powered by the Department of Computer Science, Federal University
            Birnin Kebbi
          </div>

          {/* Right side */}
          <div className="space-x-4 text-primary dark:text-primary-light">
            <span>Version 1.0</span>
            <a href="#" className="hover:underline">
              Feedback
            </a>
            <a href="#" className="hover:underline">
              Terms of Use
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Landing;
