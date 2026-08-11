import Image from "next/image";
import { FormLogin } from "../components/FormLogin";

export function LoginContainer() {
  return (
    <>
      <Image
        src="/logo-color.png"
        alt="Logo"
        width={350}
        height={200}
        unoptimized
      />
      <FormLogin />
    </>
  );
}
