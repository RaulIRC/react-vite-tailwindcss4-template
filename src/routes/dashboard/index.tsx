import { createFileRoute } from '@tanstack/react-router'
import { Dashboard as DashboardComponent } from '../../pages/Dashboard' // Import the actual component for the dashboard\
// import AltDashboard from '../../pages/Dashboard/altindex'
import { FinancialRecordsProvider } from '../../contexts/formContext/financial-record-context'
import { MonthlyBudgetProvider } from '../../contexts/monthlyContext/monthlyContext'

export const Route = createFileRoute('/dashboard/')({
  component: Dashboard,
})

function Dashboard() {
  return (
    <div>
      <MonthlyBudgetProvider>
        <FinancialRecordsProvider>
          <DashboardComponent />
        </FinancialRecordsProvider>
      </MonthlyBudgetProvider>
    </div>
  )
}
