import { createFileRoute } from '@tanstack/react-router';
import Settings from '../../pages/Settings';
import { SettingsProvider } from '../../contexts/settingsContext/settingsContext';
import AuthRoute from '../../auth/auth';

export const Route = createFileRoute('/settings/')({
  component: SettingsComponent,
})

function SettingsComponent() {
  return (
    <>
      <SettingsProvider>
        <AuthRoute><Settings /></AuthRoute>
      </SettingsProvider>
    </>
  )
}
