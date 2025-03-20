import React, { FC, useState, useActionState } from "react";

interface UsernamePasswordFormProps {
  onSubmit: (data: {
    username: string;
    password: string;
  }) => Promise<{ type: string; message: string }>;
}

const UsernamePasswordForm: FC<UsernamePasswordFormProps> = ({ onSubmit }) => {
  const [error, setError] = useState<boolean>(false);
  const [result, submitAction, isPending] = useActionState(
    async (previousState: any, formData: FormData) => {
      const username: string | undefined = formData.get("username") as string;
      const password: string | undefined = formData.get("password") as string;

      if (!username || !password) {
        return {
          type: "error",
          message: `Please fill in your username and password.`,
        };
      }

      const submitResult = await onSubmit({ username, password });
      return submitResult;
    },
    null
  );

  return (
    <div>
      {result && (
        <p className={`message ${result.type} text-red-500 flex`}>
          {result.message}
        </p>
      )}
      {isPending && <p className="message loading">Loading ...</p>}
      <form
        action={submitAction}
        className="flex flex-col gap-5 border-2 rounded-xl p-5 self-center items-center"
      >
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            disabled={isPending}
            className="border-2 ml-2 rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            disabled={isPending}
            className="border-2 ml-2 rounded-lg"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="bg-[var(--color-accent0)] hover:bg-green-900 active:bg-green-950 text-white p-2 rounded-xl"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UsernamePasswordForm;
