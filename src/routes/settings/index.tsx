import { createFileRoute } from '@tanstack/react-router'
import AltSettings from '../../pages/Settings/altindex'
import Settings, { MonthlyBudgetProvider } from '../../pages/Settings'

export const Route = createFileRoute('/settings/')({
  component: SettingsComponent,
})

function SettingsComponent() {
  return (
    <>
    <MonthlyBudgetProvider>
      <Settings />
    </MonthlyBudgetProvider>
    </>
  )
}
