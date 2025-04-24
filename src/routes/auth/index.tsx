import { createFileRoute } from '@tanstack/react-router'
import LoginPage from '../../pages/Login';
import { SettingsProvider } from '../../contexts/settingsContext/settingsContext';

export const Route = createFileRoute('/auth/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <SettingsProvider>
        <LoginPage />
      </SettingsProvider>
    </>
  );
}
