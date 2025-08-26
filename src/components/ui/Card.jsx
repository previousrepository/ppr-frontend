import { clsx } from 'clsx';

const Card = ({ children, className, ...props }) => {
  return (
    <div
      className={clsx(
        ' p-6 shadow-md backdrop-blur-md',
        'border-b border-[var(--color-border)] dark:border-[var(--color-dark-border)] ',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;