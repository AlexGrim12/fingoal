export default function About() {
  return (
    <section
      className="p-12 text-white text-center flex flex-col justify-center lg:mx-32
    "
    >
      <h2 className="text-4xl font-extrabold mb-6 text-center">
        ¿Qué es FinGoal Connect?
      </h2>
      <p className="text-lg mb-12 max-w-2xl mx-auto text-center">
        FinGoal Connect es la revolucionaria red social que te ayuda a alcanzar
        tus metas financieras con el apoyo de una comunidad comprometida y las
        poderosas herramientas de CapitalOne.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          title="Establece tus metas"
          description="Crea metas financieras personalizadas y sigue tu progreso en tiempo real."
        />
        <FeatureCard
          title="Conecta y comparte"
          description="Únete a una comunidad de personas con mentalidad similar y comparte tus éxitos."
        />
        <FeatureCard
          title="Aprende y crece"
          description="Accede a contenido educativo personalizado y consejos de expertos financieros."
        />
      </div>
    </section>
  )
}

interface FeatureCardProps {
  title: string
  description: string
}

function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="bg-white bg-opacity-20 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-opacity-90">{description}</p>
    </div>
  )
}
