import { titleFont } from "@/conf/fonts";
import Image from "next/image";
import Link from "next/link";

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row h-full w-full justify-center items-center align-middle">
      <div className="text-center px-5 mx-5">
        <h2 className={`${titleFont.className} antialiased text-9xl`}>404</h2>
        <p className="font-semibold text-xl">Woops! We are very sorry.</p>
        <p className="font-light">
          <span>I can come back to </span>
          <Link className="font-normal hover:underline transition-all" href="/">
            home
          </Link>
        </p>
      </div>
      <div className="mx-5 px-5">
        <Image
          src="/imgs/starman_750x750.png"
          alt="Starman"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};
