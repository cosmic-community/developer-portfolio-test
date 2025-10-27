export default function ProjectLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </header>

      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="h-12 w-96 bg-white/20 rounded animate-pulse mb-4"></div>
          <div className="h-8 w-64 bg-white/20 rounded animate-pulse"></div>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="w-full h-96 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </section>
    </div>
  )
}