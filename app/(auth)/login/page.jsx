"use client";

import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebase";
import { Button } from "@nextui-org/react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user]);
  return (
    <main className="flex items-center justify-center w-full min-h-screen p-10 bg-gray-300 md:p-24">
      <section className="flex flex-col gap-3 ">
        <div className="flex justify-center">
          <img className="h-12" src="/logo.png" alt="Logo" />
        </div>
        <div className="flex flex-col gap-3 md:p-10 p-5 bg-white rounded-xl md:min-w-[440px] w-full">
          <h1 className="text-xl font-bold">Login With Email</h1>
          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              name="user-email"
              id="user-email"
              className="w-full px-3 py-2 border rounded-xl focus:outline-none"
            />
            <input
              type="password"
              placeholder="Enter your password"
              name="user-password"
              id="user-password"
              className="w-full px-3 py-2 border rounded-xl focus:outline-none"
            />
            <Button color="primary">Login</Button>
          </form>
          <div className="flex justify-between">
            <Link href={`/sign-up`}>
              <button className="text-sm font-semibold text-blue-700">
                New? Create Account
              </button>
            </Link>
            <Link href={`/forget-password`}>
              <button className="text-sm font-semibold text-blue-700">
                Forget password?
              </button>
            </Link>
          </div>
          <hr />
          <SignInWithGoogleComponent />
        </div>
      </section>
    </main>
  );
}

function SignInWithGoogleComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const user = await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (error) {
      toast.error(error?.message);
    }
    setIsLoading(false);
  };
  return (
    <Button isLoading={isLoading} isDisabled={isLoading} onClick={handleLogin}>
      Sign In With Google
    </Button>
  );
}
