export default function Careers() {
  const jobs = [
    { id: 1, title: 'Operations Manager', location: 'Nairobi', type: 'Full-time' },
    { id: 2, title: 'Customer Service Representative', location: 'Nairobi', type: 'Full-time' },
    { id: 3, title: 'Logistics Coordinator', location: 'Various', type: 'Full-time' },
    { id: 4, title: 'Sales Executive', location: 'Nairobi', type: 'Full-time' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Careers at FundiMart</h1>
        
        <div className="space-y-8">
          <section className="bg-blue-50 p-6 rounded">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Our Team</h2>
            <p className="text-gray-700 mb-4">
              FundiMart is growing rapidly and we're looking for talented individuals to join our team. We offer competitive salaries, benefits, and opportunities for career growth.
            </p>
            <p className="text-gray-700">
              If you're passionate about the construction industry and want to make a difference, we'd love to hear from you!
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Open Positions</h2>
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job.id} className="border rounded p-4 hover:shadow-lg transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                      <p className="text-gray-600">
                        <span>{job.location}</span> • <span>{job.type}</span>
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                      Apply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Work With Us?</h2>
            <ul className="list-disc list-inside space-y-3 text-gray-700">
              <li>Competitive compensation and benefits</li>
              <li>Opportunities for professional development</li>
              <li>Collaborative and inclusive work environment</li>
              <li>Impact on the construction industry in Kenya</li>
              <li>Flexible work arrangements</li>
            </ul>
          </section>

          <section className="bg-gray-50 p-6 rounded">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Submit Your Application</h2>
            <p className="text-gray-700 mb-4">
              Don't see a position that fits? Send us your CV and we'll keep it on file for future opportunities.
            </p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold">
              Send Your CV
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
