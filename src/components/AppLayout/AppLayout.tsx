import { ReactNode } from 'react';
import './AppLayout.styles.css';

interface AppLayoutProps {
  children: ReactNode;
  toolbar?: ReactNode;
}

export const AppLayout = ({ children, toolbar }: AppLayoutProps) => {
  return (
    <div className="app-container">
      <div className="app-header-section">
        <header className="app-header">
          <h1>Patient Management System</h1>
        </header>
        {toolbar && <div className="app-toolbar-wrapper">{toolbar}</div>}
      </div>
      <main className="app-main">{children}</main>
    </div>
  );
};
