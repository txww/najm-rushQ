import React from 'react';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';
import { motion } from 'framer-motion';

export default function ProjectsPage() {
  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/images/background.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 text-white grid grid-cols-1 lg:grid-cols-2 gap-14 font-[var(--arabic-font)]">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center text-right space-y-6"
        >
          <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-3 rounded-full w-fit ml-auto font-semibold shadow-lg hover:scale-105 hover:brightness-105 transition-transform">
            مشاريعنا
          </button>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-white drop-shadow-2xl">
            نبني المستقبل
            <br />
            بأعلى معايير الجودة
          </h1>

          <p className="text-lg leading-relaxed opacity-95 text-gray-200">
            نقدم حلولًا متكاملة في عالم المقاولات والبناء، مع فريق هندسي محترف
            يضمن لك تنفيذ مشاريعك بدقة وجودة عالية، وبأسلوب يواكب تطلعاتك.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-5 mt-4">
            {[
              { num: '+150', title: 'مشروع منجز' },
              { num: '+25', title: 'سنوات خبرة' },
              { num: '+200', title: 'موظف محترف' },
              { num: '98%', title: 'رضا العملاء' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl text-center border border-white/10 shadow-xl hover:bg-white/20 hover:scale-105 transition"
              >
                <p className="text-[var(--secondary-color)] text-4xl font-bold drop-shadow">
                  {item.num}
                </p>
                <p className="mt-2 text-gray-200">{item.title}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* PROJECTS GRID */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="hover:scale-105 transition-transform"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
