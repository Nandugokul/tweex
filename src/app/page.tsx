import Image from "next/image";
import LoginImg from "../../public/assets/loginImg.jpg";
import DynamicSection from "@/components/loginSignUp/DynamicSection";

const App = () => {
  return (
    <>
      <section className="flex">
        <div className="w-1/2 h-[100vh] pt-10">
          <h1 className="text-primary font-bold text-4xl mb-10">TweeX</h1>
          <DynamicSection />
        </div>
        <div className="relative w-1/2 h-[100vh] flex items-center">
          <Image
            src={LoginImg}
            alt="Login image"
            className="fixed w-1/2 "
            priority
          />
        </div>
      </section>
    </>
  );
};
export default App;
