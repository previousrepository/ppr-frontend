import { BookOpen, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import CardList from "../../../components/ui/CardList";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

const HeroSection = () => {
  return (
    <>
      <Card className="flex flex-col items-center justify-center px-6 py-16 text-[var(--color-text) bg-ppr-animated">
        <CardList
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl shadow-none hover:shadow-lg dark:shadow-none hover:dark:shadow-none transition-all"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary)] dark:text-[var(--color-dark-primary)] mb-4 leading-tight">
            PPR – Project Repository System
          </h1>

          <p className="text-xl md:text-2xl text-[var(--color-accent)] dark:text-[var(--color-dark-accent)] font-medium mb-6">
            "Unlock Research. Explore Knowledge. Power Your Project."
          </p>

          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-8">
            The Project Repository System (PPR) empowers FUBK students,
            lecturers, and researchers by providing access to previously
            approved final-year projects. Upload, search, and request access all
            while supporting research integrity and collaboration.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button
                size="lg"
                icon={<LogIn className="w-5 h-5" />}
                className="bg-[var(--color-primary)] dark:bg-[var(--color-dark-primary)] text-white hover:bg-[var(--color-primary-hover)] dark:hover:bg-[var(--color-dark-primary-hover)]"
              >
                Get Started
              </Button>
            </Link>

            <Link to="/login">
              <Button
                variant="outline"
                size="lg"
                icon={<BookOpen className="w-5 h-5" />}
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
              >
                Explore Projects
              </Button>
            </Link>
          </div>
        </CardList>
      </Card>
    </>
  );
};

export default HeroSection;
