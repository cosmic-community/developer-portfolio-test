import Link from 'next/link'
import { Testimonial } from '@/types'

interface TestimonialCardProps {
  testimonial: Testimonial
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const rating = parseInt(testimonial.metadata?.rating?.key || '5')

  return (
    <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-4 mb-4">
        {testimonial.metadata?.client_photo && (
          <img
            src={`${testimonial.metadata.client_photo.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
            alt={testimonial.metadata?.client_name || ''}
            className="w-16 h-16 rounded-full object-cover"
            width={64}
            height={64}
          />
        )}
        
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            {testimonial.metadata?.client_name}
          </h3>
          {testimonial.metadata?.client_role && (
            <p className="text-sm text-gray-600">
              {testimonial.metadata.client_role}
              {testimonial.metadata?.company && ` at ${testimonial.metadata.company}`}
            </p>
          )}
        </div>
      </div>

      {/* Star Rating */}
      <div className="flex text-yellow-400 mb-4">
        {Array.from({ length: 5 }, (_, index) => {
          const filled = index < rating;
          return (
            <svg
              key={index}
              className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
                clipRule="evenodd"
              />
            </svg>
          );
        })}
      </div>

      {testimonial.metadata?.testimonial_text && (
        <p className="text-gray-700 mb-4 italic">
          &ldquo;{testimonial.metadata.testimonial_text}&rdquo;
        </p>
      )}

      {testimonial.metadata?.related_project && (
        <Link
          href={`/projects/${testimonial.metadata.related_project.slug}`}
          className="inline-block text-blue-600 hover:text-blue-800 font-medium text-sm"
        >
          View Related Project →
        </Link>
      )}
    </div>
  )
}