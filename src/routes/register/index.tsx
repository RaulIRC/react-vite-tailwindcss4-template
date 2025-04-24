import { createFileRoute } from '@tanstack/react-router'
import RegisterPage from '../../pages/Register'
import { SettingsProvider } from '../../contexts/settingsContext/settingsContext';

export const Route = createFileRoute('/register/')({
  component: RegisterComponent,
})

function RegisterComponent() {
  return (
    <>
      <SettingsProvider>
        <RegisterPage />
      </SettingsProvider>
    </>
  )
}
