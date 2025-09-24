import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  social: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Shreya Singh",
    role: "Frontend Architect",
    image: "https://placehold.co/400x400?text=Shreya",
    bio: "UI framework expert with 8+ years experience building scalable component libraries.",
    social: {
      linkedin: "#",
      github: "#",
      twitter: "#"
    }
  },
  {
    id: 2,
    name: "Anshu",
    role: "Systems Engineer",
    image: "https://placehold.co/400x400?text=Anshu",
    bio: "Specializes in distributed systems and cloud-native architectures.",
    social: {
      linkedin: "#",
      github: "#",
      twitter: "#"
    }
  },
  {
    id: 3,
    name: "Vignesh",
    role: "Backend Developer",
    image: "https://placehold.co/400x400?text=Vignesh",
    bio: "Expert in building scalable backend systems.",
    social: {
      linkedin: "#",
      github: "#",
      twitter: "#"
    }
  },
  {
    id: 4,
    name: "Om",
    role: "Creative Director",
    image: "https://placehold.co/400x400?text=Om",
    bio: "Design visionary focused on accessible and inclusive user experiences.",
    social: {
      linkedin: "#",
      github: "#",
      twitter: "#"
    }
  },
  {
    id: 5,
    name: "Sovam",
    role: "DevOps Lead",
    image: "https://placehold.co/400x400?text=Sovam",
    bio: "Infrastructure automation expert with a security-first approach.",
    social: {
      linkedin: "#",
      github: "#",
      twitter: "#"
    }
  }
];

const TeamCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: member.id * 0.1 }}
      className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg overflow-hidden group transition-all duration-300 ease-in-out transform hover:shadow-xl"
    >
      <div className="relative h-60 overflow-hidden">
        <motion.img 
          src={member.image}
          alt={member.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-4 left-4">
          <h3 className="text-xl font-bold text-white">{member.name}</h3>
          <span className="inline-block px-2 py-1 text-sm font-medium text-purple-600 bg-purple-100 rounded-md">{member.role}</span> {/* Changed rounded-full to rounded-md */}
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-gray-300 mb-4">{member.bio}</p>
        
        <div className="flex space-x-3">
          {member.social.linkedin && (
            <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors">
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </a>
          )}
          {member.social.github && (
            <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-800 transition-colors">
              <FontAwesomeIcon icon={faGithub} size="lg" />
            </a>
          )}
          {member.social.twitter && (
            <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400 transition-colors">
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const OurTeam: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block mb-4 px-3 py-1 text-sm font-medium bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-full">
            Meet The Team
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Amazing Team</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            The creative minds behind our success story, dedicated to building exceptional digital experiences.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <motion.a
            href="/careers"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg transition-all duration-300"
          >
            Join Our Team
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
