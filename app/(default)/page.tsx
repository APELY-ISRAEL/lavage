
import HeroSection from "@/features/home/components/hero-section";
import Mission from "@/features/home/components/mission";
import NavbarComponent from "@/features/home/components/navbar";
import Tarif from "@/features/home/components/tarif";
import Transforme from "@/features/home/components/transforme";


export default function Home() {
    return (
      <>
        <NavbarComponent />
        <HeroSection /> 
        <Mission /> 
        <Tarif /> 
        <Transforme /> 

      </>
    );
  }