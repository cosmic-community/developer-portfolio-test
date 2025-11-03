import { WorkExperience } from '@/types'

interface ExperienceCardProps {
  experience: WorkExperience
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'Present'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  const startDate = formatDate(experience.metadata?.start_date)
  const endDate = experience.metadata?.current ? 'Present' : formatDate(experience.metadata?.end_date)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 hover:shadow-lg transition-all duration-200">
      <div className="flex flex-col md:flex-row gap-6">
        {experience.metadata?.company_logo && (
          <div className="flex-shrink-0">
            <img
              src={`${experience.metadata.company_logo.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
              alt={experience.metadata?.company_name || ''}
              className="w-20 h-20 rounded-lg object-cover"
              width={80}
              height={80}
            />
          </div>
        )}
        
        <div className="flex-grow">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {experience.metadata?.job_title || experience.title}
              </h3>
              <p className="text-lg text-blue-600 dark:text-blue-400 font-medium mb-1">
                {experience.metadata?.company_name}
              </p>
              {experience.metadata?.location && (
                <p className="text-gray-600 dark:text-gray-400">
                  {experience.metadata.location}
                </p>
              )}
            </div>
            
            <div className="mt-2 md:mt-0 text-gray-600 dark:text-gray-400">
              <p className="font-medium">{startDate} - {endDate}</p>
              {experience.metadata?.current && (
                <span className="inline-block mt-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-xs font-medium">
                  Current Position
                </span>
              )}
            </div>
          </div>

          {experience.metadata?.description && (
            <div 
              className="markdown-content prose max-w-none text-gray-700 dark:text-gray-300"
              dangerouslySetInnerHTML={{ __html: experience.metadata.description.replace(/\n/g, '<br/>') }}
            />
          )}
        </div>
      </div>
    </div>
  )
}