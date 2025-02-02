import { TeamMember } from './TeamMemeber';
import { SectionHeader } from './SectionHeader';
import { MissionCard } from './MissionCard';
import { ServiceCard } from './ServiceCard';
import Charts from './Charts';
import { Link } from 'react-router-dom';

//VIDEO
import HeroVideo from '../../assets/Diseño sin título.mp4';

//CSS
import "./Smt.css";
import "./HeroStyle.css";

//ICONOS
import { FaChartBar, FaCog , FaFileAlt, FaHeadphones } from 'react-icons/fa';


function Hero() {
  const services = [
    {
      icon: FaChartBar,
      title: "Data Analysis",
      description: "Soluciones avanzadas de análisis para ayudarte a tomar decisiones basadas en datos y fomentar el crecimiento de tu economía."
    },
    {
      icon: FaCog ,
      title: "Optimización",
      description: "Funciones innovadoras y mejoras continuas para optimizar tu experiencia y potenciar el rendimiento de tu negocio."
    },
    {
      icon: FaFileAlt,
      title: "Treatment Report",
      description: "Informes completos y análisis de los resultados del tratamiento con información detallada"
    },
    {
      icon: FaHeadphones,
      title: "Soporte",
      description: "Equipo de soporte dedicado disponible las 24 horas para garantizar tu éxito y satisfacción."
    }
  ];

  return (
    <>
      <div id="landing" className="hero">
        <video autoPlay loop muted className="background-video">
          <source src={HeroVideo} type="video/mp4" />
          Tu navegador no soporta el video.
        </video>
        <div className="overlay"></div>
      </div>

      <div className="hero-text">
        <h1>STATS</h1>
        <p>Toma el control de tus finanzas sin complicaciones.</p>
      </div>

      <section id="proposito" className="section section-gradient">
        <div className="container">
          <SectionHeader 
            title="Nuestro Proposito" 
            subtitle="Ayudarte a alcanzar tu libertad financiera mediante una plataforma intuitiva que organiza, monitorea y gestiona tus ingresos y egresos de manera sencilla, ofreciendote información detallada y soporte administrativo para potenciar tus decisiones financieras."
          />
          <div className="grid grid-cols-2">
            <MissionCard
              title="Misión"
              description="Convertirnos en la pagina líder que simplifica la automatización de los flujos empresariales, proporcionando soluciones innovadoras y servicios que mejoran y avanzan sus negocios y gestos de forma ágil y que permita crecer de forma exponencial en el mercado."
            />
            <MissionCard
              title="Visión"
              description="Nos vemos en el futuro como personas innovadoras con un alto nivel de conocimiento en el mercado, con el propósito de ayudar a nuestros clientes a tomar el control de su operación financiera y administrativa mediante el diseño y desarrollo de soluciones."
            />
          </div>
        </div>
      </section>
      
      <section id="charts" className="section">
        <div className="container">
          <Charts/>
        </div>
      </section >
      <section id="team" className="section section-gradient">
        <div className="container">
          <SectionHeader 
            title="Partners" 
            subtitle="Conozca a los expertos detrás de nuestro éxito."
          />

          <div className="grid grid-cols-2">
            <Link to="https://www.google.com" target="_blank" rel="noopener noreferrer">
              <TeamMember
                image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800"
                name="TICKETS"
                role="Reporte de Errores"
              />
            </Link>
            <Link to="https://www.google.com" target="_blank" rel="noopener noreferrer">
              <TeamMember
                image="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800"
                name="VALORACIONES"
                role="Feedback"
              />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
