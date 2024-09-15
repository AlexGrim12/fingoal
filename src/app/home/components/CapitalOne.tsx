// components/CapitalOneAd.tsx

import React from 'react'

export default function CapitalOneAd() {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-blue-900 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">
        ¡Haz que tus metas se hagan realidad con Capital One!
      </h2>

      <p className="text-center mb-4">
        💳 <strong>Obtenlo fácil, úsalo mejor:</strong>
      </p>
      <ul className="list-disc list-inside mb-6">
        <li>
          <strong>Crédito instantáneo</strong> para tus compras diarias.
        </li>
        <li>
          <strong>Cero cuotas ocultas</strong>, transparencia en todo momento.
        </li>
        <li>
          <strong>Recompensas</strong> en cada compra que te dan más por tu
          dinero.
        </li>
      </ul>

      <p className="text-center mb-4">
        🎯 <strong>Ventajas exclusivas para ti:</strong>
      </p>
      <ul className="list-disc list-inside mb-6">
        <li>
          <strong>Cashback</strong> en tus compras favoritas.
        </li>
        <li>
          <strong>Tasas de interés competitivas.</strong>
        </li>
        <li>
          <strong>Asistencia 24/7</strong>, estés donde estés.
        </li>
      </ul>

      <p className="text-center mb-4">
        🚀 <strong>¡No esperes más!</strong>
      </p>
      <p className="text-center mb-6">
        Descubre cómo Capital One puede darte el impulso que necesitas para
        alcanzar tus metas.
      </p>

      <a
        href="#"
        className="bg-yellow-500 text-blue-900 font-bold py-2 px-6 rounded-md hover:bg-yellow-400 transition duration-300"
      >
        Solicítalo ahora
      </a>
    </div>
  )
}
