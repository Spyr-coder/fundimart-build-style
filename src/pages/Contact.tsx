import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-700">info@fundimart.co.ke</p>
                  <p className="text-sm text-gray-600">Response within 24 hours</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Phone</h3>
                  <p className="text-gray-700">+254 (0) XXX XXX XXX</p>
                  <p className="text-sm text-gray-600">Monday - Friday, 9AM - 5PM</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Physical Address</h3>
                  <p className="text-gray-700">FundiMart Headquarters</p>
                  <p className="text-gray-700">Nairobi, Kenya</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Subject</label>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Message</label>
                <textarea
                  rows={4}
                  placeholder="Your message"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
              >
                Send Message
              </button>
            </form>
          </section>
        </div>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Departments</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 border rounded">
              <h3 className="font-bold text-gray-900 mb-2">Sales</h3>
              <p className="text-gray-700 text-sm mb-3">Questions about products and orders?</p>
              <p className="text-blue-600 font-semibold text-sm">sales@fundimart.co.ke</p>
            </div>
            <div className="p-4 border rounded">
              <h3 className="font-bold text-gray-900 mb-2">Support</h3>
              <p className="text-gray-700 text-sm mb-3">Need help with your account?</p>
              <p className="text-blue-600 font-semibold text-sm">support@fundimart.co.ke</p>
            </div>
            <div className="p-4 border rounded">
              <h3 className="font-bold text-gray-900 mb-2">Partnerships</h3>
              <p className="text-gray-700 text-sm mb-3">Interested in partnering with us?</p>
              <p className="text-blue-600 font-semibold text-sm">partnerships@fundimart.co.ke</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
