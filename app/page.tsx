import Link from "next/link";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        <Logo />

        <h1 className="mt-8 text-5xl font-bold text-gray-900">
          Meet, Chat & Connect Worldwide
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-600">
          Join HONEYMOON to make friends, build relationships,
          learn languages, and connect with people across the world.
        </p>

        <div className="mt-10 flex w-full max-w-sm flex-col gap-4 sm:flex-row">
          <Link href="/register" className="flex-1">
            <Button>Get Started</Button>
          </Link>

          <Link href="/login" className="flex-1">
            <Button variant="outline">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}