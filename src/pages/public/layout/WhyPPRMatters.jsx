import {
  Lightbulb,
  BookOpenCheck,
  ShieldCheck,
  Layers3,
  Users,
} from "lucide-react";
import Card from "../../../components/ui/Card";
import CardList from "../../../components/ui/CardList";

const benefits = [
  {
    icon: <BookOpenCheck className="w-6 h-6 text-primary" />,
    text: "Discover and reuse existing knowledge",
  },
  {
    icon: <Lightbulb className="w-6 h-6 text-primary" />,
    text: "Improve the quality of their own research",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-primary" />,
    text: "Protect research integrity and discourage plagiarism",
  },
  {
    icon: <Layers3 className="w-6 h-6 text-primary" />,
    text: "Gain insights into departmental research history",
  },
  {
    icon: <Users className="w-6 h-6 text-primary" />,
    text: "Encourage open academic culture through transparency",
  },
];

const WhyPPRMatters = () => {
  return (
    <Card className="py-20 px-6 bg-[var(--shared-background)] dark:bg-[var(--shared-dark-background)] text-[var(--color-text)] dark:text-[var(--color-dark-text)]">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-primary dark:text-primary-light mb-4">
          🧠 Why PPR Matters
        </h2>
        <p className="text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          PPR solves a problem most institutions face: academic projects are
          submitted, graded, and then forgotten. This platform ensures those
          valuable works continue to serve the academic community.
        </p>
      </div>

      <div className="max-w-3xl mx-auto grid gap-6 sm:grid-cols-2">
        {benefits.map((item, index) => (
          <CardList
            key={index}
            className="flex items-start gap-3 shadow-none hover:shadow-none"
          >
            <div className="pt-1">{item.icon}</div>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {item.text}
            </p>
          </CardList>
        ))}
      </div>
    </Card>
  );
};

export default WhyPPRMatters;
