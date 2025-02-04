import Link from "next/link";
import { Header } from "./_components/header";
import { Display } from "./_components/display";

export default function HomePage() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-12 bg-background p-12">
      <Header className="h-[10vh]" />
      <Display className="h-[80vh]" />
    </main>
  );
}
