import Link from 'next/link'
import { getProjects, getSkills, getWorkExperience, getTestimonials } from '@/lib/cosmic'
import { Project, Skill, WorkExperience, Testimonial } from '@/types'
import ProjectCard from '@/components/ProjectCard'
import SkillCard from '@/components/SkillCard'
import ExperienceCard from '@/components/ExperienceCard'
import TestimonialCard from '@/components/TestimonialCard'
import Header from '@/components/Header'

export default async function HomePage() {
  const [projects, skills, experience, testimonials] = await Promise.all([
    getProjects(),
    getSkills(),
    getWorkExperience(),
    getTestimonials(),
  ])

  // Group skills by category
  const skillsByCategory = (skills as Skill[]).reduce((acc, skill) => {
    const category = skill.metadata?.category?.key || 'other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>)

  // Get featured projects
  const featuredProjects = (projects as Project[]).filter(p => p.metadata?.featured)

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Full Stack Developer
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl">
              Building modern web applications with React, Node.js, and TypeScript. 
              Passionate about creating elegant solutions to complex problems.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section id="projects" className="py-16 px-4 bg-white dark:bg-gray-900 transition-colors duration-200">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">Featured Projects</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-12">Recent work and side projects</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            {projects.length > featuredProjects.length && (
              <div className="text-center mt-12">
                <Link
                  href="#all-projects"
                  className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  View All Projects
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-16 px-4 bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">Skills & Technologies</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-12">Technical expertise across the full stack</p>

            {Object.entries(skillsByCategory).map(([category, categorySkills]) => {
              if (!categorySkills || categorySkills.length === 0) {
                return null;
              }

              return (
                <div key={category} className="mb-12">
                  <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200 capitalize">
                    {categorySkills[0]?.metadata?.category?.value || category}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categorySkills.map((skill) => (
                      <SkillCard key={skill.id} skill={skill} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-16 px-4 bg-white dark:bg-gray-900 transition-colors duration-200">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">Work Experience</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-12">Professional career journey</p>

            <div className="space-y-8">
              {(experience as WorkExperience[]).map((exp) => (
                <ExperienceCard key={exp.id} experience={exp} />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        {testimonials.length > 0 && (
          <section id="testimonials" className="py-16 px-4 bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">Client Testimonials</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-12">What clients say about working with me</p>

              <div className="grid md:grid-cols-2 gap-8">
                {(testimonials as Testimonial[]).map((testimonial) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Projects Section */}
        {projects.length > 0 && (
          <section id="all-projects" className="py-16 px-4 bg-white dark:bg-gray-900 transition-colors duration-200">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">All Projects</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-12">Complete portfolio of work</p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(projects as Project[]).map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Contact Section */}
        <section id="contact" className="py-16 px-4 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Let&apos;s Work Together</h2>
            <p className="text-xl mb-8 text-blue-100">
              Have a project in mind? I&apos;d love to hear about it.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:hello@example.com"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Send Email
              </a>
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                View GitHub
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 dark:bg-black text-gray-300 dark:text-gray-400 py-8 px-4 transition-colors duration-200">
          <div className="max-w-6xl mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} Developer Portfolio. Built with Next.js and Cosmic.</p>
          </div>
        </footer>
      </main>
    </>
  )
}