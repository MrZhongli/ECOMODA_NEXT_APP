"use client";

import { useState } from "react";
import { Eye } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import ImageSlider from "@/components/image-slider";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    setError(null);

    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.error) {
        setError("Credenciales incorrectas. Inténtalo de nuevo.");
        setLoading(false);
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Error inesperado. Inténtalo de nuevo.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FF8BA7]/10 flex items-center justify-center p-4">
      <div className="w-full max-w-[1200px] bg-white rounded-[32px] shadow-2xl overflow-hidden flex">
        {/* Left side - Login form */}
        <div className="w-full md:w-1/2 p-12 flex flex-col">
          <div className="mb-16">
            <h1 className="text-2xl font-bold">ECOMODA</h1>
          </div>

          <div className="flex-1 flex flex-col justify-center max-w-[400px]">
            <h2 className="text-3xl font-semibold mb-2">Bienvenido de vuelta</h2>
            <p className="text-gray-500 mb-8">Ingresa tus datos para continuar</p>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {error && <p className="text-red-500 text-sm">{error}</p>}

              {/* Email Input */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Email</label>
                <input
                  {...register("email", { required: "El email es obligatorio" })}
                  type="email"
                  placeholder="Ingresa tu email"
                  className="w-full p-3 bg-[#FFF1F1] rounded-lg outline-none transition-colors placeholder:text-gray-400 focus:ring-2 focus:ring-[#FF8BA7]"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>

              {/* Password Input */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Contraseña</label>
                  <a href="#" className="text-sm text-gray-500 hover:text-[#FF8BA7] transition-colors">
                    ¿Has olvidado tu contraseña?
                  </a>
                </div>
                <div className="relative">
                  <input
                    {...register("password", { required: "La contraseña es obligatoria" })}
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingresa tu contraseña"
                    className="w-full p-3 bg-[#FFF1F1] rounded-lg outline-none transition-colors placeholder:text-gray-400 pr-10 focus:ring-2 focus:ring-[#FF8BA7]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <Eye size={20} />
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FF8BA7] text-white rounded-xl p-4 font-medium hover:bg-[#FF7C9C] transition-colors disabled:opacity-50"
              >
                {loading ? "Iniciando sesión..." : "Iniciar sesión"}
              </button>
            </form>
          </div>
        </div>

        {/* Right side - Image Slider */}
        <div className="hidden md:block md:w-1/2 relative bg-[#FFF1F1]">
          <div className="absolute inset-0 p-12">
            <ImageSlider />
          </div>
        </div>
      </div>
    </div>
  );
}
