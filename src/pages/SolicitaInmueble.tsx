import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FormularioMultiStep from "@/components/home/FormularioMultiStep";
import { useSiteUser } from "@/hooks/useSiteUser";

export default function SolicitaInmueble() {
  const { user } = useSiteUser();

  return (
    <>
      <Helmet>
        <title>Búsqueda Inteligente | Match Houses</title>
        <meta
          name="description"
          content="Completa nuestra solicitud inteligente de 6 pasos para encontrar tu propiedad de lujo ideal. Evaluamos tu estilo de vida para una recomendación perfecta."
        />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-[#FAF6F0] dark:bg-[#09090B] pt-24 pb-20 relative overflow-hidden">
        {/* Glow auras */}
        <div className="absolute top-40 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#EAB308]/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-5 font-sans relative z-10">
          {/* Header de la Sección */}
          <div className="text-center mb-10 space-y-2">
            <h1 className="font-black text-3xl sm:text-4xl md:text-5xl text-[#18181B] dark:text-[#FAF6F0] tracking-tight leading-none pt-4">
              BÚSQUEDA INTELIGENTE INMOBILIARIA
            </h1>
            <p className="text-sm sm:text-base text-[#18181B]/75 dark:text-[#FAF6F0]/75 max-w-2xl mx-auto leading-relaxed">
              Define tu presupuesto, expediente y cuéntanos sobre tu rutina diaria. Nuestro motor buscará y filtrará las mejores residencias exclusivas para ti.
            </p>
          </div>

          {/* Formulario MultiStep wrapper with claymorphic glass styling */}
          <div className="backdrop-blur-xl bg-white/70 dark:bg-[#121214]/70 border border-black/5 dark:border-white/10 p-6 sm:p-10 shadow-elegant rounded-[36px]">
            <FormularioMultiStep />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
