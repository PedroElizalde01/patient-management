import { MdAdd } from 'react-icons/md';
import { Searchbar, Dropdown, Button } from '..';
import { SORT_OPTIONS, type SortOption } from '../../constants/sortOptions';
import './Toolbar.styles.css';

interface ToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  showResults: boolean;
  resultsCount: number;
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
  onAddPatient: () => void;
}

export const Toolbar = ({
  searchQuery,
  onSearchChange,
  showResults,
  resultsCount,
  sortBy,
  onSortChange,
  onAddPatient,
}: ToolbarProps) => {
  return (
    <div className="toolbar">
      <div className="toolbar-container">
        <Searchbar
          value={searchQuery}
          onChange={onSearchChange}
          showResults={showResults}
          resultsCount={resultsCount}
        />
        <Dropdown
          options={SORT_OPTIONS}
          value={sortBy}
          onChange={(value) => onSortChange(value as SortOption)}
          placeholder="Sort by..."
        />
        <Button
          style={{ marginRight: '12px', gap: '8px' }}
          variant="primary"
          onClick={onAddPatient}
          className="add-patient-btn"
        >
          <MdAdd size={20} />
          <span className="btn-text">Add Patient</span>
        </Button>
      </div>
    </div>
  );
};
