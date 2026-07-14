export default function Blog() {
  const posts = [
    { id: 1, title: 'Top 5 Building Materials for 2025', category: 'Materials', date: '2025-03-01' },
    { id: 2, title: 'DIY Guide: Installing Your Own PVC Pipes', category: 'Tutorials', date: '2025-02-25' },
    { id: 3, title: 'Safety Tips for Construction Work', category: 'Safety', date: '2025-02-20' },
    { id: 4, title: 'Cost-Saving Tips for Large Construction Projects', category: 'Tips', date: '2025-02-15' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">FundiMart Blog</h1>
        
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.id} className="border-b pb-8">
              <div className="flex items-center gap-4 mb-3">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm font-semibold">
                  {post.category}
                </span>
                <span className="text-gray-500 text-sm">{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 cursor-pointer">
                {post.title}
              </h2>
              <p className="text-gray-700 mb-4">
                Read more insights and tips from our construction experts...
              </p>
              <button className="text-blue-600 font-semibold hover:text-blue-800">
                Read Full Article →
              </button>
            </article>
          ))}
        </div>

        <div className="mt-12 p-6 bg-blue-50 rounded">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Subscribe to Our Blog</h3>
          <p className="text-gray-700 mb-4">Get construction tips and industry updates delivered to your inbox</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded"
            />
            <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
