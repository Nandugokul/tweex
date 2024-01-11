import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
``;

type loginSectionProps = { signInORSignUp: (signInORSignUp: boolean) => void };

const LoginSection = (props: loginSectionProps) => {
  const router = useRouter();
  type userData = {
    name: string;
    mail: string;
    password: string;
    cPassword: string;
  };
  const [storedUserData, setStoredUserData] = useState<userData[]>([]);
  const [loginForm, setLoginForm] = useState({ mail: "", password: "" });
  const [incorrectMailOrPassword, setIncorrectMailOrPassword] = useState(false);
  useEffect(() => {
    const storedUsersString = localStorage.getItem("users");
    if (storedUsersString) {
      const parsedStoredUsers = JSON.parse(storedUsersString);
      setStoredUserData(parsedStoredUsers);
    }
  }, []);

  const handleLoginFormChange = (e: any) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value.trim() });
  };

  const handleLogin = (e: any) => {
    e.preventDefault();

    const isUserValid = storedUserData.some(
      (item) =>
        item.mail === loginForm.mail && item.password === loginForm.password
    );

    if (isUserValid) {
      console.log("Login successful");
      setIncorrectMailOrPassword(false);
      router.push("/feeds");
    } else {
      console.log("Invalid credentials");
      setIncorrectMailOrPassword(true);
    }
  };
  return (
    <>
      <button
        onClick={() => {
          props.signInORSignUp(false);
        }}
        className="px-8 py-3 rounded-lg border border-black"
      >
        Create Account
      </button>
      <form action="submit" className="flex flex-col  self-center mt-28 w-3/4">
        <label className="text-4xl font-bold text-black/60 mb-8">Login</label>
        <input
          onChange={handleLoginFormChange}
          name="mail"
          placeholder="Email"
          type="email"
          className="px-4 py-4 bg-slate-100 rounded-md "
        ></input>
        <span className="h-6 mt-1 text-xs text-red-500">
          {`${incorrectMailOrPassword ? "Incorrect Email or Password" : ""}`}
        </span>
        <input
          onChange={handleLoginFormChange}
          name="password"
          placeholder="Password"
          type="password"
          className="px-4 py-4 bg-slate-100 rounded-md "
        ></input>
        <div className="flex  items-center justify-between mt-8">
          <p>Forgot Password ?</p>
          <button
            onClick={handleLogin}
            type="submit"
            className="text-white bg-primary font-bold px-10 py-3 rounded-md"
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
};
export default LoginSection;
