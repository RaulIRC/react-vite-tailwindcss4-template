/* DaisyUI TailwindCSS Drawer Example: */
// Documentation: https://daisyui.com/components/drawer/

import NavbarComponent from "../navbar/NavbarComponent";

// This is considered a "Parent Component" 

// Documentation regarding Nested Componentes: https://medium.com/@sebasqui1995/managing-deeply-nested-react-components-the-right-way-6e1d2391a256

const DrawerTemplate = () => {

    /* TSX/JSX goes here */

    const drawerId = "template-drawer";  // Custom ID
    const drawerType = "checkbox"; // Type attribute
    const drawerClass = "drawer drawer-end bg-inherit"; // Custom class | Top Div
    const menuClass = "menu bg-base-200 text-base-context min-h-full w-80 p-4"; // Custom menu class
    
    return (
      <>
        <div className={drawerClass}>
          <input id={drawerId} type={drawerType} className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            <NavbarComponent navbarId={drawerId} />
            {/* Page content here */}
          </div>
          <div className="drawer-side top-0 z-50">
            <label htmlFor={drawerId} className="drawer-overlay"></label>
            <ul className={menuClass}>
              {/* Sidebar content here */}
              <li><a>Sidebar Item 1</a></li>
              <li><a>Sidebar Item 2</a></li>
            </ul>
          </div>
        </div>
      </>
    );
  };
  
  export default DrawerTemplate;
  