export default function About() {
  return (
    <section className="p-12 text-white text-center flex flex-col justify-center lg:mx-32">
      <h2 className="text-4xl font-extrabold mb-6 text-center">
        What is Asterion Connect?
      </h2>
      <p className="text-lg mb-12 max-w-2xl mx-auto text-center">
        Asterion Connect is the revolutionary strategy that helps you achieve
        your financial goals with the support of a committed community and the
        powerful tools from CapitalOne.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          title="Set Your Goals"
          description="Create personalized financial goals and track your progress in real time."
        />
        <FeatureCard
          title="Connect and Share"
          description="Join a like-minded community and share your successes."
        />
        <FeatureCard
          title="Learn and Grow"
          description="Access personalized educational content and financial expert advice."
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
