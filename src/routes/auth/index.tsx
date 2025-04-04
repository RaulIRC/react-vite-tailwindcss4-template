import { createFileRoute } from '@tanstack/react-router'
import LoginComponent from '../../pages/Login';

export const Route = createFileRoute('/auth/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <LoginComponent />
    </>
  );
}
