'use client'

export default function Navigation() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-40">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={scrollToTop}
            className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
          >
            Developer Portfolio
          </button>
          
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#projects"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Projects
            </a>
            <a
              href="#skills"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Skills
            </a>
            <a
              href="#experience"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Experience
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Contact
            </a>
          </div>

          {/* Mobile menu button - simple version */}
          <div className="md:hidden flex items-center gap-6">
            <a
              href="#projects"
              className="text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}