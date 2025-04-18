import { createFileRoute } from '@tanstack/react-router'
import LoginPage from '../../pages/Login';

export const Route = createFileRoute('/auth/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <LoginPage />
    </>
  );
}
