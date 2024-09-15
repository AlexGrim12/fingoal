import Image from 'next/image'
import hero from '../assets/Hero.png'
import Link from 'next/link'

export default function Hero() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center px-8 h-4/5 lg:mx-32 mt-12">
      <div className="text-center md:text-left">
        <h1 className="text-5xl font-extrabold text-white tracking-tight">
          AsterionConnect
        </h1>
        <p className="mt-4 mb-8 text-xl text-white max-w-md">
          Alcanza tus metas financieras en comunidad
        </p>
        <Link href={'/register'}>
          <button className="mt-6 px-8 py-3 bg-indigo-600 text-white rounded-lg text-lg font-bold hover:bg-indigo-500 transition-transform transform hover:scale-105 duration-300 ease-in-out shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:ring-offset-2">
            ¡Únete ahora!
          </button>
        </Link>
      </div>
      <div className="mt-8 md:mt-0">
        <Image
          src={hero}
          alt="FinGoal Connect hero"
          width={450}
          height={450}
          className="transform hover:scale-105 transition-transform duration-500"
        />
      </div>
    </div>
  )
}
