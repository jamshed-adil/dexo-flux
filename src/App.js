import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const DexoFluxWebsite = () => {
  const mountRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const currentMount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    currentMount.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });

    const shapes = [];
    for (let i = 0; i < 15; i++) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      mesh.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02
        }
      };
      shapes.push(mesh);
      scene.add(mesh);
    }

    camera.position.z = 15;

    const animate = () => {
      requestAnimationFrame(animate);
      shapes.forEach(shape => {
        shape.rotation.x += shape.userData.rotationSpeed.x;
        shape.rotation.y += shape.userData.rotationSpeed.y;
        shape.rotation.z += shape.userData.rotationSpeed.z;
      });
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      currentMount.removeChild(renderer.domElement);
    };
  }, []);

  const handleEmailClick = () => {
    window.location.href = 'mailto:Dexoflux@gmail.com?subject=Inquiry%20about%20DexoFlux%20Courses&body=Hello%20DexoFlux%20Team,%0A%0AI%20am%20interested%20in%20learning%20more%20about%20your%20courses.%0A%0APlease%20send%20me%20more%20information.%0A%0ARegards,%0A[Your%20Name]';
  };

  const handleCallClick = () => {
    window.location.href = 'tel:8801659042';
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '8801659042';
    const message = 'Hello DexoFlux Team, I am interested in learning more about your courses.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const courses = [
    { name: 'Core Java', icon: '☕', desc: 'Master Java fundamentals' },
    { name: 'Advanced Java', icon: '🚀', desc: 'Enterprise Java development' },
    { name: '.NET & C#', icon: '⚡', desc: 'Microsoft technology stack' },
    { name: 'Android Development', icon: '📱', desc: 'Native Android apps' },
    { name: 'iOS Development', icon: '🍎', desc: 'Native iOS applications' },
    { name: 'Cross-Platform Mobile', icon: '🔄', desc: 'Flutter, React Native, .NET MAUI' },
    { name: 'Data Science', icon: '📊', desc: 'Analytics & ML fundamentals' },
    { name: 'Cloud Computing', icon: '☁️', desc: 'Azure & AWS platforms' }
  ];

  const features = [
    'Industry-Expert Trainers',
    'Real-Time Project Training',
    'Certificate Upon Completion',
    'Career Guidance for Freshers',
    'Resume Building Support',
    'Interview Preparation',
    'Mock Interviews',
    'Job-Oriented Training',
    'Placement Assistance',
    'Modern Learning Environment'
  ];

  const stats = [
    { number: '500+', label: 'Students Trained', icon: '👥' },
    { number: '95%', label: 'Placement Rate', icon: '📈' },
    { number: '50+', label: 'Hiring Partners', icon: '🤝' },
    { number: '15+', label: 'Industry Experts', icon: '👨‍🏫' }
  ];

  const testimonials = [
    {
      name: 'Rahul Sharma',
      role: 'Java Developer at TCS',
      text: 'DexoFlux transformed my career. The hands-on training and placement support helped me land my dream job!',
      rating: 5
    },
    {
      name: 'Priya Reddy',
      role: 'Data Scientist at Accenture',
      text: 'The Data Science course was exceptional. Real-world projects and expert mentors made all the difference.',
      rating: 5
    },
    {
      name: 'Karthik Menon',
      role: 'Mobile Developer at Infosys',
      text: 'Best decision I made! The React Native training was top-notch and the mock interviews prepared me perfectly.',
      rating: 5
    }
  ];

  const learningPath = [
    { step: 1, title: 'Foundation Building', desc: 'Master core concepts with expert guidance', icon: '📚' },
    { step: 2, title: 'Hands-On Projects', desc: 'Work on real-world industry projects', icon: '💻' },
    { step: 3, title: 'Career Preparation', desc: 'Resume building and interview training', icon: '🎯' },
    { step: 4, title: 'Job Placement', desc: 'Get placed with our hiring partners', icon: '🚀' }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white overflow-hidden">
      {/* Custom Cursor */}
      <div
        className="fixed w-8 h-8 rounded-full border-2 border-indigo-400 pointer-events-none z-50 transition-transform duration-150 ease-out"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: `translate(-50%, -50%) scale(${cursorVariant === 'hover' ? 1.5 : 1})`,
          mixBlendMode: 'difference'
        }}
      />
      <div
        className="fixed w-2 h-2 bg-indigo-400 rounded-full pointer-events-none z-50"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      />

      <div ref={mountRef} className="fixed top-0 left-0 w-full h-full pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 bg-slate-900/50 backdrop-blur-md border-b border-indigo-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                DexoFlux
              </h1>
              <p className="text-xs text-gray-400">Institute of Technology & Skills</p>
            </div>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#courses" className="text-gray-300 hover:text-indigo-400 transition">Courses</a>
            <a href="#why-us" className="text-gray-300 hover:text-indigo-400 transition">Why Us</a>
            <a href="#contact" className="text-gray-300 hover:text-indigo-400 transition">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center space-y-6">
          <div className="inline-block px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-indigo-300 text-sm mb-4">
            🚀 Admissions Open - Limited Seats Available
          </div>
          <h2 className="text-5xl md:text-7xl font-bold leading-tight">
            Your Gateway to a<br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Successful IT Career
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Transform your passion into profession with industry-leading training, real-world projects, and guaranteed placement assistance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <a href="#courses" className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition transform hover:scale-105">
              Explore Courses
            </a>
            <a href="#contact" className="px-8 py-4 bg-slate-800 border border-indigo-500/30 rounded-lg font-semibold hover:bg-slate-700 transition">
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Courses Offered
            </span>
          </h3>
          <p className="text-gray-400 text-lg">Industry-relevant programs designed for your success</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, idx) => (
            <div
              key={idx}
              className="group p-6 bg-slate-900/50 backdrop-blur-sm border border-indigo-500/20 rounded-xl hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/20 transition transform hover:scale-105"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition">{course.icon}</div>
              <h4 className="text-xl font-bold mb-2 text-indigo-300">{course.name}</h4>
              <p className="text-gray-400 text-sm">{course.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="text-center p-6 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-xl hover:scale-110 transition transform"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold text-indigo-300 mb-2">{stat.number}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Your Learning Journey
            </span>
          </h3>
          <p className="text-gray-400 text-lg">A structured path from beginner to job-ready professional</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {learningPath.map((path, idx) => (
            <div
              key={idx}
              className="relative group"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <div className="p-6 bg-slate-900/50 backdrop-blur-sm border border-indigo-500/20 rounded-xl hover:border-indigo-500/50 transition">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-5xl">{path.icon}</div>
                  <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-300 font-bold text-xl">
                    {path.step}
                  </div>
                </div>
                <h4 className="text-xl font-bold mb-2 text-indigo-300">{path.title}</h4>
                <p className="text-gray-400 text-sm">{path.desc}</p>
              </div>
              {idx < learningPath.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Section */}
      <section id="why-us" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Why Choose DexoFlux?
            </span>
          </h3>
          <p className="text-gray-400 text-lg">Where innovation meets excellence in education</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-center space-x-3 p-4 bg-slate-900/30 backdrop-blur-sm border border-indigo-500/10 rounded-lg hover:border-indigo-500/30 transition hover:scale-105 transform"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <span className="text-gray-300">{feature}</span>
            </div>
          ))}
        </div>

        {/* Special Support */}
        <div className="mt-16 p-8 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-2xl">
          <div className="flex items-start space-x-4">
            <div className="text-4xl">👨‍🎓</div>
            <div>
              <h4 className="text-2xl font-bold mb-3 text-indigo-300">Special Support for Freshers</h4>
              <p className="text-gray-300 text-lg">
                We guide students step-by-step to achieve their first IT job with confidence — from skills training to interview success. Our comprehensive mentorship program ensures you're industry-ready from day one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Student Success Stories
            </span>
          </h3>
          <p className="text-gray-400 text-lg">Hear from our successful graduates</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="p-6 bg-slate-900/50 backdrop-blur-sm border border-indigo-500/20 rounded-xl hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/20 transition transform hover:scale-105"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-indigo-300">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h3>
          <p className="text-gray-400 text-base sm:text-lg">Start your journey with us today</p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Contact Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {/* Call Card */}
            <div
              className="group relative p-6 sm:p-7 bg-gradient-to-br from-slate-900/60 to-slate-800/40 border border-indigo-500/20 rounded-xl sm:rounded-2xl hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden"
              onClick={handleCallClick}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-indigo-500/10 rounded-full blur-xl group-hover:bg-indigo-500/20 transition-colors"></div>
              <div className="relative">
                <div className="inline-flex p-3 sm:p-4 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl sm:rounded-2xl mb-4 sm:mb-5">
                  <span className="text-2xl sm:text-3xl">📞</span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-white mb-2">Call Us</h4>
                <p className="text-xl sm:text-2xl font-semibold text-indigo-300 mb-3">8801659042</p>
                <p className="text-gray-400 text-sm mb-4">Click to call directly</p>
                <div className="inline-flex items-center px-4 py-2 bg-indigo-500/20 rounded-lg text-indigo-300 text-sm font-medium group-hover:bg-indigo-500/30 transition-colors">
                  <span>Tap to Call</span>
                  <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div
              className="group relative p-6 sm:p-7 bg-gradient-to-br from-slate-900/60 to-slate-800/40 border border-indigo-500/20 rounded-xl sm:rounded-2xl hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden"
              onClick={handleEmailClick}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-colors"></div>
              <div className="relative">
                <div className="inline-flex p-3 sm:p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl sm:rounded-2xl mb-4 sm:mb-5">
                  <span className="text-2xl sm:text-3xl">📧</span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-white mb-2">Email Us</h4>
                <p className="text-lg sm:text-xl font-semibold text-indigo-300 mb-3 break-words">Dexoflux@gmail.com</p>
                <p className="text-gray-400 text-sm mb-4">Click to send email</p>
                <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 rounded-lg text-purple-300 text-sm font-medium group-hover:bg-purple-500/30 transition-colors">
                  <span>Send Email</span>
                  <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div
              className="group relative p-6 sm:p-7 bg-gradient-to-br from-slate-900/60 to-slate-800/40 border border-green-500/20 rounded-xl sm:rounded-2xl hover:border-green-500/50 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden"
              onClick={handleWhatsAppClick}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-green-500/10 rounded-full blur-xl group-hover:bg-green-500/20 transition-colors"></div>
              <div className="relative">
                <div className="inline-flex p-3 sm:p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl sm:rounded-2xl mb-4 sm:mb-5">
                  <span className="text-2xl sm:text-3xl">💬</span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-white mb-2">WhatsApp</h4>
                <p className="text-xl sm:text-2xl font-semibold text-green-300 mb-3">8801659042</p>
                <p className="text-gray-400 text-sm mb-4">Click to message on WhatsApp</p>
                <div className="inline-flex items-center px-4 py-2 bg-green-500/20 rounded-lg text-green-300 text-sm font-medium group-hover:bg-green-500/30 transition-colors">
                  <span>Message Now</span>
                  <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="relative p-6 sm:p-8 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/30 rounded-xl sm:rounded-2xl overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
            <div className="relative">
              <div className="text-center sm:text-left sm:flex items-center justify-between">
                <div className="mb-6 sm:mb-0">
                  <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-full text-sm font-medium text-indigo-300 mb-3">
                    🚀 Limited Seats Available
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    Start Your Tech Journey Today!
                  </h4>
                  <p className="text-gray-300 text-base">
                    Join 500+ successful graduates and transform your career
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleCallClick}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call Now
                  </button>
                  <button
                    onClick={handleWhatsAppClick}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.677-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411z" />
                    </svg>
                    WhatsApp
                  </button>
                </div>
              </div>
              <p className="mt-4 text-center text-lg font-semibold text-indigo-300">Where Innovation Begins</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-slate-900/80 border-t border-indigo-500/20 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center">
          <p className="text-gray-400 mb-2">© 2026 DexoFlux Institute of Technology & Skills</p>
          <p className="text-indigo-400 font-semibold">Where Innovation Begins</p>
          <div className="mt-4 space-x-6">
            <button
              onClick={handleCallClick}
              className="text-gray-400 hover:text-indigo-400 transition"
            >
              📞 8801659042
            </button>
            <button
              onClick={handleEmailClick}
              className="text-gray-400 hover:text-indigo-400 transition"
            >
              📧 Dexoflux@gmail.com
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DexoFluxWebsite;