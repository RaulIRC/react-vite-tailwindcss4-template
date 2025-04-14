import { createFileRoute } from '@tanstack/react-router'
import AltSettings from '../../pages/Settings/altindex'
//                 </label>

export const Route = createFileRoute('/settings/')({
  component: SettingsComponent,
})

function SettingsComponent() {
  return (
    <>
      <AltSettings />
    </>
  )
}
