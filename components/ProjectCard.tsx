import Link from 'next/link'
import { Project } from '@/types'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const technologies = project.metadata?.technologies?.split(',').map(t => t.trim()) || []

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-200">
      {project.metadata?.featured_image && (
        <Link href={`/projects/${project.slug}`}>
          <img
            src={`${project.metadata.featured_image.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
            alt={project.metadata?.project_name || project.title}
            className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
            width={400}
            height={240}
          />
        </Link>
      )}
      
      <div className="p-6">
        <Link href={`/projects/${project.slug}`}>
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {project.metadata?.project_name || project.title}
          </h3>
        </Link>
        
        {project.metadata?.description && (
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {project.metadata.description.replace(/#/g, '').substring(0, 150)}...
          </p>
        )}

        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs font-medium"
              >
                {tech}
              </span>
            ))}
            {technologies.length > 3 && (
              <span className="text-gray-500 dark:text-gray-400 text-xs py-1">
                +{technologies.length - 3} more
              </span>
            )}
          </div>
        )}

        <div className="flex gap-3">
          {project.metadata?.live_url && (
            <a
              href={project.metadata.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm"
            >
              View Live →
            </a>
          )}
          {project.metadata?.github_url && (
            <a
              href={project.metadata.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium text-sm"
            >
              GitHub →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}