import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/** Left */}
        <div className="flex-1">
          <Link to="/" className="font-bold text-4xl dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Orea's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            Il s’agit d’un projet de démonstration. Vous pouvez vous inscrire
            avec votre adresse e-mail et votre mot de passe ou avec google.
          </p>
        </div>
        {/** Right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div className="">
              <Label value="Nom" />
              <TextInput type="text" placeholder="Nom" id="username" />
            </div>
            <div className="">
              <Label value="Email" />
              <TextInput
                type="email"
                placeholder="nom@société.com"
                id="email"
              />
            </div>
            <div className="">
              <Label value="Mot de passe" />
              <TextInput
                type="password"
                placeholder="*************"
                id="password"
              />
            </div>
            <Button gradientDuoTone="purpleToPink" type="button">
              S’enregistrer
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Vous avez un compte ?</span>
            <Link to="/sign-in" className="text-blue-500 hover:underline">
              Connexion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
