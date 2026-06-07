import { Link } from 'react-router-dom';
import { useSiteUser } from '@/hooks/useSiteUser';
import { Instagram, MessageCircle } from 'lucide-react';

const Footer = () => {
  const { user } = useSiteUser();
  const rawPhone = user?.telefono_usuario?.replace(/\D/g, '') || '5210000000000';
  const whatsappMsg = encodeURIComponent("¡Hola Asesor Demo! Vi tu página de Agencia y me gustaría agendar un recorrido inmobiliario.");
  const whatsappUrl = `https://wa.me/${rawPhone}?text=${whatsappMsg}`;

  return (
    <footer className="bg-[#18181B] text-white pt-20 pb-10 px-6 md:px-12 border-t border-white/5 relative overflow-hidden">
      {/* Light glow aura */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="luxury-container">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-md">
            <Link to="/" className="flex items-center gap-1.5 mb-5 group">
              <span className="font-sans font-extrabold text-2xl tracking-tighter text-white">
                AGENCIA
              </span>
              <span className="font-accent text-4xl text-primary font-bold rotate-[-6deg] inline-block">
                Inmobiliaria
              </span>
            </Link>
            <p className="font-sans text-sm text-[#FAF6F0]/70 leading-relaxed max-w-sm">
              Asesoría inmobiliaria profesional para encontrar tu propiedad ideal.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 font-sans">
            <div>
              <h4 className="text-xs uppercase tracking-widest text-primary font-bold mb-4">Contacto</h4>
              <p className="text-sm text-[#FAF6F0]/70 mb-2">Querétaro Moderno • Zakia</p>
              <p className="text-sm text-[#FAF6F0]/70 mb-2">{user?.email_usuario ?? 'martha.match@homepty.com'}</p>
              <p className="text-sm text-[#FAF6F0]/70">{user?.telefono_usuario ?? '521 000 000 0000'}</p>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest text-primary font-bold mb-4">Redes</h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-primary/20 hover:border-primary/40 hover:scale-115 transition-all text-[#FAF6F0]"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-[#25D366]/20 hover:border-[#25D366]/40 hover:scale-115 transition-all text-[#FAF6F0]"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-xs text-[#FAF6F0]/50 flex flex-col sm:flex-row justify-between gap-4">
          <span>© {new Date().getFullYear()} Agencia. Todos los derechos reservados.</span>
          <div className="flex gap-4">
            <Link to="/solicita-inmueble" className="hover:text-primary transition-colors">Búsqueda Inteligente</Link>
            <Link to="/mapa" className="hover:text-primary transition-colors">Propiedades</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
