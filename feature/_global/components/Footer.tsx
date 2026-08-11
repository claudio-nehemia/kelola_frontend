import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <div className="bg-[#041336] text-white p-12 flex gap-35 justify-center items-center">
      <>
        <p>
          Jika Anda ingin menyesuaikan situs web, Anda dapat menghubungi kami.{" "}
          <br />
          If you want to customize the website, you can contact us.
        </p>
      </>

      <div>
        <h1 className="font-bold">Kontak kami / Contact Us</h1>
        <Link
          href="https://mail.google.com/mail/u/0/#inbox?compose=DmwnWrRmTwmPpnstGkwDLQwtqtMqzrQMzNxdGvKJkLdKqNbjrDzkSPLMTwWMDTLWctRPdvrfLFxg"
          target="_blank"
        >
          <div className="flex items-center gap-2">
            <Image
              src={"/gmail.png"}
              width={22}
              height={20}
              alt="Gmail"
              className="bg-white rounded-sm p-0.5"
              unoptimized
            />
            <p>yosuaebenezerr@gmail.com</p>
          </div>
        </Link>

        <Link href="https://www.instagram.com/yosuaebenezerr_" target="_blank">
          <div className="flex items-center gap-2">
            <Image
              src={"/instagram.png"}
              width={22}
              height={22}
              alt="Instagram"
              unoptimized
              className="bg-white rounded-sm p-0.5"
            />
            <p>yosuaebenezerr_</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
