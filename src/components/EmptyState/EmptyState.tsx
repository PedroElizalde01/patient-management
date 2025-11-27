import './EmptyState.styles.css';

interface EmptyStateProps {
  searchQuery: string;
}

export const EmptyState = ({ searchQuery }: EmptyStateProps) => {
  return (
    <div className="empty-state">
      <p>No patients found matching "{searchQuery}"</p>
      <p className="empty-state-subtitle">Try a different search term</p>
    </div>
  );
};
