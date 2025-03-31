/* DaisyUI TailwindCSS Navbar/Title Only Example: */

// Documentation: https://daisyui.com/components/navbar/

// This is considered a "Child Component"

const NavbarTemplate = ({ drawerId }: { drawerId: string }) => {

  const threeDots = "M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z";
  const buttonClass = "drawer-button bg-base-300 btn btn-square btn-ghost active:glass";

  /* TSX/JSX goes here */

  return (
  <>
  {/* Navbar */}
    <nav className="block w-full max-w-screen-lg px-4 py-2 mx-auto shadow-md rounded-md lg:px-8 lg:py-3 mt-2">
        <div className="navbar sticky rounded-lg m-0.1 top-0 duration-500 ease-in transition-colors glass">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl bg-base-300 active:glass">daisyUI</a>
          </div>
          <div className="flex-none">
            {/* Button to open the drawer */}
            <label htmlFor={drawerId} className={buttonClass}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                className="inline-block h-10 w-10 stroke-current"
              > 
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d={threeDots}
                />
              </svg>
            </label>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarTemplate;
