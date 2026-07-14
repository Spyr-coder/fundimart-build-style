export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About FundiMart</h1>
        
        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg">
              FundiMart is committed to making quality construction materials and tools accessible to everyone in Kenya. We believe in empowering builders, contractors, and DIY enthusiasts with affordable, reliable products and exceptional service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Who We Are</h2>
            <p className="text-lg">
              Founded with a passion for the construction industry, FundiMart has grown to become a leading online marketplace for building materials in Kenya. Our team comprises industry experts, logistics professionals, and customer service specialists dedicated to your success.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <ul className="list-disc list-inside space-y-3 text-lg">
              <li><strong>Wide Selection:</strong> From cement to power tools, we have everything you need for your project</li>
              <li><strong>Competitive Pricing:</strong> Direct supplier relationships ensure you get the best prices</li>
              <li><strong>Fast Delivery:</strong> Quick and reliable delivery across Kenya</li>
              <li><strong>Expert Support:</strong> Our team is here to help with product selection and advice</li>
              <li><strong>Quality Assurance:</strong> All products meet strict quality standards</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 border rounded">
                <h3 className="font-bold text-lg text-blue-600 mb-2">Integrity</h3>
                <p>We conduct business with honesty and transparency</p>
              </div>
              <div className="p-4 border rounded">
                <h3 className="font-bold text-lg text-blue-600 mb-2">Quality</h3>
                <p>We only provide products that meet our high standards</p>
              </div>
              <div className="p-4 border rounded">
                <h3 className="font-bold text-lg text-blue-600 mb-2">Customer Focus</h3>
                <p>Your satisfaction is our top priority</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-lg">
              Have questions? We'd love to hear from you!
            </p>
            <ul className="list-disc list-inside space-y-2 text-lg mt-3">
              <li>Email: info@fundimart.co.ke</li>
              <li>Phone: +254 (0) XXX XXX XXX</li>
              <li>Address: FundiMart, Kenya</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
