import { FC } from "react";
import UsernamePasswordForm from "./UsernamePasswordForm";
import { sendPostRequest } from "./sendPostRequest";

interface RegisterPageProps {
  onLogin: (token: string) => void;
}

const RegisterPage: FC<RegisterPageProps> = ({ onLogin }) => {
  async function handleRegister({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<{ type: string; message: string }> {
    const response = await sendPostRequest("/auth/register", {
      username,
      password,
    });

    if (response.status === 201) {
      const token = response.token;

      if (!token) {
        return { type: "error", message: "Missing token in response." };
      }

      onLogin(token);

      return { type: "success", message: "Registration successful!" };
    } else if (response.status === 400) {
      return {
        type: "error",
        message: "User already exists. Please try another username.",
      };
    } else {
      return {
        type: "error",
        message: "An unexpected error occurred. Please try again later.",
      };
    }
  }

  return (
    <div className="flex flex-col gap-2 mt-5 items-center">
      <h2 className="text-2xl">Register a New Account</h2>
      <UsernamePasswordForm onSubmit={handleRegister} />
    </div>
  );
};

export default RegisterPage;
