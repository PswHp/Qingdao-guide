import Header from './components/Header'
import Hero from './components/Hero'
import QuickInfo from './components/QuickInfo'
import Spots from './components/Spots'
import Food from './components/Food'
import Festival from './components/Festival'
import Tips from './components/Tips'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <QuickInfo />
        <Spots />
        <Food />
        <Festival />
        <Tips />
      </main>
      <Footer />
    </>
  )
}
