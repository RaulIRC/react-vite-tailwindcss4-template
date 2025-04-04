import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import NavbarComponent from '../components/navbar/NavbarComponent';

// Making this the nav bar that is the drawer 
//to always have it available while loading each page would be a cool idea.

export const Route = createRootRoute({
  component: () => rootNav(),
});

// drawerType: drawer and drawer-end are needed to move the type over to the otherside.

function rootNav() {

  const navbarId = 'navigation-bar'; // This is the id used for the drawer component, must be unique in the DOM.

  return (
    <>
        {/* Navbar can go here */}
      <header className="navbar-container sticky top-0 z-50 bg-base-100 p-4 gap-2">
        <div className="flex gap-2 justify-center rounded-2xl">
          <NavbarComponent navbarId={navbarId} />
        </div>
      </header>
      {/* Drawer component for mobile view */}  
      <div className="mt-6 px-4">
        {/* <hr /> Component Divider */}
        <Outlet /> {/* Outlet renders the given route page here.*/}
      </div>
      <TanStackRouterDevtools />
    </>
  )
}