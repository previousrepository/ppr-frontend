import {
  LogIn,
  Search,
  Upload,
  CheckCircle,
  KeyRound,
  FileText,
} from "lucide-react";
import Card from "../../../components/ui/Card";
import CardList from "../../../components/ui/CardList";

const steps = [
  {
    icon: LogIn,
    title: "Login or Register",
    description:
      "Use your FUBK email to log in as a student or lecturer. Guests can continue in read-only mode.",
  },
  {
    icon: Search,
    title: "Explore or Upload",
    description:
      "Students can search for existing projects or submit their own final-year research for review.",
  },
  {
    icon: CheckCircle,
    title: "Lecturer Review",
    description:
      "Lecturers receive and approve submissions from their department, determining project visibility.",
  },
  {
    icon: KeyRound,
    title: "Access Management",
    description:
      "For restricted projects, students can submit a request. Lecturers grant or deny access with review.",
  },
  {
    icon: FileText,
    title: "Track History",
    description:
      "All actions are logged per department to ensure transparency and research accountability.",
  },
];

const HowItWorks = () => {
  return (
    <Card className="py-20 px-6 bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)] text-[var(--color-text)] dark:text-[var(--color-dark-text)]">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-primary dark:text-primary-light mb-2">
          🧭 How It Works
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          From login to full access, here's how PPR streamlines the research
          journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <CardList
              key={index}
              className="p-6 rounded-2xl border backdrop-blur-md 
                         bg-[var(--color-surface)] dark:bg-slate-900
                         border-[var(--color-border)] dark:border-[var(--color-dark-border)]
                         "
            >
              <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {step.description}
              </p>
            </CardList>
          );
        })}
      </div>
    </Card>
  );
};

export default HowItWorks;
