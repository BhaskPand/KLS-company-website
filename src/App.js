import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Spline from '@splinetool/react-spline';
import Lenis from 'lenis';
import { Menu, X, ArrowRight, ExternalLink, MessageCircle, Twitter, Youtube } from 'lucide-react';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [selectedWorlds, setSelectedWorlds] = useState(['decentraland', 'sandbox']);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const featuredRef = useRef(null);
  const comparisonRef = useRef(null);
  const metaSpacesRef = useRef(null);
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
    let lastScroll = 0;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 50) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
      lastScroll = currentScroll;
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

  // Featured Worlds animations
  useEffect(() => {
    if (!featuredRef.current) return;

    const cards = featuredRef.current.querySelectorAll('.world-card');
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: featuredRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    const heading = featuredRef.current.querySelector('.section-heading');
    if (heading) {
      gsap.fromTo(
        heading,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: featuredRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === featuredRef.current || (trigger.vars && trigger.vars.trigger === featuredRef.current)) {
          trigger.kill();
        }
      });
    };
  }, []);

  // Comparison animations
  useEffect(() => {
    if (!comparisonRef.current) return;

    const rows = comparisonRef.current.querySelectorAll('.comparison-row');
    if (rows.length > 0) {
      gsap.fromTo(
        rows,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: comparisonRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === comparisonRef.current || (trigger.vars && trigger.vars.trigger === comparisonRef.current)) {
          trigger.kill();
        }
      });
    };
  }, []);

  // MetaSpaces horizontal scroll
  useEffect(() => {
    if (!metaSpacesRef.current) return;

    const container = metaSpacesRef.current.querySelector('.metaspaces-container');
    if (!container) return;

    const cards = container.querySelectorAll('.metaspace-card');
    
    const scrollWidth = container.scrollWidth - window.innerWidth;
    
    if (scrollWidth > 0) {
      const scrollTrigger = gsap.to(container, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: metaSpacesRef.current,
          start: 'top top',
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Card fade-in animations
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: metaSpacesRef.current,
              start: 'top 50%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === metaSpacesRef.current || (trigger.vars && trigger.vars.trigger === metaSpacesRef.current)) {
          trigger.kill();
        }
      });
    };
  }, []);

  // Footer animation
  useEffect(() => {
    if (!footerRef.current) return;

    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === footerRef.current || (trigger.vars && trigger.vars.trigger === footerRef.current)) {
          trigger.kill();
        }
      });
    };
  }, []);

  const worlds = [
    {
      id: 'decentraland',
      name: 'Decentraland',
      description: 'A virtual world where you can build, explore, and monetize your creations.',
      logo: 'https://via.placeholder.com/80',
      activeUsers: '8,000+',
      avgLandPrice: '1,200 MANA',
      token: 'MANA',
    },
    {
      id: 'sandbox',
      name: 'The Sandbox',
      description: 'A community-driven gaming platform where creators can monetize voxel assets.',
      logo: 'https://via.placeholder.com/80',
      activeUsers: '12,000+',
      avgLandPrice: '2,500 SAND',
      token: 'SAND',
    },
    {
      id: 'otherside',
      name: 'Otherside',
      description: 'Yuga Labs metaverse combining storytelling, gaming, and social experiences.',
      logo: 'https://via.placeholder.com/80',
      activeUsers: '5,000+',
      avgLandPrice: '3,500 APE',
      token: 'APE',
    },
    {
      id: 'somnium',
      name: 'Somnium Space',
      description: 'An open, social virtual reality world built on the blockchain.',
      logo: 'https://via.placeholder.com/80',
      activeUsers: '3,000+',
      avgLandPrice: '1,800 CUBE',
      token: 'CUBE',
    },
    {
      id: 'voxels',
      name: 'Voxels',
      description: 'A virtual world and metaverse powered by the Ethereum blockchain.',
      logo: 'https://via.placeholder.com/80',
      activeUsers: '4,000+',
      avgLandPrice: '900 ETH',
      token: 'ETH',
    },
    {
      id: 'cryptovoxels',
      name: 'Cryptovoxels',
      description: 'A virtual world, a metaverse, running entirely on the Ethereum blockchain.',
      logo: 'https://via.placeholder.com/80',
      activeUsers: '2,500+',
      avgLandPrice: '1,100 ETH',
      token: 'ETH',
    },
  ];

  const comparisonData = {
    decentraland: {
      token: 'MANA',
      tokenPrice: '$0.45',
      avgLandPrice: '1,200 MANA',
      activeUsers: '8,000+',
      vrSupport: 'Yes',
      marketplace: 'https://market.decentraland.org',
    },
    sandbox: {
      token: 'SAND',
      tokenPrice: '$0.38',
      avgLandPrice: '2,500 SAND',
      activeUsers: '12,000+',
      vrSupport: 'Partial',
      marketplace: 'https://www.sandbox.game/marketplace',
    },
    otherside: {
      token: 'APE',
      tokenPrice: '$1.25',
      avgLandPrice: '3,500 APE',
      activeUsers: '5,000+',
      vrSupport: 'Yes',
      marketplace: 'https://otherside.xyz',
    },
    somnium: {
      token: 'CUBE',
      tokenPrice: '$0.12',
      avgLandPrice: '1,800 CUBE',
      activeUsers: '3,000+',
      vrSupport: 'Yes',
      marketplace: 'https://somniumspace.com',
    },
  };

  const metaSpaces = [
    {
      id: 1,
      title: 'Concert Hall',
      world: 'Decentraland',
      category: 'Entertainment',
      image: 'https://via.placeholder.com/600x400',
      description: 'Experience live concerts and music events in a stunning virtual venue with immersive audio.',
      link: 'https://decentraland.org',
    },
    {
      id: 2,
      title: 'NFT Gallery',
      world: 'The Sandbox',
      category: 'Art & Culture',
      image: 'https://via.placeholder.com/600x400',
      description: 'Explore curated collections of digital art and NFTs in this beautifully designed gallery space.',
      link: 'https://sandbox.game',
    },
    {
      id: 3,
      title: 'Brand Experience',
      world: 'Otherside',
      category: 'Commerce',
      image: 'https://via.placeholder.com/600x400',
      description: 'Interactive brand showcases and virtual shopping experiences in a premium metaverse location.',
      link: 'https://otherside.xyz',
    },
    {
      id: 4,
      title: 'Gaming Arena',
      world: 'Somnium Space',
      category: 'Gaming',
      image: 'https://via.placeholder.com/600x400',
      description: 'Competitive gaming tournaments and esports events in a state-of-the-art virtual arena.',
      link: 'https://somniumspace.com',
    },
    {
      id: 5,
      title: 'Virtual Office',
      world: 'Decentraland',
      category: 'Business',
      image: 'https://via.placeholder.com/600x400',
      description: 'Professional workspace for remote teams with collaboration tools and meeting rooms.',
      link: 'https://decentraland.org',
    },
  ];

  return (
    <div className="App bg-white text-black min-h-screen">
      {/* Header */}
      <header className="header fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">K</span>
              </div>
              <span className="text-2xl font-bold text-black">KLS Tech Solution</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#explore" className="nav-link text-black hover:text-gray-700 transition-colors">
                Explore
              </a>
              <a href="#compare" className="nav-link text-black hover:text-gray-700 transition-colors">
                Compare
              </a>
              <a href="#metaspaces" className="nav-link text-black hover:text-gray-700 transition-colors">
                MetaSpaces
              </a>
              <a href="#events" className="nav-link text-black hover:text-gray-700 transition-colors">
                MetaEvents
              </a>
              <a href="#blog" className="nav-link text-black hover:text-gray-700 transition-colors">
                Blog
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
            <a href="#explore" className="block text-black hover:text-gray-700 py-2">
              Explore
            </a>
            <a href="#compare" className="block text-black hover:text-gray-700 py-2">
              Compare
            </a>
            <a href="#metaspaces" className="block text-black hover:text-gray-700 py-2">
              MetaSpaces
            </a>
            <a href="#events" className="block text-black hover:text-gray-700 py-2">
              MetaEvents
            </a>
            <a href="#blog" className="block text-black hover:text-gray-700 py-2">
              Blog
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
      <section ref={heroRef} className="hero-section relative w-full h-screen overflow-hidden">
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

      {/* Featured Worlds Section */}
      <section
        id="explore"
        ref={featuredRef}
        className="featured-worlds py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
      >
        <div className="container mx-auto">
          <h2 className="section-heading text-4xl sm:text-5xl font-bold text-black text-center mb-4 sm:mb-6">
            Featured Worlds
          </h2>
          <p className="text-center text-gray-700 mb-12 sm:mb-16 max-w-2xl mx-auto">
            Discover the most popular and innovative metaverse platforms
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {worlds.map((world) => (
              <div
                key={world.id}
                className="world-card bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-gray-400 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={world.logo}
                    alt={world.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-black">{world.name}</h3>
                    <p className="text-sm text-gray-600">{world.token}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 text-sm leading-relaxed">{world.description}</p>
                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Users:</span>
                    <span className="text-black font-medium">{world.activeUsers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg Land Price:</span>
                    <span className="text-black font-medium">{world.avgLandPrice}</span>
                  </div>
                </div>
                <button className="w-full py-2.5 border-2 border-black text-black rounded-lg hover:bg-black hover:text-white transition-all duration-300 font-medium">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* World Comparison Tool */}
      <section
        id="compare"
        ref={comparisonRef}
        className="comparison-section py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gray-50"
      >
        <div className="container mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-black text-center mb-4 sm:mb-6">
            Compare Worlds
          </h2>
          <p className="text-center text-gray-700 mb-12 sm:mb-16 max-w-2xl mx-auto">
            Select up to 3 metaverse worlds to compare their features and stats
          </p>

          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            {[0, 1, 2].map((index) => (
              <select
                key={index}
                value={selectedWorlds[index] || ''}
                onChange={(e) => {
                  const value = e.target.value;
                  const newSelected = [...selectedWorlds];
                  if (value) {
                    newSelected[index] = value;
                  } else {
                    newSelected.splice(index, 1);
                  }
                  setSelectedWorlds(newSelected.filter(Boolean));
                }}
                className="px-4 py-2 border-2 border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:border-black min-w-[200px]"
              >
                <option value="">Select World {index + 1}</option>
                {worlds
                  .filter((w) => !selectedWorlds.includes(w.id) || selectedWorlds[index] === w.id)
                  .map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.name}
                    </option>
                  ))}
              </select>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-black text-white">
                  <th className="px-4 py-4 text-left font-bold">World</th>
                  <th className="px-4 py-4 text-left font-bold">Token & Price</th>
                  <th className="px-4 py-4 text-left font-bold">Avg Land Price</th>
                  <th className="px-4 py-4 text-left font-bold">Active Users</th>
                  <th className="px-4 py-4 text-left font-bold">VR Support</th>
                  <th className="px-4 py-4 text-left font-bold">Marketplace</th>
                </tr>
              </thead>
              <tbody>
                {selectedWorlds.map((worldId, index) => {
                  const world = worlds.find((w) => w.id === worldId);
                  const data = comparisonData[worldId];
                  if (!world || !data) return null;

                  const isBest = index === 0; // First selected is "best choice"

                  return (
                    <tr
                      key={worldId}
                      className={`comparison-row border-t border-gray-200 ${
                        isBest ? 'bg-gray-100 font-bold' : ''
                      }`}
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-black font-medium">{world.name}</span>
                          {isBest && (
                            <span className="text-xs bg-black text-white px-2 py-1 rounded">
                              Best Choice
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-black">
                        {data.token} ({data.tokenPrice})
                      </td>
                      <td className="px-4 py-4 text-black">{data.avgLandPrice}</td>
                      <td className="px-4 py-4 text-black">{data.activeUsers}</td>
                      <td className="px-4 py-4 text-black">{data.vrSupport}</td>
                      <td className="px-4 py-4">
                        <a
                          href={data.marketplace}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-black hover:text-gray-700 flex items-center space-x-1"
                        >
                          <span>Visit</span>
                          <ExternalLink size={14} />
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* MetaSpaces Section */}
      <section
        id="metaspaces"
        ref={metaSpacesRef}
        className="metaspaces-section py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
      >
        <div className="container mx-auto mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-black text-center mb-4 sm:mb-6">
            MetaSpaces
          </h2>
          <p className="text-center text-gray-700 mb-8 max-w-2xl mx-auto">
            Explore immersive spaces and experiences across the metaverse
          </p>
        </div>

        <div className="metaspaces-container flex space-x-6 sm:space-x-8 px-4 sm:px-6 lg:px-8">
          {metaSpaces.map((space) => (
            <div
              key={space.id}
              className="metaspace-card flex-shrink-0 w-80 sm:w-96 lg:w-[500px] group"
            >
              <div className="relative overflow-hidden rounded-xl border-2 border-gray-200 hover:border-gray-400 transition-all duration-300">
                <div className="relative h-64 sm:h-80 overflow-hidden">
                  <img
                    src={space.image}
                    alt={space.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-xs text-gray-300 mb-1">
                      {space.world} • {space.category}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold">{space.title}</h3>
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <p className="text-gray-700 mb-4 text-sm leading-relaxed">{space.description}</p>
                  <a
                    href={space.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-black border-2 border-black px-6 py-2.5 rounded-lg hover:bg-black hover:text-white transition-all duration-300 font-medium"
                  >
                    <span>Teleport</span>
                    <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        ref={footerRef}
        className="footer bg-white border-t-2 border-gray-200 py-12 sm:py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-8">
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold text-black mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#explore" className="text-gray-700 hover:text-black transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#compare" className="text-gray-700 hover:text-black transition-colors">
                    Compare
                  </a>
                </li>
                <li>
                  <a href="#blog" className="text-gray-700 hover:text-black transition-colors">
                    Blog
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
                  href="#"
                  className="social-icon w-10 h-10 border-2 border-black rounded-lg flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
                >
                  <MessageCircle size={20} />
                </a>
                <a
                  href="#"
                  className="social-icon w-10 h-10 border-2 border-black rounded-lg flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="#"
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
                Stay updated with the latest metaverse news and updates
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
                  I agree to the <a href="#" className="text-black underline">Terms of Service</a> and <a href="#" className="text-black underline">Privacy Policy</a>
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
