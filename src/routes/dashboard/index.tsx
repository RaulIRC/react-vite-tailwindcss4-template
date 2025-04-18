import { createFileRoute } from '@tanstack/react-router'
import { Dashboard as DashboardComponent } from '../../pages/Dashboard' // Import the actual component for the dashboard\
// import AltDashboard from '../../pages/Dashboard/altindex'
import { FinancialRecordsProvider, SettingsProvider } from '../../contexts/formContext/financial-record-context'
import AuthRoute from '../../components/auth/auth'

export const Route = createFileRoute('/dashboard/')({
  component: Dashboard,
})

function Dashboard() {
  return (
    <div>
      <SettingsProvider>
        <FinancialRecordsProvider>
          <AuthRoute><DashboardComponent /></AuthRoute>
        </FinancialRecordsProvider>
      </SettingsProvider>
    </div>
  )
}
