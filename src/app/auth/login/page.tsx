import { titleFont } from "@/conf/fonts";
import { LoginForm } from "./ui/LoginForm";
import { Suspense } from "react";
import { Spinner } from "@/components";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <h1 className={`${titleFont.className} text-4xl mb-5`}>Login</h1>

      <Suspense fallback={<Spinner />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
