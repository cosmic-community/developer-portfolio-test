// app/projects/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProject, getProjects } from '@/lib/cosmic'
import { Project } from '@/types'

export async function generateStaticParams() {
  const projects = await getProjects()
  
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProject(slug)
  
  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: `${project.metadata?.project_name || project.title} | Developer Portfolio`,
    description: project.metadata?.description?.substring(0, 160) || '',
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProject(slug) as Project | null

  if (!project) {
    notFound()
  }

  const technologies = project.metadata?.technologies?.split(',').map(t => t.trim()) || []

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Link 
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Portfolio
          </Link>
        </div>
      </header>

      {/* Project Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {project.metadata?.project_name || project.title}
          </h1>
          {technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
          <div className="flex flex-wrap gap-4">
            {project.metadata?.live_url && (
              <a
                href={project.metadata.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                View Live Site
              </a>
            )}
            {project.metadata?.github_url && (
              <a
                href={project.metadata.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                View on GitHub
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {project.metadata?.featured_image && (
        <section className="py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <img
              src={`${project.metadata.featured_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
              alt={project.metadata?.project_name || project.title}
              className="w-full rounded-lg shadow-lg"
              width={1200}
              height={600}
            />
          </div>
        </section>
      )}

      {/* Project Description */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          {project.metadata?.description && (
            <div 
              className="markdown-content prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: project.metadata.description.replace(/\n/g, '<br/>') }}
            />
          )}
        </div>
      </section>

      {/* Screenshots */}
      {project.metadata?.screenshots && project.metadata.screenshots.length > 0 && (
        <section className="py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Screenshots</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {project.metadata.screenshots.map((screenshot, index) => (
                <img
                  key={index}
                  src={`${screenshot.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
                  alt={`Screenshot ${index + 1}`}
                  className="w-full rounded-lg shadow-md"
                  width={800}
                  height={500}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 px-4 mt-16">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Developer Portfolio. Built with Next.js and Cosmic.</p>
        </div>
      </footer>
    </main>
  )
}