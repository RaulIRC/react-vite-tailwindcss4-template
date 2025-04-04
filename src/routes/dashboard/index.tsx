import { createFileRoute } from '@tanstack/react-router'
import { Dashboard as DashboardComponent } from '../../pages/Dashboard' // Import the actual component for the dashboard
import { FinancialRecordsProvider } from '../../contexts/formContext/financial-record-context'

export const Route = createFileRoute('/dashboard/')({
  component: Dashboard,
})

function Dashboard() {
  return (
    <div>
      <FinancialRecordsProvider>
        <DashboardComponent />
      </FinancialRecordsProvider>
    </div>
  )
}
