"use client"

import { useState } from "react"
import { Eye } from "lucide-react"
import ImageSlider from "@/components/image-slider"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

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

            <form className="space-y-6">
              <div className="space-y-1">
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  placeholder="Ingresa tu email"
                  className="w-full p-3 bg-[#FFF1F1] rounded-lg outline-none transition-colors placeholder:text-gray-400 focus:ring-2 focus:ring-[#FF8BA7]"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Contraseña</label>
                  <a href="#" className="text-sm text-gray-500 hover:text-[#FF8BA7] transition-colors">
                    ¿Has olvidado tu contraseña?
                  </a>
                </div>
                <div className="relative">
                  <input
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
              </div>

              <button
                type="submit"
                className="w-full bg-[#FF8BA7] text-white rounded-xl p-4 font-medium hover:bg-[#FF7C9C] transition-colors"
              >
                Iniciar sesión
              </button>
            </form>

            <div className="mt-8">
              <div className="text-center text-sm text-gray-500 mb-6">O inicia sesión con</div>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 p-3 border-2 border-[#FFF1F1] rounded-xl hover:border-[#FF8BA7] transition-colors">
                  <span className="text-sm font-medium">GOOGLE</span>
                </button>
                <button className="flex items-center justify-center gap-2 p-3 border-2 border-[#FFF1F1] rounded-xl hover:border-[#FF8BA7] transition-colors">
                  <span className="text-sm font-medium">FACEBOOK</span>
                </button>
              </div>
            </div>

            <div className="mt-8 text-center text-sm">
              <span className="text-gray-500">¿Todavía no tienes una cuenta? </span>
              <a href="#" className="text-[#FF8BA7] font-medium hover:underline">
                Crear cuenta
              </a>
            </div>
          </div>
        </div>

        {/* Right side - Image Slider with decorative elements */}
        <div className="hidden md:block md:w-1/2 relative bg-[#FFF1F1]">
          <div className="absolute inset-0 p-12">
            <ImageSlider />
          </div>
          {/* Decorative shapes */}
          <div className="absolute top-8 right-8 w-12 h-12 bg-[#FF8BA7] rounded-full opacity-50" />
          <div className="absolute bottom-8 left-8 w-16 h-8 bg-[#FF8BA7] rounded-full opacity-30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-[#FF8BA7] rounded-full opacity-20 blur-xl" />
        </div>
      </div>
    </div>
  )
}

