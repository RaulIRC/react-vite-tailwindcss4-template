import { createFileRoute } from '@tanstack/react-router'
import Settings from '../../pages/Settings'
import { FinancialRecordsProvider } from '../../contexts/formContext/financial-record-context'

export const Route = createFileRoute('/settings/')({
  component: SettingsComponent,
})

function SettingsComponent() {
  return (
    <>
    <FinancialRecordsProvider>
      <Settings />
    </FinancialRecordsProvider>
    </>
  )
}
