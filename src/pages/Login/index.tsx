import { useAuthLogic } from '../../contexts/authContext';

const LoginComponent = () => {

    const { email, setEmail, password, setPassword, signInWithGoogle, handleLogin, handleClick, handleRegister } = useAuthLogic();

    return (
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row">
            <div className="card w-full max-w-sm shadow-2xl bg-base-100">
              <div className="card-body">
          <h2 className="card-title text-center">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email address</span>
              </label>
              <input
                type="email"
                placeholder="Enter email"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-control mt-4">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">New User?</span>
            </label>
            <button onClick={handleClick} className="btn btn-secondary">
              Create an account
            </button>
          </div>
          <div className="divider">OR</div>
          <div className="form-control">
            <p className="text-center mb-2">Sign in with Google to Continue</p>
            <button onClick={signInWithGoogle} className="btn btn-accent">
              Sign In With Google
            </button>
          </div>
              </div>
            </div>
          </div>
        </div>
    );
};
export default LoginComponent;