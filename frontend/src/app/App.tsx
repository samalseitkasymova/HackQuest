import { RouterProvider } from 'react-router';
import { router } from './routes';
import { LabProvider } from './context/LabContext';
import { AchievementProvider } from './context/AchievementContext';
import { AdminLabProvider } from './context/AdminLabContext';

export default function App() {
  return (
    <LabProvider>
      <AchievementProvider>
        <AdminLabProvider>
          <RouterProvider router={router} />
        </AdminLabProvider>
      </AchievementProvider>
    </LabProvider>
  );
}
