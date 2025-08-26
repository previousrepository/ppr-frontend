
import {
  BookOpenCheck,
  Upload,
  Lock,
  ShieldCheck,
  History,
} from "lucide-react";
import Card from "../../../components/ui/Card";
import CardList from "../../../components/ui/CardList";
import { motion } from "framer-motion";

const KeyFeatures = () => {

  const features = [
    {
    icon: BookOpenCheck,
    title: "Explore Projects",
    description:
      "Search titles, read abstracts, and find inspiration from previously approved final-year projects.",
  },
  {
    icon: Upload,
    title: "Submit Your Work",
    description:
      "Students can upload final-year project information to be reviewed and published by their department.",
  },
  {
    icon: Lock,
    title: "Request Full Access",
    description:
      "Need more than an abstract? Students can request access to restricted projects with valid reasons.",
  },
  {
    icon: ShieldCheck,
    title: "Lecturer Review",
    description:
      "Lecturers approve or reject submissions, set access level, and manage departmental research integrity.",
  },
  {
    icon: History,
    title: "Transparent Logs",
    description:
      "All submission and access history is logged for transparency, only visible to relevant lecturers.",
  },
];


  return (
    <Card  className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--shared-background)] dark:bg-[var(--shared-dark-background)]">
      <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}>
        <h2 className="text-3xl font-bold text-primary dark:text-primary-light">
          🔍 Key Features
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-2xl mx-auto">
          Discover the power of PPR through its core features for students and staff.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <CardList
              key={index}
              className="p-6 rounded-2xl border backdrop-blur-md 
                         bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)]
                         border-[var(--color-border)] dark:border-[var(--color-dark-border)]
                         "
            >
                <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </CardList>
          );
        })}
      </div>
    </Card>
  );
};

export default KeyFeatures;
