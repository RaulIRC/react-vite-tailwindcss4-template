import { createFileRoute } from '@tanstack/react-router'
import RegisterPage from '../../pages/Register'
import { SettingsProvider } from '../../contexts/formContext/financial-record-context'

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
