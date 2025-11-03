'use client'

export default function Navigation() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-40">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-4">
        <button
          onClick={scrollToTop}
          className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
        >
          Developer Portfolio
        </button>
      </div>
    </nav>
  )
}