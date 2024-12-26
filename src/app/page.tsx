import { redirect } from "next/navigation";

export default function Home() {
  // Redirigir al usuario al dashboard
  redirect("/dashboard");
  return null; // Este componente no necesita renderizar nada
}
