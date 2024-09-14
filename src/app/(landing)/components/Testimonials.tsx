'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Define the props type for a single testimonial
interface TestimonialProps {
  quote: string
  author: string
}

// Define the structure for an array of testimonials
interface TestimonialData {
  quote: string
  author: string
}

// The component that renders an individual testimonial
function Testimonial({ quote, author }: TestimonialProps) {
  return (
    <blockquote className="bg-white bg-opacity-15 p-8 rounded-lg shadow-xl text-white">
      <p className="text-lg mb-4 leading-relaxed">&quot;{quote}&quot;</p>
      <footer className="text-right font-bold">- {author}</footer>
    </blockquote>
  )
}

export default function Testimonials() {
  // Testimonials array with correct type definition
  const testimonials: TestimonialData[] = [
    {
      quote:
        'Gracias a FinGoal Connect, logré ahorrar para mi primera casa en tiempo récord. ¡La comunidad es increíble!',
      author: 'María G.',
    },
    {
      quote:
        'Estoy muy agradecido por el apoyo y la orientación que he recibido de la comunidad. ¡Gracias, FinGoal!',
      author: 'Juan P.',
    },
    // Puedes agregar más testimonios aquí
  ]

  // State to track the current index of the testimonials
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  // Handlers to navigate between testimonials
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    )
  }

  return (
    <section className="p-6 lg:m-36 text-center">
      <h2 className="text-3xl font-extrabold mb-8 text-white">
        Lo que dicen nuestros usuarios
      </h2>
      <div className="relative max-w-4xl mx-auto px-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <Testimonial {...testimonials[currentIndex]} />
          </motion.div>
        </AnimatePresence>

        <button
          onClick={prevTestimonial}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:scale-105 transition-transform duration-300"
        >
          <ChevronLeft className="w-6 h-6 text-indigo-700" />
        </button>
        <button
          onClick={nextTestimonial}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:scale-105 transition-transform duration-300"
        >
          <ChevronRight className="w-6 h-6 text-indigo-700" />
        </button>
      </div>
    </section>
  )
}
