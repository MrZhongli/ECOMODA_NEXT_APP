"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const images = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DI5ggwQnCeykIZGxOvJVDiajQ9rm4r.png",
    alt: "Conjunto casual con camisa blanca, jeans y sandalias rojas",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-0csqIXckA9lPdpypL9pXtk0pf8S5PZ.png",
    alt: "Conjunto minimalista con suéter blanco y jeans",
  },
]

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const goToNext = () => {
    setCurrentIndex((current) => (current + 1) % images.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((current) => (current - 1 + images.length) % images.length)
  }

  return (
    <div className="relative h-full w-full rounded-2xl overflow-hidden">
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={image.src}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover rounded-2xl"
              priority
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-[#FF8BA7] w-4" : "bg-[#FF8BA7]/50"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm text-[#FF8BA7] p-2 rounded-full hover:bg-white/20 transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm text-[#FF8BA7] p-2 rounded-full hover:bg-white/20 transition-colors"
        aria-label="Next image"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  )
}

