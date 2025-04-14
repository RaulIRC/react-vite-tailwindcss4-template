import { Link } from "@tanstack/react-router";

const HomeComponent = () => {
  return (
    <>
      <div className="hero min-h-screen">
        <div className="bg-color-primary"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md p-5">
            <h1 className="text-base-content mb-5 text-5xl font-bold">Hello there</h1>
            <p className="text-base-content mb-5 text-shadow-lg">
              Budget4Free is an intuitive expense tracking app that helps you manage your finances effortlessly. 
              Track your income, expenses, and savings all in one place with ease and clarity.
            </p>
            <Link to="/auth">
              <button className="btn btn-primary">Get Started</button>
            </Link>
          </div>
        </div>
        </div>
    </>
  );
};

export default HomeComponent;
