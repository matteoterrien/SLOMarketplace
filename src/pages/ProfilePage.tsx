import React, { FC } from "react";

interface ProfilePageProps {
  darkmode: boolean;
  username: string;
  changeUsername: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfilePage: FC<ProfilePageProps> = (props) => {
  return (
    <div className="flex flex-col items-center m-4 gap-4">
      <img
        src="/profileImages/profile1.jpg"
        alt="Profile Picture"
        className="object-cover h-1/2 rounded-4xl border-1"
      />
      <label
        className={`flex font-bold text-2xl gap-3 justify-center items-center ${
          props.darkmode ? "text-neutral-300" : "text-black"
        }`}
      >
        Username:
        <input
          className="p-1 border-1 rounded-lg w-1/3 justify-center text-center font-normal"
          placeholder={props.username}
          onChange={props.changeUsername}
        />
      </label>
    </div>
  );
};

export default ProfilePage;
