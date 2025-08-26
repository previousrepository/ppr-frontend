import Card from '../../../components/ui/Card';
import CardList from '../../../components/ui/CardList';

const roles = [
  {
    icon: '🎓',
    title: 'FUBK Students',
    capabilities: [
      'Submit their project for approval',
      'Explore public and restricted project abstracts',
      'Request full access to restricted content',
      'Download approved files (if granted)',
    ],
  },
  {
    icon: '🧑‍🏫',
    title: 'FUBK Lecturers',
    capabilities: [
      'Approve/reject student project submissions',
      'Mark projects as public or restricted',
      'Manage access requests',
      'View activity history logs within their department',
    ],
  },
  {
    icon: '🌍',
    title: 'Guest Users (Other Institutions)',
    capabilities: [
      'Search and view public project abstracts',
      'Cannot upload, request access, or download files',
      'Ideal for exploring academic output or doing comparative research',
    ],
  },
];

const WhoCanUse = () => {
  return (
    <Card className="py-20 px-6 bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)] text-[var(--color-text)] dark:text-[var(--color-dark-text)]">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-primary dark:text-primary-light">
          👥 Who Can Use PPR?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-2xl mx-auto">
          PPR is designed for both internal and external academic use. Here's what each role can do:
        </p>
      </div>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {roles.map((role, index) => (
          <CardList
            key={index}
            className="bg-[var(--color-background)] dark:bg-[var(--color-dark-background)] p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="text-4xl mb-3">{role.icon}</div>
            <h3 className="text-xl font-semibold mb-4">{role.title}</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 list-disc list-inside">
              {role.capabilities.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </CardList>
        ))}
      </div>
    </Card>
  );
};

export default WhoCanUse;
