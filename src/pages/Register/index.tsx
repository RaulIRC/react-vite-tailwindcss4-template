import { useNavigate } from '@tanstack/react-router';
import { useAuthLogic } from '../../contexts/authContext';

const RegisterPage = () => {
    // Initialize Firebase authentication logic here if needed
    const navigate = useNavigate();

    const {
        authing,
        setAuthing,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        signUpWithEmail,
      } = useAuthLogic();

    // You can add any authentication logic or state management here
    
    
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card w-full max-w-sm shadow-lg glass">
        <div className="card-body">
          <h2 className="card-title text-center self-center ">Register</h2>
          <form className="flex flex-col gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
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
                placeholder="Enter your password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="input input-bordered"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-control mt-4 self-center">
              <button
                type="submit"
                className={`btn btn-primary ${authing ? "loading" : ""}`}
                disabled={authing}
                onClick={() => signUpWithEmail(email, password, confirmPassword)}
              >
                Register
              </button>
            </div>
          </form>
          <div className="divider">OR</div>
          <button
            className="btn btn-secondary w-full"
            onClick={() => navigate({ to: "/auth" })}
          >
            Already have an account? Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage