import { Alert, Button, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Spinner } from "flowbite-react";
import OAuth from "../components/OAuth";

export default function Signup() {
  const [isShow, setIsShow] = useState(false);
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.username === "" ||
      !formData.email === "" ||
      formData.password === ""
    ) {
      return setErrorMessage("S’il vous plaît remplir tous les champs");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.status === false) {
        setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
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
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="">
              <Label value="Nom" />
              <TextInput
                type="text"
                placeholder="Nom"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div className="">
              <Label value="Email" />
              <TextInput
                type="email"
                placeholder="nom@société.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div className="">
              <Label value="Mot de passe" />
              <TextInput
                type="password"
                placeholder="*************"
                id="password"
                rightIcon={isShow ? FaEyeSlash : FaEye}
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />{" "}
                  <span className="pl-3">Chargemenet...</span>
                </>
              ) : (
                "S’enregistrer"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Vous avez un compte ?</span>
            <Link to="/sign-in" className="text-blue-500 hover:underline">
              Connexion
            </Link>
          </div>
          {errorMessage && (
            <Alert
              className="mt-5"
              color="failure"
              onDismiss={() => setErrorMessage(null)}
            >
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
