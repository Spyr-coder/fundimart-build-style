export default function Shipping() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Shipping & Delivery</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Delivery Information</h2>
            <div className="space-y-4">
              <div className="border rounded p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">📍 Nairobi & Environs</h3>
                <p className="text-gray-700 mb-2">3-5 Business Days</p>
                <p className="text-sm text-gray-600">FREE on orders over KES 5,000</p>
              </div>
              <div className="border rounded p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">📍 Other Major Cities</h3>
                <p className="text-gray-700 mb-2">5-7 Business Days</p>
                <p className="text-sm text-gray-600">Shipping charges apply</p>
              </div>
              <div className="border rounded p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">📍 Remote Areas</h3>
                <p className="text-gray-700 mb-2">7-14 Business Days</p>
                <p className="text-sm text-gray-600">Subject to carrier availability</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping Methods</h2>
            <ul className="list-disc list-inside space-y-3 text-gray-700">
              <li><strong>Standard Delivery:</strong> Our most economical option for regular orders</li>
              <li><strong>Express Delivery:</strong> Faster delivery within 24-48 hours (available for Nairobi)</li>
              <li><strong>Bulk Delivery:</strong> Special arrangements for large orders</li>
              <li><strong>Pickup Option:</strong> Collect your order from our warehouse</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping Rates</h2>
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2 text-left">Order Value</th>
                  <th className="border px-4 py-2 text-left">Standard Shipping</th>
                  <th className="border px-4 py-2 text-left">Express Shipping</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">Under KES 5,000</td>
                  <td className="border px-4 py-2">KES 500</td>
                  <td className="border px-4 py-2">KES 1,500</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-4 py-2">KES 5,000 - KES 20,000</td>
                  <td className="border px-4 py-2">FREE</td>
                  <td className="border px-4 py-2">KES 1,000</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Over KES 20,000</td>
                  <td className="border px-4 py-2">FREE</td>
                  <td className="border px-4 py-2">FREE</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Delivery Safety</h2>
            <p className="text-gray-700 mb-4">
              We prioritize the safety of your items during transit:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Professional packaging to prevent damage</li>
              <li>Real-time tracking for your peace of mind</li>
              <li>Insurance available for high-value orders</li>
              <li>Signature on delivery for valuable items</li>
            </ul>
          </section>

          <section className="bg-blue-50 p-6 rounded">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Have Questions?</h2>
            <p className="text-gray-700">
              Our logistics team is here to help. Contact us for specific delivery inquiries.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
