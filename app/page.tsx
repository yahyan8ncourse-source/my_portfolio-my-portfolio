import Image from 'next/image'
import Hero from "@/components/main/Hero";
import Skills from "@/components/main/Skills";
import Encryption from "@/components/main/Encryption";
import Projects from "@/components/main/Projects";
import AboutSection from '@/components/main/About';


export default function Home() {
  return (
      <main className="h-full w-full">
          <div className="flex flex-col gap-20">
              <Hero />
              <AboutSection/>
              <Skills />
              <Projects />
              <Encryption />
          </div>
      </main>
  )
}
