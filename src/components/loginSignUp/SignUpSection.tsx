import { useState } from "react";

import { initializeApp } from "firebase/app";
import firebaseConfig from "@/firebaseConfig/FireBaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";

const app = initializeApp(firebaseConfig);

type signUpSectionProps = { signInORSignUp: (signInORSignUp: boolean) => void };
const SignUpSection = (props: signUpSectionProps) => {
  type userData = {
    name: string;
    mail: string;
    password: string;
    cPassword: string;
    uniqueId?: string;
  };
  const [signUpForm, setSignUpForm] = useState({
    name: "",
    mail: "",
    password: "",
    cPassword: "",
    uniqueId: "",
  });
  const [validationError, setValidationError] = useState({
    nameError: "",
    mailError: "",
    passwordError: "",
    cPasswordError: "",
  });

  const [users, setUsers] = useState<userData[]>([]);

  const clearError = (errorFor: string) => {
    setValidationError({
      ...validationError,
      [errorFor]: "",
    });
  };

  const validation = () => {
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const form = {
      nameError: "",
      mailError: "",
      passwordError: "",
      cPasswordError: "",
    };

    const isFieldEmpty = (field: string) =>
      field.trim() === "" || field.trim() === " ";

    if (isFieldEmpty(signUpForm.name)) {
      form.nameError = "Name cannot be empty";
    } else {
      clearError("nameError");
    }

    if (!signUpForm.mail.match(emailFormat) || isFieldEmpty(signUpForm.mail)) {
      form.mailError = "Email is not valid";
    } else {
      clearError("mailError");
    }

    if (isFieldEmpty(signUpForm.password)) {
      form.passwordError = "Password cannot be empty";
    } else {
      clearError("passwordError");
    }

    if (isFieldEmpty(signUpForm.cPassword)) {
      form.cPasswordError = "Confirm Password cannot be empty";
    } else {
      clearError("cPasswordError");
    }

    if (signUpForm.cPassword !== signUpForm.password) {
      form.cPasswordError = "Password mismatch";
    }

    setValidationError(form);
    return form;
  };

  const handleSignUpFormChange = (e: any) => {
    setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value.trim() });
  };

  const handleSignUp = async (e: any) => {
    e.preventDefault();

    const validationResult = validation();

    if (
      validationResult.nameError === "" &&
      validationResult.mailError === "" &&
      validationResult.passwordError === "" &&
      validationResult.cPasswordError === ""
    ) {
      try {
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          signUpForm.mail,
          signUpForm.password
        );

        const user: User | null = userCredential.user;
        if (user) {
          await updateProfile(user, {
            displayName: signUpForm.name,
          });
          alert("User created");

          const db = getFirestore();
          const userDetailsDocRef = doc(db, "users", "userDetails");

          const userDetailsSnapshot = await getDoc(userDetailsDocRef);
          const currentData = userDetailsSnapshot.data();

          if (currentData) {
            const updatedData = {
              ...currentData,
              users: [
                ...(currentData.users || []),
                {
                  name: signUpForm.name,
                  email: signUpForm.mail,
                  password: signUpForm.password,
                },
              ],
            };

            await setDoc(userDetailsDocRef, updatedData);
          } else {
            await setDoc(userDetailsDocRef, {
              users: [
                {
                  name: signUpForm.name,
                  email: signUpForm.mail,
                  password: signUpForm.password,
                },
              ],
            });
            console.log("User details document created with the first user");
          }
          setSignUpForm({
            name: "",
            mail: "",
            password: "",
            cPassword: "",
            uniqueId: "",
          });
        } else {
          console.error("Failed to create user");
          alert("Failed to create user");
        }
      } catch (error: any) {
        console.log(error);
        alert(error.message);
      }
    }
  };

  return (
    <>
      <button
        onClick={() => {
          props.signInORSignUp(true);
        }}
        className="px-8 py-3 rounded-lg border border-black"
      >
        Login
      </button>
      <form action="submit" className="flex flex-col self-center mt-28 w-3/4">
        <label className="text-4xl font-bold text-black/60">
          Create Account
        </label>
        <input
          value={signUpForm.name}
          onChange={handleSignUpFormChange}
          name="name"
          placeholder="Name"
          type="text"
          className="px-4 py-4 bg-slate-100 rounded-md  mt-8"
        ></input>
        <span className="h-6 text-xs text-red-500">
          {validationError.nameError}
        </span>
        <input
          value={signUpForm.mail}
          onChange={handleSignUpFormChange}
          name="mail"
          placeholder="Email"
          type="email"
          className="px-4 py-4 bg-slate-100 rounded-md "
        ></input>
        <span className="h-6 text-xs text-red-500 ">
          {validationError.mailError}
        </span>
        <input
          value={signUpForm.password}
          onChange={handleSignUpFormChange}
          name="password"
          placeholder="Password"
          type="password"
          className="px-4 py-4 bg-slate-100 rounded-md "
        ></input>
        <span className="h-6 text-xs text-red-500 ">
          {validationError.passwordError}
        </span>
        <input
          value={signUpForm.cPassword}
          onChange={handleSignUpFormChange}
          name="cPassword"
          placeholder="Confirm Password"
          type="password"
          className="px-4 py-4 bg-slate-100 rounded-md "
        ></input>
        <span className="h-6 text-xs text-red-500 ">
          {validationError.cPasswordError}
        </span>
        <div className="flex  items-center justify-between">
          <p> </p>
          <button
            onClick={handleSignUp}
            type="submit"
            className="text-white bg-primary font-bold px-10 py-3 rounded-md"
          >
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
};
export default SignUpSection;