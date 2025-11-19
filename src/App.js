import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Spline from '@splinetool/react-spline';
import Lenis from 'lenis';
import {
  Menu,
  X,
  MessageCircle,
  Linkedin,
  Youtube,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
} from 'lucide-react';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const servicesRef = useRef(null);
  const productsRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const footerRef = useRef(null);

  // Smooth scroll with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Connect Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Refresh ScrollTrigger after Lenis is initialized
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Header scroll effect
  useEffect(() => {
    const header = document.querySelector('.header');
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 50) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hero animations
  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.3,
        }
      );
    }

    const splineContainer = heroRef.current?.querySelector('.spline-container');
    if (splineContainer) {
      gsap.fromTo(
        splineContainer,
        { scale: 1.1 },
        {
          scale: 1,
          duration: 2,
          ease: 'power2.out',
        }
      );
    }
  }, []);

  // Services reveal
  useEffect(() => {
    const servicesSection = servicesRef.current;
    if (!servicesSection) return;

    const cards = servicesSection.querySelectorAll('.service-card');
    if (cards.length === 0) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: servicesSection,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === servicesSection || (trigger.vars && trigger.vars.trigger === servicesSection)) {
          trigger.kill();
        }
      });
    };
  }, []);

  // Global section reveal
  useEffect(() => {
    const sections = document.querySelectorAll('[data-scroll-reveal]');
    const triggers = [];

    sections.forEach(section => {
      const tween = gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
      if (tween.scrollTrigger) {
        triggers.push(tween.scrollTrigger);
      }
    });

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);

  // Products reveal
  useEffect(() => {
    const productsSection = productsRef.current;
    if (!productsSection) return;

    const cards = productsSection.querySelectorAll('.product-card');
    if (cards.length === 0) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: productsSection,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === productsSection || (trigger.vars && trigger.vars.trigger === productsSection)) {
          trigger.kill();
        }
      });
    };
  }, []);

  // About reveal
  useEffect(() => {
    const aboutSection = aboutRef.current;
    if (!aboutSection) return;

    const cards = aboutSection.querySelectorAll('.stat-card, .graph-card');
    if (cards.length === 0) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: aboutSection,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === aboutSection || (trigger.vars && trigger.vars.trigger === aboutSection)) {
          trigger.kill();
        }
      });
    };
  }, []);

  // Contact reveal
  useEffect(() => {
    const contactSection = contactRef.current;
    if (!contactSection) return;

    gsap.fromTo(
      contactSection,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contactSection,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === contactSection || (trigger.vars && trigger.vars.trigger === contactSection)) {
          trigger.kill();
        }
      });
    };
  }, []);

  // Footer animation
  useEffect(() => {
    const footerSection = footerRef.current;
    if (!footerSection) return;

    gsap.fromTo(
      footerSection,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerSection,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === footerSection || (trigger.vars && trigger.vars.trigger === footerSection)) {
          trigger.kill();
        }
      });
    };
  }, []);

  const products = [
    {
      id: 'aurora',
      name: 'Aurora Control Hub',
      description:
        'An edge-compute automation brain that harmonizes lighting, climate, AV, and security into one adaptive scene.',
      highlights: ['Self-healing mesh network', 'Zero-latency command routing', 'AI-assisted routine learning'],
    },
    {
      id: 'sentinel',
      name: 'Sentinel Vision Suite',
      description:
        'Computer-vision powered safeguards that recognize patterns, predict anomalies, and alert our concierge desk instantly.',
      highlights: ['Privacy-first edge analytics', 'Smart perimeter zoning', '24/7 remote stewardship'],
    },
    {
      id: 'pulse',
      name: 'Pulse Energy Canvas',
      description:
        'A live energy storyboard that balances solar, EV, and grid input to keep your residence efficient and resilient.',
      highlights: ['Carbon-aware automations', 'Microgrid readiness', 'Predictive maintenance cues'],
    },
  ];

  const services = [
    {
      title: 'Smart Home Strategy',
      description: 'We map every room, appliance, and routine to design an automation blueprint that feels effortless from day one.',
      benefits: ['Energy-aware device planning', 'Security-first architecture', 'Future-ready network design'],
    },
    {
      title: 'AI Experience Design',
      description: 'Custom voice and gesture journeys that surface the right scene, playlist, or workflow before you even ask.',
      benefits: ['Adaptive routines', 'Contextual voice scenes', 'Privacy-safe personalization'],
    },
    {
      title: '24/7 Concierge Monitoring',
      description: 'A dedicated command center that keeps an eye on your ecosystem, resolves alerts, and ships updates while you sleep.',
      benefits: ['Real-time diagnostics', 'Remote firmware care', 'White-glove on-site visits'],
    },
    {
      title: 'Integration Lab',
      description: 'From legacy lighting to the newest EV chargers, we make every gadget speak the same language using our in-house lab.',
      benefits: ['Hardware retrofits', 'API orchestration', 'Compliance & safety checks'],
    },
  ];

  const companyHighlights = [
    { label: 'Projects orchestrated', value: '480+', detail: 'Across villas, penthouses, and boutique offices.' },
    { label: 'Client satisfaction', value: '97%', detail: 'Measured via quarterly concierge interviews.' },
    { label: 'Average response', value: '< 12 min', detail: 'Concierge desk coverage around the clock.' },
  ];

  const performanceGraphs = [
    { label: 'Automation uptime', value: 99.3, description: 'Redundant nodes keep homes responsive.' },
    { label: 'Energy savings', value: 32, description: 'Median reduction achieved in the first 90 days.' },
    { label: 'Support resolution', value: 94, description: 'Tickets closed on the first touch.' },
  ];

  const contactDetails = [
    { icon: <MapPin size={20} />, label: 'Visit Us', value: 'Bangalore, Karnataka, India' },
    { icon: <Phone size={20} />, label: 'Call', value: '+91 9538123056/+91 8147910384 (24/7 concierge)' },
    { icon: <Mail size={20} />, label: 'Email', value: 'bhaskarpanditmn@gmail.com / revanthw24@gmail.com ' },
  ];

  const LogoMark = () => (
    <img 
      src="/kls-logo.png" 
      alt="KLS Solutions Logo" 
      className="h-12 w-auto"
    />
  );

  return (
    <div className="App bg-white text-black min-h-screen">
      {/* Header */}
      <header className="header fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <LogoMark />
              <div className="flex flex-col leading-tight">
                <span className="text-2xl font-bold text-black">KLS Solutions</span>
                <span className="text-xs tracking-[0.4em] uppercase text-gray-500">Tech</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#home" className="nav-link text-black hover:text-gray-700 transition-colors">
                Home
              </a>
              <a href="#services" className="nav-link text-black hover:text-gray-700 transition-colors">
                Services
              </a>
              <a href="#products" className="nav-link text-black hover:text-gray-700 transition-colors">
                Our Products
              </a>
              <a href="#about" className="nav-link text-black hover:text-gray-700 transition-colors">
                About
              </a>
              <a href="#contact" className="nav-link text-black hover:text-gray-700 transition-colors">
                Contact
              </a>
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <button 
                onClick={() => setShowSignUp(true)}
                className="cta-button px-6 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 font-medium"
              >
                Sign Up
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-black"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed top-20 left-0 right-0 bg-white border-t border-gray-200 transition-all duration-300 ${
            mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
          }`}
        >
          <nav className="container mx-auto px-4 py-6 space-y-4">
            <a href="#home" className="block text-black hover:text-gray-700 py-2">
              Home
            </a>
            <a href="#services" className="block text-black hover:text-gray-700 py-2">
              Services
            </a>
            <a href="#products" className="block text-black hover:text-gray-700 py-2">
              Our Products
            </a>
            <a href="#about" className="block text-black hover:text-gray-700 py-2">
              About
            </a>
            <a href="#contact" className="block text-black hover:text-gray-700 py-2">
              Contact
            </a>
            <button 
              onClick={() => {
                setShowSignUp(true);
                setMobileMenuOpen(false);
              }}
              className="w-full mt-4 px-6 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-all"
            >
              Sign Up
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" ref={heroRef} data-scroll-reveal className="hero-section relative w-full h-screen overflow-hidden">
        <div className="spline-container absolute inset-0 w-full h-full">
          <Spline 
            scene="https://prod.spline.design/z3D2bm3gZeZBwdke/scene.splinecode"
            onError={(error) => {
              console.warn('Spline scene failed to load:', error);
            }}
          />
        </div>
        <div className="absolute inset-0 flex items-start justify-center pt-20 sm:pt-32">
          <h1
            ref={titleRef}
            className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black text-center px-4 sm:px-8 max-w-5xl leading-tight"
          >
            Transform Your Home with Smart Automation
          </h1>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        ref={servicesRef}
        data-scroll-reveal
        className="services-section py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gray-50"
      >
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-4">Services</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              We build living spaces that anticipate you. From discovery workshops to concierge monitoring,
              every service is stitched together with obsessive attention to detail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
            {services.map((service) => (
              <div
                key={service.title}
                className="service-card bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-gray-400 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center">
                    <CheckCircle size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-black">{service.title}</h3>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-3">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start space-x-2 text-gray-800">
                      <span className="mt-1 w-2 h-2 rounded-full bg-black" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section
        id="products"
        ref={productsRef}
        data-scroll-reveal
        className="products-section py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
      >
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-3">Our Products</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-4">Intelligent systems built in-house</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Every product is engineered inside the KLS Integration Lab so your residence gets future-ready tech that is
              obsessively tested and concierge-supported.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="product-card h-full bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-gray-400 hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="mb-4">
                  <span className="text-xs font-semibold tracking-[0.4em] uppercase text-gray-500">KLS</span>
                  <h3 className="text-2xl font-bold text-black mt-2">{product.name}</h3>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed flex-1">{product.description}</p>
                <ul className="space-y-3 text-gray-800 text-sm">
                  {product.highlights.map((point) => (
                    <li key={point} className="flex items-start space-x-2">
                      <span className="w-2 h-2 rounded-full bg-black mt-1" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        ref={aboutRef}
        data-scroll-reveal
        className="about-section py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gray-50"
      >
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-3">About Us</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-6">
              We craft homes that feel choreographed, not automated.
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              KLS Tech Solutions began as a small crew of systems architects who believed that technology should feel
              poetic. Today, our ateliers in Bangalore and Dubai fine-tune lighting, acoustics, security, and energy so
              every routine feels curated. We partner with architects, hoteliers, and visionary homeowners to turn daily
              rituals into immersive experiences.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              From blueprint to lifetime concierge care, we stay beside you with proactive monitoring, hands-on
              interventions, and a culture of transparent craftsmanship.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              {companyHighlights.map((item) => (
                <div key={item.label} className="stat-card bg-white border-2 border-gray-200 rounded-2xl p-4 text-center">
                  <p className="text-sm uppercase tracking-widest text-gray-500">{item.label}</p>
                  <p className="text-2xl font-bold text-black my-2">{item.value}</p>
                  <p className="text-xs text-gray-600">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-black mb-6">Performance at a glance</h3>
            <div className="space-y-6">
              {performanceGraphs.map((metric) => (
                <div key={metric.label} className="graph-card">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">{metric.label}</p>
                    <span className="text-xl font-bold text-black">{metric.value}%</span>
                  </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-green-400 rounded-full"
                        style={{ width: `${Math.min(metric.value, 100)}%` }}
                      />
                    </div>
                  <p className="text-xs text-gray-600 mt-2">{metric.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={contactRef}
        data-scroll-reveal
        className="contact-section py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
      >
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">Contact</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-6">
              Tell us how your ideal day at home should feel.
            </h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Our architects respond within one business day with a curated playbook—no aggressive sales,
              just thoughtful ideas tailored to your routines, family, and goals.
            </p>

            <div className="space-y-5">
              {contactDetails.map((detail) => (
                <div key={detail.label} className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl border-2 border-gray-200 flex items-center justify-center text-black">
                    {detail.icon}
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-widest text-gray-500">{detail.label}</p>
                    <p className="text-lg font-medium text-black">{detail.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-black mb-4">Share your project</h3>
            <p className="text-gray-600 mb-6 text-sm">
              Tell us about timelines, priorities, or the smart features you have in mind. We will craft a custom response.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData.entries());
                console.log('Contact form submission:', data);
                alert('Thanks for reaching out! Our team will contact you shortly.');
                e.target.reset();
              }}
              className="space-y-5"
            >
              <div>
                <label htmlFor="project-name" className="block text-sm font-medium text-black mb-2">
                  Full Name
                </label>
                <input
                  id="project-name"
                  name="name"
                  required
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black text-black placeholder-gray-500"
                  placeholder="Ananya Kapoor"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="project-email" className="block text-sm font-medium text-black mb-2">
                    Email
                  </label>
                  <input
                    id="project-email"
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black text-black placeholder-gray-500"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="project-phone" className="block text-sm font-medium text-black mb-2">
                    Phone
                  </label>
                  <input
                    id="project-phone"
                    type="tel"
                    name="phone"
                    required
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black text-black placeholder-gray-500"
                    placeholder="+91 90000 00000"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="project-notes" className="block text-sm font-medium text-black mb-2">
                  What would you like us to build?
                </label>
                <textarea
                  id="project-notes"
                  name="message"
                  rows={4}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black text-black placeholder-gray-500"
                  placeholder="Describe your current home setup, wishlist, or any inspiration references."
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 font-medium text-lg"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        ref={footerRef}
        data-scroll-reveal
        className="footer bg-white border-t-2 border-gray-200 py-12 sm:py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-8">
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold text-black mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#home" className="text-gray-700 hover:text-black transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-gray-700 hover:text-black transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#products" className="text-gray-700 hover:text-black transition-colors">
                    Our Products
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-700 hover:text-black transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-700 hover:text-black transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="text-lg font-bold text-black mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://wa.me/+91-9538123056/+91-8147910384"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon w-10 h-10 border-2 border-black rounded-lg flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
                >
                  <MessageCircle size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/company/kls-tech-solutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon w-10 h-10 border-2 border-black rounded-lg flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://youtube.com/@klstechsolutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon w-10 h-10 border-2 border-black rounded-lg flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
                >
                  <Youtube size={20} />
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-bold text-black mb-4">Newsletter</h3>
              <p className="text-gray-700 mb-4 text-sm">
                Stay updated with the latest KLS Technews and updates
              </p>
              <form className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black text-black placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 font-medium whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 mt-8">
            <p className="text-center text-gray-600 text-sm">
              © 2024 KLS Tech Solution. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Sign Up Modal */}
      {showSignUp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-8 relative animate-fadeIn">
            <button
              onClick={() => setShowSignUp(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-black mb-2">Sign Up</h2>
              <p className="text-gray-600">Create your account to get started with smart home automation</p>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = {
                  name: formData.get('name'),
                  email: formData.get('email'),
                  phone: formData.get('phone'),
                  password: formData.get('password'),
                };
                console.log('Sign up data:', data);
                alert('Account created successfully! Welcome to KLS Tech Solution.');
                setShowSignUp(false);
              }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-black mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black text-black placeholder-gray-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black text-black placeholder-gray-500"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-black mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black text-black placeholder-gray-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-black mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  minLength={8}
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black text-black placeholder-gray-500"
                  placeholder="••••••••"
                />
                <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  required
                  className="w-4 h-4 border-2 border-gray-300 rounded focus:ring-black focus:ring-2"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                  I agree to the <a href="/terms" className="text-black underline">Terms of Service</a> and <a href="/privacy" className="text-black underline">Privacy Policy</a>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 font-medium text-lg"
              >
                Create Account
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={() => {
                    setShowSignUp(false);
                    // You can add login modal here later
                    alert('Login feature coming soon!');
                  }}
                  className="text-black font-medium hover:underline"
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
