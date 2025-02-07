import { redirect } from "next/navigation";

export default function Home() {
  // Redirigir al usuario al dashboard
  redirect("/login");
  return null;
}
