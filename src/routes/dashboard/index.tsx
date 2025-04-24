import { createFileRoute } from '@tanstack/react-router'
import { Dashboard as DashboardComponent } from '../../pages/Dashboard' // Import the actual component for the dashboard\
// import AltDashboard from '../../pages/Dashboard/altindex'
import { SettingsProvider } from '../../contexts/settingsContext/settingsContext'
import { FinancialRecordsProvider } from '../../contexts/formContext/financial-record-context'
import AuthRoute from '../../auth/auth'

export const Route = createFileRoute('/dashboard/')({
  component: Dashboard,
})

function Dashboard() {

  return (
    <div>
      <SettingsProvider>
        <FinancialRecordsProvider>
          <AuthRoute><DashboardComponent /></AuthRoute>
          {/* <DashboardComponent /> */}
        </FinancialRecordsProvider>
      </SettingsProvider>
    </div>
  )
}
