import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeSection from "@/components/Marquee";
import Stats from "@/components/Stats";
import PainPoints from "@/components/PainPoints";
import Services from "@/components/Services";
import AboutDiego from "@/components/AboutDiego";
import ClientLogos from "@/components/ClientLogos";
import HowItWorks from "@/components/HowItWorks";
import Niches from "@/components/Niches";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import BookingCTA from "@/components/BookingCTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollAnimator from "@/components/ScrollAnimator";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <Hero />
    <MarqueeSection />
    <ScrollAnimator><Stats /></ScrollAnimator>
    <ScrollAnimator><PainPoints /></ScrollAnimator>
    <ScrollAnimator><Services /></ScrollAnimator>
    <ScrollAnimator><AboutDiego /></ScrollAnimator>
    <ScrollAnimator><ClientLogos /></ScrollAnimator>
    <ScrollAnimator><Niches /></ScrollAnimator>
    <ScrollAnimator><Testimonials /></ScrollAnimator>
    <ScrollAnimator><HowItWorks /></ScrollAnimator>
    <ScrollAnimator><FAQ /></ScrollAnimator>
    <ScrollAnimator><BookingCTA /></ScrollAnimator>
    <Footer />
    <WhatsAppButton />
  </div>
);

export default Index;
