import { motion } from "motion/react";

const FeatureCard = ({ features }) => {
  return (
    <>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {features.map((feature, index) => {
          const Icon = feature.icon; 
          return (<motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-6 rounded-xl shadow-md border bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)] hover:shadow-lg transition-all"
          >
            <Icon className="mb-4 w-6 h-6 text-primary" />
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {feature.description}
            </p>
          </motion.div>);
        })}
      </div>
    </>
  );
};

export default FeatureCard;