import { Link } from "react-router-dom";
import { LogIn, Eye } from "lucide-react";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

const CallToAction = () => {
  return (
    <Card className="py-20 px-6 bg-[var(--shared-background)] dark:bg-[var(--shared-dark-background)] text-[var(--color-text)] dark:text-[var(--color-dark-text)] text-center">
      <div className="max-w-3xl mx-auto space-y-6">

        <h2 className="text-3xl font-bold text-primary dark:text-primary-light">
          🎯 Ready to explore or contribute to academic excellence?
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/login">
            <Button
              variant="primary"
              className="text-white flex"
              size="lg"
              icon={<LogIn className="w-5 h-5" />}
            >
              as FUBK Member
            </Button>
          </Link>

          <Link to="/guest/explore">
            <Button
              variant="outline"
              className="text-gray-700 dark:text-gray-300"
              size="lg"
              icon={<Eye className="w-5 h-5" />}
            >
              Continue as Guest
            </Button>
          </Link>
        </div>

        {/* Tagline */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-4 max-w-xl mx-auto">
          <em>
            Preserving the past. Empowering the future. Built for FUBK students,
            by FUBK students.
          </em>
        </p>
      </div>
    </Card>
  );
};

export default CallToAction;
