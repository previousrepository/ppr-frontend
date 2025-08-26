import { FilePlus2, Eye, Mail, ClipboardList, CheckCheck, History, FolderKanban } from 'lucide-react';
import Card from '../../components/ui/Card';
import CardList from '../../components/ui/CardList';

const previews = [
  {
    role: 'Student Dashboard',
    features: [
      {
        icon: <FilePlus2 className="w-5 h-5 text-primary" />,
        text: 'Submit your project',
      },
      {
        icon: <ClipboardList className="w-5 h-5 text-primary" />,
        text: 'Track approval status',
      },
      {
        icon: <Mail className="w-5 h-5 text-primary" />,
        text: 'Manage your access requests',
      },
    ],
  },
  {
    role: 'Lecturer Panel',
    features: [
      {
        icon: <CheckCheck className="w-5 h-5 text-primary" />,
        text: 'Approve/reject projects',
      },
      {
        icon: <History className="w-5 h-5 text-primary" />,
        text: 'View departmental logs',
      },
      {
        icon: <FolderKanban className="w-5 h-5 text-primary" />,
        text: 'Handle student access requests',
      },
    ],
  },
];

const PreviewPPR = () => {
  return (
    <Card className="py-20 px-6 bg-[var(--color-background)] dark:bg-[var(--color-dark-background)] text-[var(--color-text)] dark:text-[var(--color-dark-text)]">
      <div className="text-center max-w-4xl mx-auto mb-12">
        <h2 className="text-3xl font-bold text-primary dark:text-primary-light">
          📸 Preview PPR in Action
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Here’s what the dashboard experience looks like for both students and lecturers. These
          features will be visually available once your project is live.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
        {previews.map((preview, index) => (
          <CardList
            key={index}
            className="p-6 rounded-xl shadow-sm border bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)] border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-xl font-semibold mb-4">{preview.role}</h3>
            <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              {preview.features.map((feat, i) => (
                <li key={i} className="flex items-center gap-2">
                  {feat.icon}
                  {feat.text}
                </li>
              ))}
            </ul>

            {/* Placeholder for screenshot */}
            <div className="mt-6 h-48 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 text-xs">
              {/* Later: Replace this with actual screenshots */}
              UI Preview Coming Soon
            </div>
          </CardList>
        ))}
      </div>
    </Card>
  );
};

export default PreviewPPR;
