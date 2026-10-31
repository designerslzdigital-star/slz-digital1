import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeSection from "@/components/Marquee";
import Stats from "@/components/Stats";
import PainPoints from "@/components/PainPoints";
import Services from "@/components/Services";
import AboutDiego from "@/components/AboutDiego";
import ClientLogos from "@/components/ClientLogos";
import { lazy, Suspense } from "react";
import Niches from "@/components/Niches";
import BookingCTA from "@/components/BookingCTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollAnimator from "@/components/ScrollAnimator";

const Testimonials = lazy(() => import("@/components/Testimonials"));
const FAQ = lazy(() => import("@/components/FAQ"));
const HowItWorks = lazy(() => import("@/components/HowItWorks"));

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
    <Suspense fallback={null}>
      <ScrollAnimator><Testimonials /></ScrollAnimator>
      <ScrollAnimator><HowItWorks /></ScrollAnimator>
      <ScrollAnimator><FAQ /></ScrollAnimator>
    </Suspense>
    <ScrollAnimator><BookingCTA /></ScrollAnimator>
    <Footer />
    <WhatsAppButton />
  </div>
);

export default Index;
