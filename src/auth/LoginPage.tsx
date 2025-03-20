import { FC } from "react";
import { Link, useNavigate } from "react-router";
import UsernamePasswordForm from "./UsernamePasswordForm";
import { sendPostRequest } from "./sendPostRequest";

interface LoginPageProps {
  onLogin: (token: string) => void;
}

interface LoginResponse {
  type: string;
  message: string;
}

const LoginPage: FC<LoginPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();

  async function handleLogin({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<LoginResponse> {
    const response = await sendPostRequest("/auth/login", {
      username,
      password,
    });

    if (response.status === 200) {
      const token = response.token;
      if (!token) {
        return {
          type: "error",
          message: "Authentication failed. No token received.",
        };
      }

      console.log("Authentication Token:", token);
      onLogin(token);
      navigate("/");

      return { type: "success", message: "Login successful!" };
    } else if (response.status === 401) {
      return { type: "error", message: "Incorrect username or password." };
    } else {
      return {
        type: "error",
        message: "An unexpected error occurred. Please try again later.",
      };
    }
  }

  return (
    <div className="flex flex-col gap-2 mt-5 items-center">
      <h2 className="text-2xl">Login</h2>
      <UsernamePasswordForm onSubmit={handleLogin} />
      <Link to="/register">
        <h3 className="bg-[var(--color-accent0)] hover:bg-green-900 active:bg-green-950 text-white p-2 rounded-xl mt-">
          Don't have an account? Register Here!
        </h3>
      </Link>
    </div>
  );
};

export default LoginPage;
