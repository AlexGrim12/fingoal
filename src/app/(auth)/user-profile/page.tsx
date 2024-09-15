'use client'
import { useState } from 'react'

export default function UserProfileForm() {
  const [, setQ1] = useState('')
  const [, setQ2] = useState('')
  const [, setQ3] = useState('')
  const [, setQ4] = useState('')
  const [, setQ5] = useState('')
  const [, setQ6] = useState('')
  const [, setQ7] = useState('')
  const [, setQ8] = useState('')
  const [, setQ9] = useState('')
  const [, setQ10] = useState('')
  const [loading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Extraer los valores seleccionados del formulario
    // const formData = {
    //   q1: q1,
    //   q2: q2,
    //   q3: q3,
    //   q4: q4,
    //   q5: q5,
    //   q6: q6,
    //   q7: q7,
    //   q8: q8,
    //   q9: q9,
    //   q10: q10,
    // }
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div
        className="bg-white p-8 rounded-md shadow-md w-full max-w-md"
        style={{
          background: 'rgba( 255, 255, 255, 0.25 )',
          boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
          backdropFilter: 'blur( 4px )',
          WebkitBackdropFilter: 'blur( 4px )',
          borderRadius: '10px',
          border: '1px solid rgba( 255, 255, 255, 0.18 )',
        }}
      >
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Complete Your Profile
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="q1" className="block text-white mb-2">
              Q1: Do you have a personal savings account or use any other
              savings methods?
            </label>

            <select
              id="q1"
              className="w-full px-3 py-2 rounded bg-white-700 text-zinc-900"
              onChange={(e) => setQ1(e.target.value)}
              required
            >
              <option value="">Seleccionar</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <label htmlFor="q2" className="block text-white mb-2">
              Q2: How often do you track your expenses and budget?
            </label>

            <select
              id="q2"
              className="w-full px-3 py-2 rounded bg-white-700 text-zinc-900"
              onChange={(e) => setQ2(e.target.value)}
              required
            >
              <option value="">Seleccionar</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Almost never">Almost never</option>
            </select>

            <label htmlFor="q3" className="block text-white mb-2">
              Q3: Do you currently have any investments (e.g., stocks, bonds,
              mutual funds)?
            </label>

            <select
              id="q3"
              className="w-full px-3 py-2 rounded bg-white-700 text-zinc-900"
              onChange={(e) => setQ3(e.target.value)}
              required
            >
              <option value="">Seleccionar</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <label htmlFor="q4" className="block text-white mb-2">
              Q4: Have you ever applied for a loan (personal, car, mortgage,
              etc.)?
            </label>

            <select
              id="q4"
              className="w-full px-3 py-2 rounded bg-white-700 text-zinc-900"
              onChange={(e) => setQ4(e.target.value)}
              required
            >
              <option value="">Seleccionar</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <label htmlFor="q5" className="block text-white mb-2">
              Q5: Do you regularly use a credit card?
            </label>

            <select
              id="q5"
              className="w-full px-3 py-2 rounded bg-white-700 text-zinc-900"
              onChange={(e) => setQ5(e.target.value)}
              required
            >
              <option value="">Seleccionar</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <label htmlFor="q6" className="block text-white mb-2">
              Q6: Are you familiar with the concept of interest rates and how
              they affect loans and savings?
            </label>

            <select
              id="q6"
              className="w-full px-3 py-2 rounded bg-white-700 text-zinc-900"
              onChange={(e) => setQ6(e.target.value)}
              required
            >
              <option value="">Seleccionar</option>
              <option value="Very familiar">Very familiar</option>
              <option value="Somewhat familiar">Somewhat familiar</option>
              <option value="Not familiar">Not familiar</option>
            </select>

            <label htmlFor="q7" className="block text-white mb-2">
              Q7: Have you ever created or followed a financial plan for
              long-term goals (retirement, education, etc.)?
            </label>

            <select
              id="q7"
              className="w-full px-3 py-2 rounded bg-white-700 text-zinc-900"
              onChange={(e) => setQ7(e.target.value)}
              required
            >
              <option value="">Seleccionar</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <label htmlFor="q8" className="block text-white mb-2">
              Q8: How do you primarily manage your finances?
            </label>

            <select
              id="q8"
              className="w-full px-3 py-2 rounded bg-white-700 text-zinc-900"
              onChange={(e) => setQ8(e.target.value)}
              required
            >
              <option value="">Seleccionar</option>
              <option value="Traditional banks">Traditional banks</option>
              <option value="Online banking apps">Online banking apps</option>
              <option value="Cash only">Cash only</option>
            </select>

            <label htmlFor="q9" className="block text-white mb-2">
              Q9: Do you use mobile apps or tools to manage your finances
              (budgeting, investments, savings)?
            </label>

            <select
              id="q9"
              className="w-full px-3 py-2 rounded bg-white-700 text-zinc-900"
              onChange={(e) => setQ9(e.target.value)}
              required
            >
              <option value="">Seleccionar</option>
              <option value="Yes, regularly">Yes, regularly</option>
              <option value="Yes, occasionally">Yes, occasionally</option>
              <option value="No">No</option>
            </select>

            <label htmlFor="q10" className="block text-white mb-2">
              Q10: Do you have any debts (credit card, loans, etc.) that you are
              currently repaying?
            </label>

            <select
              id="q10"
              className="w-full px-3 py-2 rounded bg-white-700 text-zinc-900"
              onChange={(e) => setQ10(e.target.value)}
              required
            >
              <option value="">Seleccionar</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full text-white rounded-lg bg-white bg-opacity-20 p-2 hover:bg-white hover:bg-opacity-30 transition duration-300 ease-in-out cursor-pointer"
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Complete Profile'}
          </button>
        </form>
      </div>
    </div>
  )
}
