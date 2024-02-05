import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img
            src={currentUser.avatar}
            alt="user profile"
            className="rounded-full w-full h-full object-cover border-8 border-[lightgray]"
          />
        </div>
        <TextInput
          type="text"
          id="username"
          defaultValue={currentUser.username}
        />
        <TextInput type="emaul" id="email" defaultValue={currentUser.email} />
        <TextInput type="password" id="password" placeholder="********" />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Modifier
        </Button>
      </form>
      <div className="flex justify-between mt-5 text-red-500">
        <span className="cursor-pointer">Supprimer</span>
        <span className="cursor-pointer">Se déconnecter</span>
      </div>
    </div>
  );
}
