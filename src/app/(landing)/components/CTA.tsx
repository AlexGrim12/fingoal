import Link from 'next/link'

export default function CTA() {
  return (
    <section className="mx-2 mb-4 p-12 lg:m-36 bg-white bg-opacity-5 text-center rounded-lg shadow-lg">
      <h2 className="text-4xl font-extrabold mb-6 text-white">
        Ready to transform your finances?
      </h2>
      <p className="text-lg mb-8 text-white max-w-xl mx-auto">
        Join FinGoal Connect today and begin your journey to financial success
        with the support of a dedicated community.
      </p>
      <Link href={'/register'}>
        <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg text-lg font-bold hover:bg-indigo-500 transition-transform transform hover:scale-105 duration-300 ease-in-out shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:ring-offset-2">
          Join Now!
        </button>
      </Link>
    </section>
  )
}
