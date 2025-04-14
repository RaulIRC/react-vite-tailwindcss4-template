import { createFileRoute } from '@tanstack/react-router'
import AltSettings from '../../pages/Settings/altindex'
import Settings from '../../pages/Settings'
//                 </label>

export const Route = createFileRoute('/settings/')({
  component: SettingsComponent,
})

function SettingsComponent() {
  return (
    <>
      <Settings />
    </>
  )
}
