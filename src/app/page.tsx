import {
  HeaderLogout,
  About,
  CTA,
  Testimonials,
  Hero,
} from './(landing)/components'

export default function Home() {
  return (
    <main className="mx-auto bg-[radial-gradient(farthest-corner_at_80%_45%,#db1943_0%,#181627_50%)]">
      <div className="h-screen">
        <HeaderLogout />
        <Hero />
      </div>
      <About />
      <CTA />
      <Testimonials />
    </main>
  )
}
