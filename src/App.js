import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Heart, Brain, Hand, Users, School, Briefcase, Shield, Globe, ArrowRight, ArrowLeft, Menu, X, Target, Lightbulb, Book, ChevronLeft, ChevronRight } from 'lucide-react';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [introSettled, setIntroSettled] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const navigation = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Get Involved', id: 'get-involved' },
    { name: 'Resources', id: 'resources' }
  ];

  useEffect(() => {
    const settleTimer = setTimeout(() => setIntroSettled(true), 4200);
    const hideTimer = setTimeout(() => setShowIntro(false), 5200);
    return () => {
      clearTimeout(settleTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const IntroOverlay = () => {
    const headline = 'AI for Everyone';
    const subline = 'Powered by TinkerHub';
    const [titleProgress, setTitleProgress] = useState('');
    const [subtitleProgress, setSubtitleProgress] = useState('');

    useEffect(() => {
      let titleIndex = 0;
      let subtitleIndex = 0;
      const typeSpeed = 90;
      const subtitleDelay = 350;
      const titleInterval = setInterval(() => {
        setTitleProgress(headline.slice(0, titleIndex + 1));
        titleIndex += 1;
        if (titleIndex === headline.length) {
          clearInterval(titleInterval);
        }
      }, typeSpeed);

      let subtitleInterval;
      const subtitleStart = setTimeout(() => {
        subtitleInterval = setInterval(() => {
          setSubtitleProgress(subline.slice(0, subtitleIndex + 1));
          subtitleIndex += 1;
          if (subtitleIndex === subline.length) {
            clearInterval(subtitleInterval);
          }
        }, typeSpeed * 1.2);
      }, headline.length * typeSpeed + subtitleDelay);

      return () => {
        clearInterval(titleInterval);
        clearInterval(subtitleInterval);
        clearTimeout(subtitleStart);
      };
    }, []);

    return (
      <div className={`fixed inset-0 z-[70] bg-white flex flex-col items-center justify-center transition-opacity duration-700 ${introSettled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none intro-sky">
          <div className="star-layer star-layer-1"></div>
          <div className="star-layer star-layer-2"></div>
          <div className="star-layer star-layer-3"></div>
          <span className="comet comet-one"></span>
          <span className="comet comet-two"></span>
          <span className="sparkle sparkle-one"></span>
          <span className="sparkle sparkle-two"></span>
        </div>
        <div className="relative text-center space-y-6 px-6">
          <div className="intro-typewriter intro-highlight">
            {titleProgress}
          </div>
          <p className="intro-sub-typewriter text-[#A1A1A1]">
            {subtitleProgress}
          </p>
        </div>
      </div>
    );
  };

  const BackButton = ({ label = 'Back to Home' }) => (
    <button
      onClick={() => setCurrentPage('home')}
      className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-semibold text-black bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all"
    >
      <ArrowLeft className="w-4 h-4" />
      {label}
    </button>
  );

  const HomePage = () => {
    const audienceGroups = [
      {
        name: 'KuttyMakers',
        badge: 'Ages 10–17',
        quote: '“Children are already talking to AI every day. Let’s help them create with it.”',
        color: 'bg-black text-white',
        icon: <Sparkles className="w-8 h-8 text-white" />,
        actions: ['Pattern games', 'Sorting experiments', 'AI storybooks', 'Teachable Machine']
      },
      {
        name: 'Young Makers',
        badge: 'College & Early Professionals',
        quote: '“Kerala’s young talent can become AI innovators, not just job seekers.”',
        color: 'bg-black text-white',
        icon: <School className="w-8 h-8 text-white" />,
        actions: ['GenAI study jams', 'Hackathons', 'Open datasets', 'Mentorship circles']
      },
      {
        name: 'Friends of the Movement',
        badge: 'Parents • Educators • Elders',
        quote: '“AI literacy keeps communities safe, informed, and future-ready.”',
        color: 'bg-black text-white',
        icon: <Heart className="w-8 h-8 text-white" />,
        actions: ['Misinformation watch', 'Community forums', 'Learning circles', 'Safety playbooks']
      }
    ];

    const carouselRef = useRef(null);
    const [activeAudience, setActiveAudience] = useState(1);

    const scrollToIndex = (index) => {
      if (!carouselRef.current) return;
      const items = carouselRef.current.children;
      if (!items || !items.length) return;
      const referenceCard = items[index] || items[0];
      const cardWidth = referenceCard.clientWidth;
      const gap = 32; // gap-8
      carouselRef.current.scrollTo({
        left: index * (cardWidth + gap),
        behavior: 'smooth'
      });
    };

    const handlePrev = () => {
      const newIndex = (activeAudience - 1 + audienceGroups.length) % audienceGroups.length;
      setActiveAudience(newIndex);
      scrollToIndex(newIndex);
    };

    const handleNext = () => {
      const newIndex = (activeAudience + 1) % audienceGroups.length;
      setActiveAudience(newIndex);
      scrollToIndex(newIndex);
    };

    const handleCarouselScroll = (event) => {
      const container = event.target;
      const firstChild = container.children[0];
      if (!firstChild) return;
      const gap = 32;
      const cardWidth = firstChild.clientWidth;
      const rawIndex = container.scrollLeft / (cardWidth + gap);
      const nearest = Math.round(rawIndex);
      setActiveAudience(Math.min(audienceGroups.length - 1, Math.max(0, nearest)));
    };

  return (
      <div className="min-h-screen text-white">
        {/* Hero Section */}
        <section className="relative min-h-screen overflow-hidden bg-[#020618] text-white">
          <div className="hero-bg absolute inset-0">
            <div className="hero-gradient"></div>
            <div className="star-layer star-layer-1"></div>
            <div className="star-layer star-layer-2"></div>
            <div className="star-layer star-layer-3"></div>
            {[0, 1, 2, 3].map((idx) => (
              <span key={idx} className={`shooting-star shooting-star-${idx + 1}`}></span>
            ))}
          </div>

          <div className={`relative z-10 max-w-6xl mx-auto px-6 py-28 space-y-12 transition-all duration-700 ${introSettled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="space-y-6">
              <span className="inline-flex items-center gap-3 px-5 py-2 border border-white/30 rounded-full text-xs uppercase tracking-[0.4em] text-white/70 bg-white/5 backdrop-blur">
                Kerala’s Open AI Movement
              </span>
              <h1 className="hero-heading-text">
                AI FOR EVERYONE
              </h1>
              <p className="hero-powered">Powered by TinkerHub</p>
              <p className="text-3xl md:text-4xl font-semibold leading-tight text-white/90">
                AI literacy for every Keralite — crafted with heart, head, and hand.
              </p>
              <p className="text-lg md:text-xl text-gray-200 max-w-3xl">
                We’re transforming Kerala’s legacy of digital literacy into a future-ready AI culture where communities understand, build, and govern AI locally and responsibly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setCurrentPage('about')}
                  className="flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-black rounded-full hover:bg-white hover:text-black transition"
                >
                  Explore the Mission <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentPage('get-involved')}
                  className="flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold border border-white/40 rounded-full hover:bg-white hover:text-black transition-colors"
                >
                  Get Involved
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* Why Kerala Needs AI Literacy */}
        <section className="py-20 bg-transparent text-white border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6 text-white">
                Why Kerala Needs AI Literacy Now
              </h2>
              <p className="text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed italic">
                "AI is already here — in our schools, workplaces, culture, and daily life. But not everyone understands it. Not everyone is safe from it. And not everyone has the chance to build with it."
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                <Target className="w-12 h-12 mb-4 text-white" />
                <h3 className="text-2xl font-bold mb-4 text-white">Literacy for All & Global Model</h3>
                <p className="text-white/80">
                  Equitable AI education that empowers every citizen to understand and apply AI responsibly. Reaching at least one lakh learners across Kerala in the first phase.
                </p>
              </div>
              
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                <Lightbulb className="w-12 h-12 mb-4 text-white" />
                <h3 className="text-2xl font-bold mb-4 text-white">Creators, Not Just Consumers</h3>
                <p className="text-white/80">
                  Enabling Keralites to innovate and build AI-driven solutions, not just use them.
                </p>
              </div>
              
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                <Book className="w-12 h-12 mb-4 text-white" />
                <h3 className="text-2xl font-bold mb-4 text-white">Knowledge as a Public Good</h3>
                <p className="text-white/80">
                  Making AI knowledge accessible to all, with open, grassroots-first, multilingual approaches, where everyone becomes both learner and teacher.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Challenge */}
        <section className="py-20 bg-transparent text-white border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-5xl font-bold text-center mb-12">The Challenge</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                <School className="w-12 h-12 text-white mb-4" />
                <p className="text-lg text-white/80">
                  Many students are graduating without understanding the technologies that will define their future careers.
                </p>
              </div>
              
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                <Briefcase className="w-12 h-12 text-white mb-4" />
                <p className="text-lg text-white/80">
                  AI's rapid integration presents significant challenges for professionals as automation replaces traditional roles.
                </p>
              </div>
              
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                <Shield className="w-12 h-12 text-white mb-4" />
                <p className="text-lg text-white/80">
                  Deepfakes and misinformation blur truth. Elders face scams and fake news. AI literacy helps them pause, question, and protect themselves.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach - Head, Hand, Heart */}
        <section className="py-20 bg-transparent text-white border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold mb-6">Our Approach</h2>
              <p className="text-2xl text-white/70 italic">True learning engages the head, hand, and heart.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12">
              {[
                { icon: <Brain className="w-16 h-16 text-white" />, title: 'Head', caption: 'Understand', text: 'Decode how AI works and why it matters in daily life.' },
                { icon: <Hand className="w-16 h-16 text-white" />, title: 'Hand', caption: 'Build', text: 'Create projects, datasets, and prototypes rooted in Kerala.' },
                { icon: <Heart className="w-16 h-16 text-white" />, title: 'Heart', caption: 'Create', text: 'Mentor others and shape a safer, more inclusive AI future.' }
              ].map((item) => (
                <div key={item.title} className="text-center group">
                  <div className="w-32 h-32 mx-auto mb-6 bg-white/10 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-2xl">
                    {item.icon}
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-white">{item.title}</h3>
                  <p className="text-xl text-white/80 font-semibold mb-2">{item.caption}</p>
                  <p className="text-white/70">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who Is This For */}
        <section className="py-24 bg-transparent text-white border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center space-y-4">
              <p className="text-sm uppercase tracking-[0.5em] text-white/60">Who is this for?</p>
              <h2 className="text-5xl font-bold text-white">An Apple-card carousel of communities.</h2>
              <p className="text-lg text-white/70 max-w-3xl mx-auto">
                Swipe through to see how every segment of Kerala is invited into the movement.
              </p>
            </div>

            <div className="relative mt-16">
              <div className="flex justify-end gap-3 mb-6">
                <button
                  onClick={handlePrev}
                  aria-label="Previous audience"
                  className="w-11 h-11 rounded-full border border-white/20 bg-white/10 text-white shadow-md hover:bg-white/20 transition"
                >
                  <ChevronLeft className="w-5 h-5 mx-auto" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next audience"
                  className="w-11 h-11 rounded-full border border-white/20 bg-white/10 text-white shadow-md hover:bg-white/20 transition"
                >
                  <ChevronRight className="w-5 h-5 mx-auto" />
                </button>
              </div>

              <div
                ref={carouselRef}
                className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-6 hide-scrollbar scroll-smooth"
                onScroll={handleCarouselScroll}
              >
                {audienceGroups.map((group) => (
                  <div
                    key={group.name}
                    className="snap-center shrink-0 w-[85vw] md:w-[520px] rounded-[32px] bg-white/5 backdrop-blur-xl shadow-[0_30px_80px_rgba(0,0,0,0.4)] border border-white/10 p-10 space-y-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-2xl ${group.color} flex items-center justify-center`}>
                        {group.icon}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white/70">{group.badge}</p>
                        <h3 className="text-3xl font-bold text-white">{group.name}</h3>
                      </div>
                    </div>
                    <p className="text-xl italic text-white/80">{group.quote}</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {group.actions.map((action) => (
                        <div
                          key={action}
                          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white flex items-center gap-2"
                        >
                          <Sparkles className="w-4 h-4 text-white" />
                          {action}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-2 mt-6">
                {audienceGroups.map((group, idx) => (
                  <button
                    key={group.name}
                    onClick={() => {
                      setActiveAudience(idx);
                      scrollToIndex(idx);
                    }}
                    className={`h-2 rounded-full transition-all ${idx === activeAudience ? 'w-12 bg-white' : 'w-6 bg-white/30 hover:bg-white/60'}`}
                    aria-label={`Focus ${group.name}`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Partner With Us */}
        <section className="py-20 bg-transparent text-white border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6">Partner With Us</h2>
              <p className="text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed italic mb-4">
                "You can help us bring AI literacy to every corner of Kerala. One workshop, one sponsor, one volunteer can change a life."
              </p>
              <p className="text-lg text-white/70 max-w-3xl mx-auto">
                TinkerHub acts as the enabler and host of this campaign, holding space for partners and communities to lead, learn, and build together.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                { icon: <Brain className="w-10 h-10 mb-4 text-white" />, title: 'Knowledge Partners', body: ['Tech companies & AI experts', 'Educators & content creators', 'Curriculum designers'] },
                { icon: <Sparkles className="w-10 h-10 mb-4 text-white" />, title: 'Financial Partners', body: ['Program funding & operations', 'Resource & material support', 'Scaling to new districts'] },
                { icon: <Globe className="w-10 h-10 mb-4 text-white" />, title: 'Media & Outreach', body: ['Traditional & digital media', 'Content creators & influencers', 'Local language content'] },
                { icon: <Shield className="w-10 h-10 mb-4 text-white" />, title: 'Resource Partners', body: ['Hardware & software access', 'Learning materials & books', 'Technical support'] },
                { icon: <Users className="w-10 h-10 mb-4 text-white" />, title: 'Community Partners', body: ['Schools, libraries, NGOs', 'Kudumbashree & workplaces', 'Individual volunteer hosts'] }
              ].map((card) => (
                <div key={card.title} className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                  {card.icon}
                  <h3 className="text-xl font-bold mb-2 text-white">{card.title}</h3>
                  <ul className="text-sm text-white/80 space-y-1">
                    {card.body.map((line) => (
                      <li key={line}>• {line}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="bg-white/5 text-white rounded-2xl p-8 mb-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-4">How You Can Partner</h3>
              <div className="grid md:grid-cols-2 gap-4 text-white/80">
                {[
                  'Host learning programs & workshops',
                  'Volunteer & mentor learners',
                  'Sponsor toolkits & programs',
                  'Contribute real-world challenges',
                  'Open doors for communities',
                  'Provide financial support'
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <span className="text-base text-white">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setCurrentPage('get-involved')}
                className="px-8 py-4 bg-white text-black rounded-full font-semibold text-lg hover:bg-white/90 transition"
              >
                Become a Partner
              </button>
              <button 
                onClick={() => setCurrentPage('get-involved')}
                className="px-8 py-4 bg-transparent border border-white/40 text-white rounded-full font-semibold text-lg hover:bg-white/10 transition"
              >
                Host a Program
              </button>
              <button 
                onClick={() => setCurrentPage('get-involved')}
                className="px-8 py-4 bg-white/10 text-white rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition"
              >
                Volunteer
              </button>
            </div>
          </div>
        </section>

        {/* Closing Quote */}
        <section className="py-20 bg-transparent text-white border-t border-white/10">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
            <Globe className="w-16 h-16 mx-auto text-white" />
            <p className="text-2xl md:text-3xl italic leading-relaxed text-white/80">
              "AI will shape the future of work, culture, and communities. Kerala can either be a consumer or a creator. With your partnership, we can ensure every Keralite learns, builds, and creates responsibly with AI. This is our chance to set a global model again, like we did with digital literacy."
            </p>
          </div>
        </section>
    </div>
  );
  };

  const AboutPage = () => (
    <div className="min-h-screen bg-transparent text-white py-20">
      <div className="max-w-4xl mx-auto px-6 space-y-8">
        <BackButton />
        <h1 className="text-6xl font-bold mb-4 text-center">About the Mission</h1>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-4 text-white">TL;DR</h2>
          <p className="text-lg leading-relaxed text-white/80">
            The "AI for Everyone" initiative, enabled by TinkerHub, is a statewide program aiming to democratize AI knowledge across Kerala. Building on Kerala's digital literacy legacy, it turns communities into active creators in the AI era, addressing skill gaps, workforce changes, and misinformation.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-4">
          <h2 className="text-3xl font-bold text-white">Our Vision</h2>
          <p className="text-xl text-white/80 leading-relaxed">
            "We have a historical opportunity and responsibility to establish a human-centred framework for AI research, education, practice and policy."
          </p>
          <p className="text-right text-white/60 italic">- Fei-Fei Li, Stanford University & Co-Founder of AI4ALL</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-4">
          <h2 className="text-3xl font-bold text-white">The Historical Context</h2>
          <p className="text-xl text-white/80 leading-relaxed">
            Kerala once led the world in digital literacy. We showed what's possible when a state commits to empowering every citizen with technology. Now, as AI reshapes our world, we have another historic opportunity.
          </p>
          <p className="text-xl text-white/80 leading-relaxed">
            This initiative aims to reach <strong>at least one lakh learners</strong> across Kerala in the first phase, making AI knowledge a public good accessible to all through open, grassroots-first, multilingual approaches.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-4">
          <h2 className="text-3xl font-bold text-white">Our Core Principles</h2>
          <div className="space-y-4 text-white/80">
            <div className="border border-white/10 rounded-xl p-4">
              <h3 className="text-xl font-bold text-white mb-1">Equitable Education</h3>
              <p>Every citizen empowered to understand and apply AI responsibly.</p>
            </div>
            <div className="border border-white/10 rounded-xl p-4">
              <h3 className="text-xl font-bold text-white mb-1">Community-Centered</h3>
              <p>Every individual becomes both a learner and a teacher.</p>
            </div>
            <div className="border border-white/10 rounded-xl p-4">
              <h3 className="text-xl font-bold text-white mb-1">Creator Mindset</h3>
              <p>Not just using AI, but innovating and building with it.</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-white mb-4">Enabled by TinkerHub</h2>
          <p className="text-xl text-white/80 leading-relaxed">
            TinkerHub acts as the enabler and host of this campaign, holding space for partners and communities to lead, learn, and build together. This collaborative approach keeps the initiative grassroots-driven while maintaining quality and scale.
          </p>
        </div>
      </div>
    </div>
  );

  const GetInvolvedPage = () => (
    <div className="min-h-screen bg-transparent text-white py-20">
      <div className="max-w-5xl mx-auto px-6 space-y-10">
        <BackButton />
        <h1 className="text-6xl font-bold text-center">Get Involved</h1>
        <p className="text-2xl text-center text-white/70">
          Join us in bringing AI literacy to every corner of Kerala.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              icon: <Brain className="w-12 h-12 text-white" />,
              title: 'Become a Knowledge Partner',
              text: 'Share your expertise in AI, education, or content creation.',
              bullets: [
                'Tech companies & AI experts providing technical know-how',
                'Educators designing curriculum and leading workshops',
                'Subject experts connecting AI to specific fields'
              ],
              cta: 'Partner With Us'
            },
            {
              icon: <Users className="w-12 h-12 text-white" />,
              title: 'Volunteer & Mentor',
              text: 'Join our network of volunteers helping communities learn AI.',
              bullets: [
                'Facilitate workshops and study circles',
                'Guide learners and mentor grassroots facilitators',
                'Organize neighborhood learning circles'
              ],
              cta: 'Join as Volunteer'
            },
            {
              icon: <Shield className="w-12 h-12 text-white" />,
              title: 'Host a Program',
              text: 'Schools, colleges, libraries, and community centers can host AI literacy programs.',
              bullets: [
                'Provide venues and gather communities',
                'Facilitate workshops and demo days',
                'Open doors for children, youth, and elders'
              ],
              cta: 'Become a Host'
            },
            {
              icon: <Sparkles className="w-12 h-12 text-white" />,
              title: 'Financial Support',
              text: 'Help us scale and sustain this initiative across Kerala.',
              bullets: [
                'Sponsor facilitator training and venue costs',
                'Fund learning materials and toolkits',
                'Support scaling to new districts'
              ],
              cta: 'Contribute'
            }
          ].map((card) => (
            <div key={card.title} className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-4">
              {card.icon}
              <h2 className="text-3xl font-bold">{card.title}</h2>
              <p className="text-lg text-white/80">{card.text}</p>
              <ul className="space-y-2 text-sm text-white/70">
                {card.bullets.map((bullet) => <li key={bullet}>• {bullet}</li>)}
              </ul>
              <button className="w-full bg-black text-white py-3 rounded-full font-semibold hover:bg-white hover:text-black transition">
                {card.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">More Ways to Get Involved</h2>
          <div className="grid md:grid-cols-3 gap-6 text-white/90">
            <div className="border border-white/10 rounded-xl p-6 text-center">
              <Globe className="w-10 h-10 mb-3 mx-auto text-white" />
              <h3 className="text-xl font-bold mb-2">Media Partner</h3>
              <p className="text-sm text-white/70">Amplify our message through traditional and digital media.</p>
            </div>
            <div className="border border-white/10 rounded-xl p-6 text-center">
              <Book className="w-10 h-10 mb-3 mx-auto text-white" />
              <h3 className="text-xl font-bold mb-2">Resource Provider</h3>
              <p className="text-sm text-gray-400">Contribute hardware, software, or learning materials.</p>
            </div>
            <div className="border border-white/10 rounded-xl p-6 text-center">
              <Lightbulb className="w-10 h-10 mb-3 mx-auto text-white" />
              <h3 className="text-xl font-bold mb-2">Challenge Creator</h3>
              <p className="text-sm text-gray-400">Add real-world problems for learners to solve.</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="text-lg text-white/80 mb-6">
            Ready to partner? Have questions? Reach out to us:
          </p>
          <div className="space-y-3 text-lg text-white/80 max-w-md mx-auto">
            <p className="flex items-center gap-3 justify-center">
              <span className="font-bold text-white">Email:</span> aiforeveryone@tinkerhub.org
            </p>
            <p className="flex items-center gap-3 justify-center">
              <span className="font-bold text-white">Website:</span> tinkerhub.org
            </p>
            <p className="flex items-center gap-3 justify-center">
              <span className="font-bold text-white">Social:</span> @TinkerHub
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const ResourcesPage = () => (
    <div className="min-h-screen bg-transparent text-white py-20">
      <div className="max-w-5xl mx-auto px-6 space-y-12">
        <BackButton />
        <h1 className="text-6xl font-bold text-center">Resources</h1>
        <p className="text-2xl text-center text-white/70">
          Learning materials, guides, and campaign information.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              icon: <Book className="w-8 h-8 text-white" />,
              title: 'Campaign PDF',
              text: 'Download our comprehensive campaign document outlining the vision, approach, and partnership opportunities.',
              cta: 'Download PDF'
            },
            {
              icon: <Brain className="w-8 h-8 text-white" />,
              title: 'Learning Materials',
              text: 'Access free AI learning resources for KuttyMakers, Young Makers, and Friends of the Movement in multiple languages.',
              cta: 'Browse Materials'
            },
            {
              icon: <Users className="w-8 h-8 text-white" />,
              title: 'Workshop Guides',
              text: 'Step-by-step guides for organizing and facilitating AI literacy workshops, study jams, and learning circles.',
              cta: 'View Guides'
            },
            {
              icon: <Shield className="w-8 h-8 text-white" />,
              title: 'Safety & Ethics',
              text: 'Learn about AI safety, identifying deepfakes and misinformation, protecting privacy, and ethical AI use.',
              cta: 'Safety Guide'
            }
          ].map((card) => (
            <div key={card.title} className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-4">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                {card.icon}
              </div>
              <h2 className="text-2xl font-bold">{card.title}</h2>
              <p className="text-white/80">{card.text}</p>
              <button className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition">
                {card.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">Tools & Platforms Mentioned</h2>
          <div className="grid md:grid-cols-3 gap-6 text-white/90">
            {[
              { icon: <Sparkles className="w-10 h-10 mx-auto text-white" />, title: 'For KuttyMakers', text: 'Teachable Machine, Scratch, AI storybooks' },
              { icon: <School className="w-10 h-10 mx-auto text-white" />, title: 'For Young Makers', text: 'Gen AI tools, LLMs, development platforms' },
              { icon: <Heart className="w-10 h-10 mx-auto text-white" />, title: 'For All', text: 'Learning circles, public demos, discussion forums' }
            ].map((item) => (
              <div key={item.title} className="border border-white/10 rounded-xl p-6 text-center">
                {item.icon}
                <h3 className="text-xl font-bold mt-3 mb-2 text-white">{item.title}</h3>
                <p className="text-sm text-white/70">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const Footer = () => (
    <footer className="bg-[#050712] text-white py-12 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-white">
              <Sparkles className="w-6 h-6" /> AI for Everyone
            </h3>
            <p className="text-white/70 mb-3">
              Making AI literacy accessible to every Keralite
            </p>
            <p className="text-sm text-white/50">
              Enabled by TinkerHub
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <div className="space-y-2">
              {navigation.map(item => (
                <button 
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className="block text-white/70 hover:text-white transition-colors"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Connect</h4>
            <div className="space-y-2 text-white/70">
              <p>Email: aiforeveryone@tinkerhub.org</p>
              <p>Website: tinkerhub.org</p>
              <p>Social: @TinkerHub</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 text-center text-white/60">
          <p className="mb-2">Built using AI tools (ChatGPT, Claude, React)</p>
          <p>&copy; 2025 AI for Everyone - Kerala Initiative</p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen relative overflow-hidden page-shell text-white">
      <div className="page-bg">
        <div className="page-gradient"></div>
        <div className="page-stars page-stars-1"></div>
        <div className="page-stars page-stars-2"></div>
        <div className="page-stars page-stars-3"></div>
      </div>
      {showIntro && <IntroOverlay />}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-[#050712]/85 backdrop-blur-xl border-b border-white/10 z-50 text-white">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setCurrentPage('home')}
                className={`flex items-center gap-2 text-2xl font-bold transition-all duration-500 ${introSettled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
              >
                <Sparkles className="w-8 h-8" />
                AI for Everyone
              </button>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex gap-6">
                {navigation.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`px-4 py-2 rounded-full font-semibold transition-all ${
                      currentPage === item.id 
                        ? 'bg-white text-black' 
                        : 'text-white/70 hover:bg-white/10'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-white"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <div className="md:hidden mt-4 pb-4 space-y-2">
                {navigation.map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 rounded-lg font-semibold transition-all ${
                      currentPage === item.id 
                        ? 'bg-white text-black' 
                        : 'text-white/80 hover:bg-white/10'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Page Content */}
        <div className="pt-20">
          {currentPage === 'home' && <HomePage />}
          {currentPage === 'about' && <AboutPage />}
          {currentPage === 'get-involved' && <GetInvolvedPage />}
          {currentPage === 'resources' && <ResourcesPage />}
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default App;
