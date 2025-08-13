import MiniHeader from './components/MiniHeader'
import Header from './components/Header'
import HeroSlider from './components/HeroSlider'
import FilterSection from './components/FilterSection'
import AboutGreenBuilding from './components/AboutGreenBuilding'
import BrowseDesigns from './components/BrowseDesigns'
import DesignerSection from './components/DesignerSection'
import FeaturedHomePlans from './components/FeaturedHomePlans'
import NewHousePlans from './components/NewHousePlans'
import Community from './components/Community'
import HowItWorks from './components/HowItWorks'
import GreenNews from './components/GreenNews'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen">
      <MiniHeader />
      <Header />
      <HeroSlider />
      <FilterSection />
      <AboutGreenBuilding />
      <BrowseDesigns />
      <DesignerSection />
      <FeaturedHomePlans />
      <NewHousePlans />
      <Community />
      <HowItWorks />
      <GreenNews />
      <Newsletter />
      <Footer />
    </div>
  )
}