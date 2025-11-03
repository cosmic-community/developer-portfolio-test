import { Skill } from '@/types'

interface SkillCardProps {
  skill: Skill
}

export default function SkillCard({ skill }: SkillCardProps) {
  const proficiencyColors = {
    beginner: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    intermediate: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    advanced: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    expert: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  }

  const proficiencyKey = skill.metadata?.proficiency?.key as keyof typeof proficiencyColors
  const colorClass = proficiencyColors[proficiencyKey] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-200">
      <div className="flex items-center gap-4 mb-3">
        {skill.metadata?.icon && (
          <img
            src={`${skill.metadata.icon.imgix_url}?w=100&h=100&fit=crop&auto=format,compress`}
            alt={skill.metadata?.skill_name || skill.title}
            className="w-12 h-12 rounded object-cover"
            width={48}
            height={48}
          />
        )}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {skill.metadata?.skill_name || skill.title}
        </h3>
      </div>
      
      {skill.metadata?.proficiency && (
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${colorClass}`}>
          {skill.metadata.proficiency.value}
        </span>
      )}
    </div>
  )
}