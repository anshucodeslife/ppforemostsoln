import { motion } from 'framer-motion';

const CareerPage = () => {
  return (
    <div className="bg-gray-950 text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80 z-0"></div>
        <div className="absolute inset-0 bg-[url('https://placehold.co/1920x1080')] bg-cover bg-center opacity-20 z-0"></div>
        <div className="max-w-4xl mx-auto text-center px-6 z-10">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300 font-sans"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Join the Future of Digital Innovation
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 text-gray-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Shape the digital landscape with P&P Foremost Solution - where cutting-edge technology meets meaningful collaboration
          </motion.p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition-all">
                View Open Positions
              </button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <button className="px-8 py-3 border-2 border-blue-400 text-blue-300 hover:bg-blue-900/30 rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition-all">
                Why Work With Us
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Why Work With Us</h2>
            <p className="text-gray-400 text-center max-w-3xl mx-auto mb-12 text-lg">
              We're building more than products - we're creating the future
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              className="bg-gray-900 rounded-xl p-8 border border-gray-800 hover:border-blue-500/30 transition-all hover:shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 mb-6 flex items-center justify-center bg-blue-900/20 rounded-full border border-blue-500/20">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Innovation-First Culture</h3>
              <p className="text-gray-400">We prioritize bold ideas and creative problem-solving</p>
            </motion.div>

            <motion.div
              className="bg-gray-900 rounded-xl p-8 border border-gray-800 hover:border-purple-500/30 transition-all hover:shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 mb-6 flex items-center justify-center bg-purple-900/20 rounded-full border border-purple-500/20">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Global Projects</h3>
              <p className="text-gray-400">Work on impactful solutions serving international markets</p>
            </motion.div>

            <motion.div
              className="bg-gray-900 rounded-xl p-8 border border-gray-800 hover:border-blue-500/30 transition-all hover:shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 mb-6 flex items-center justify-center bg-blue-900/20 rounded-full border border-blue-500/20">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Growth & Learning</h3>
              <p className="text-gray-400">Continuous development with mentorship and resources</p>
            </motion.div>

            <motion.div
              className="bg-gray-900 rounded-xl p-8 border border-gray-800 hover:border-teal-500/30 transition-all hover:shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 mb-6 flex items-center justify-center bg-teal-900/20 rounded-full border border-teal-500/20">
                <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Flexible Remote Work</h3>
              <p className="text-gray-400">Work from anywhere with our distributed team model</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Open Positions</h2>
            <p className="text-gray-400 text-center max-w-3xl mx-auto mb-12 text-lg">
              Explore opportunities to join our growing team
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Senior Frontend Developer",
                type: "Full-time",
                location: "Remote",
                exp: "5+ years",
                tech: "React, TypeScript",
              },
              {
                title: "UX/UI Designer",
                type: "Full-time",
                location: "Hybrid (Bangalore)",
                exp: "3+ years",
                tech: "Figma, User Research",
              },
              {
                title: "DevOps Engineer",
                type: "Full-time",
                location: "Remote",
                exp: "4+ years",
                tech: "AWS, Kubernetes",
              },
              {
                title: "Product Manager",
                type: "Full-time",
                location: "Remote",
                exp: "4+ years",
                tech: "Agile, Roadmapping",
              },
              {
                title: "Backend Engineer",
                type: "Full-time",
                location: "Hybrid (Delhi)",
                exp: "3+ years",
                tech: "Node.js, Databases",
              },
              {
                title: "Technical Writer",
                type: "Contract",
                location: "Remote",
                exp: "2+ years",
                tech: "Documentation",
              },
            ].map((job, index) => (
              <motion.div
                key={index}
                className="bg-gray-950 rounded-xl p-6 border border-gray-800 hover:border-blue-500/50 transition-all hover:shadow-lg group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                  {job.title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full">
                    {job.type}
                  </span>
                  <span className="text-xs px-3 py-1 bg-gray-800/50 text-gray-300 rounded-full">
                    {job.location}
                  </span>
                  <span className="text-xs px-3 py-1 bg-gray-800/50 text-gray-300 rounded-full">
                    {job.exp} experience
                  </span>
                </div>
                <p className="text-gray-400 mb-5">{job.tech}</p>
                <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors">
                  Apply Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Life at P&P Foremost Solution */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Life at P&P Foremost Solution</h2>
            <p className="text-gray-400 text-center max-w-3xl mx-auto mb-12 text-lg">
              Our culture fosters collaboration, creativity, and continuous learning
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              className="relative rounded-xl overflow-hidden h-96"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <img
                src="https://placehold.co/600x800"
                alt="Team collaborating in modern office space with whiteboards"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-xl font-semibold">Collaborative Workspaces</h3>
                <p className="text-gray-300">Modern environments designed for teamwork</p>
              </div>
            </motion.div>

            <motion.div
              className="relative rounded-xl overflow-hidden h-96"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <img
                src="https://placehold.co/600x800"
                alt="Team members smiling at offsite retreat in nature"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-xl font-semibold">Team Retreats</h3>
                <p className="text-gray-300">Annual gatherings to connect and recharge</p>
              </div>
            </motion.div>

            <motion.div
              className="relative rounded-xl overflow-hidden h-96"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <img
                src="https://placehold.co/600x800"
                alt="Developer coding on laptop at outdoor cafe with mountains in background"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-xl font-semibold">Work From Anywhere</h3>
                <p className="text-gray-300">Flexibility to do your best work</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Employee Testimonials */}
      <section className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Hear From Our Team</h2>
            <p className="text-gray-400 text-center max-w-3xl mx-auto mb-12 text-lg">
              What our employees say about working at P&P Foremost Solution
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                quote: "P&P Foremost Solution provides the perfect balance of challenging work and supportive environment. I've grown more in 2 years here than in 5 years at my previous company.",
                name: "Shreya Singh",
                role: "Frontend dev",
                img: "https://placehold.co/200x200",
              },
              {
                quote: "The trust and autonomy we're given to solve problems creatively is unmatched. Plus, the team is filled with brilliant, kind people who make coming to work enjoyable.",
                name: "Vignesh",
                role: "Backend dev",
                img: "https://placehold.co/200x200",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-gray-950 rounded-xl p-8 border border-gray-800"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <svg className="w-8 h-8 text-blue-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <blockquote className="text-lg italic mb-6 text-gray-300">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.img}
                    alt={`Portrait of ${testimonial.name}`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Internship Program */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
        <div className="max-w-6xl mx-auto rounded-2xl bg-gray-900/70 border border-gray-800 p-12 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">P&P Foremost Solution Launchpad</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Kickstart your tech career with our internship program for students and recent graduates
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-gray-950/60 rounded-lg p-6 border border-gray-800">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-blue-900/20 rounded-full border border-blue-500/20">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Mentorship</h3>
              <p className="text-sm text-gray-400">Guidance from industry experts</p>
            </div>

            <div className="bg-gray-950/60 rounded-lg p-6 border border-gray-800">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-purple-900/20 rounded-full border border-purple-500/20">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Real Projects</h3>
              <p className="text-sm text-gray-400">Meaningful work that matters</p>
            </div>

            <div className="bg-gray-950/60 rounded-lg p-6 border border-gray-800">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-teal-900/20 rounded-full border border-teal-500/20">
                <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Certification</h3>
              <p className="text-sm text-gray-400">Validate your new skills</p>
            </div>

            <div className="bg-gray-950/60 rounded-lg p-6 border border-gray-800">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-blue-900/20 rounded-full border border-blue-500/20">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Fast-Track Hiring</h3>
              <p className="text-sm text-gray-400">Pathway to full-time roles</p>
            </div>
          </div>

          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition-all">
            Apply to Launchpad
          </button>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 px-6 bg-gray-950">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Build the Future With Us?</h2>
            <p className="text-xl text-gray-400 mb-8">
              We're always looking for talented individuals to join our team
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-lg transition-all">
                View All Openings
              </button>
              <button className="px-8 py-3 border-2 border-gray-700 hover:border-blue-500 text-blue-400 hover:text-blue-300 rounded-lg font-medium text-lg transition-all">
                Submit General Application
              </button>
            </div>
            <p className="mt-8 text-gray-500">
              Have questions? Contact us at <span className="text-blue-400">careers@P&P Foremost Solution.in</span>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CareerPage;
