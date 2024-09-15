'use client'
import React, { useState } from 'react'
import { Navbar } from '../home/components'

// Define types for response data
interface SWOTAnalysis {
  SWOT: {
    opportunities: Record<string, string>
    strengths: Record<string, string>
    threats: Record<string, string>
    weaknesses: Record<string, string>
  }
  conclusion: string
  title: string
}

export default function Entrepreneurship() {
  const [formData, setFormData] = useState({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
  })

  const [response, setResponse] = useState<SWOTAnalysis | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('https://brunramirezg.pythonanywhere.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const json = (await res.json()) as SWOTAnalysis
      setResponse(json)
      console.log(json)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="flex min-h-screen text-white ">
      <div className="w-1/5 shadow-md">
        <Navbar />
      </div>
      <div className="flex flex-col items-center justify-center w-4/5 p-8">
        <h1 className="text-3xl font-bold mb-6">
          Research for Entrepreneurship
        </h1>
        <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-6">
          <div className="space-y-2">
            <label htmlFor="q1" className="block text-sm font-medium">
              What is your business name?
            </label>
            <input
              type="text"
              id="q1"
              name="q1"
              value={formData.q1}
              onChange={handleChange}
              required
              className="w-full p-2 bg-gray-800 rounded-md"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="q2" className="block text-sm font-medium">
              What is your business idea? (Describe in a few sentences)
            </label>
            <textarea
              id="q2"
              name="q2"
              value={formData.q2}
              onChange={handleChange}
              required
              className="w-full p-2 bg-gray-800 rounded-md"
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="q3" className="block text-sm font-medium">
              What problem does your business solve?
            </label>
            <textarea
              id="q3"
              name="q3"
              value={formData.q3}
              onChange={handleChange}
              required
              className="w-full p-2 bg-gray-800 rounded-md"
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="q4" className="block text-sm font-medium">
              How do you plan to make money? (selling products, subscription,
              advertising)
            </label>
            <textarea
              id="q4"
              name="q4"
              value={formData.q4}
              onChange={handleChange}
              required
              className="w-full p-2 bg-gray-800 rounded-md"
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="q5" className="block text-sm font-medium">
              What is your main target audience? (age group, interests,
              location)
            </label>
            <textarea
              id="q5"
              name="q5"
              value={formData.q5}
              onChange={handleChange}
              required
              className="w-full p-2 bg-gray-800 rounded-md"
              rows={3}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
        {/* Render the response */}
        {response && (
          <div className="mt-8 p-6 bg-gray-900 rounded-lg w-full max-w-3xl">
            <h2 className="text-2xl font-semibold mb-4">
              SWOT Analysis for {response.title}
            </h2>

            <div className="space-y-4">
              {/* Strengths */}
              <div>
                <h3 className="text-xl font-semibold text-green-400">
                  Strengths
                </h3>
                <ul className="list-disc list-inside ml-4">
                  {Object.entries(response.SWOT.strengths).map(
                    ([key, value]) => (
                      <li key={key}>{value}</li>
                    )
                  )}
                </ul>
              </div>

              {/* Weaknesses */}
              <div>
                <h3 className="text-xl font-semibold text-red-400">
                  Weaknesses
                </h3>
                <ul className="list-disc list-inside ml-4">
                  {Object.entries(response.SWOT.weaknesses).map(
                    ([key, value]) => (
                      <li key={key}>{value}</li>
                    )
                  )}
                </ul>
              </div>

              {/* Opportunities */}
              <div>
                <h3 className="text-xl font-semibold text-yellow-400">
                  Opportunities
                </h3>
                <ul className="list-disc list-inside ml-4">
                  {Object.entries(response.SWOT.opportunities).map(
                    ([key, value]) => (
                      <li key={key}>{value}</li>
                    )
                  )}
                </ul>
              </div>

              {/* Threats */}
              <div>
                <h3 className="text-xl font-semibold text-purple-400">
                  Threats
                </h3>
                <ul className="list-disc list-inside ml-4">
                  {Object.entries(response.SWOT.threats).map(([key, value]) => (
                    <li key={key}>{value}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold text-blue-400">
                Conclusion
              </h3>
              <p className="mt-2 text-gray-300">{response.conclusion}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
