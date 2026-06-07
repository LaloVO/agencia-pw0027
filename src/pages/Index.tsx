import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroMatch from '@/components/home/HeroMatch';
import ValuesNotes from '@/components/home/ValuesNotes';
import PropertiesSection from '@/components/home/PropertiesSection';
import BioShell from '@/components/home/BioShell';
import SmartSearchBanner from '@/components/home/SmartSearchBanner';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Agencia | Asesor Demo — Asesora Inmobiliaria</title>
        <meta
          name="description"
          content="Encuentra la casa o departamento que realmente hace match contigo. Asesor Demo te acompaña de manera intencional y transparente."
        />
      </Helmet>

      <Navbar />

      <main>
        <HeroMatch />
        <ValuesNotes />
        <PropertiesSection />
        <BioShell />
        <SmartSearchBanner />
      </main>

      <Footer />
    </>
  );
};

export default Index;
