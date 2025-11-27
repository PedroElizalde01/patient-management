import { useMemo } from 'react';
import type { Patient } from '../types';
import type { SortOption } from '../constants/sortOptions';

export const usePatientFilters = (
  patients: Patient[],
  searchQuery: string,
  sortBy: SortOption
) => {
  const filteredAndSortedPatients = useMemo(() => {
    let result = patients;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = patients.filter((patient: Patient) =>
        patient.name.toLowerCase().includes(query)
      );
    }

    if (sortBy) {
      result = [...result].sort((a, b) => {
        switch (sortBy) {
          case 'name-asc':
            return a.name.trim().localeCompare(b.name.trim());
          case 'name-desc':
            return b.name.trim().localeCompare(a.name.trim());
          case 'createdAt-asc':
            return (
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
          case 'createdAt-desc':
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          default:
            return 0;
        }
      });
    }

    return result;
  }, [searchQuery, patients, sortBy]);

  return filteredAndSortedPatients;
};
