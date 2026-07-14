export default function HelpCenter() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Help Center</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I place an order?</h3>
                <p className="text-gray-700">
                  Simply browse our products, add items to your cart, and proceed to checkout. You'll need to create an account or log in to complete your purchase.
                </p>
              </div>

              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What are your delivery times?</h3>
                <p className="text-gray-700">
                  Delivery times depend on your location. Most orders are delivered within 3-5 business days for Nairobi and surrounding areas. Remote areas may take longer.
                </p>
              </div>

              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-700">
                  We accept various payment methods including M-Pesa, bank transfers, credit/debit cards, and cash on delivery for selected areas.
                </p>
              </div>

              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I return items?</h3>
                <p className="text-gray-700">
                  Yes, we offer returns within 14 days of delivery for most items in original condition. Please contact our support team to initiate a return.
                </p>
              </div>

              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you offer bulk discounts?</h3>
                <p className="text-gray-700">
                  Yes! We offer special pricing for bulk orders. Contact our sales team for a custom quote.
                </p>
              </div>

              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How can I track my order?</h3>
                <p className="text-gray-700">
                  Once your order is shipped, you'll receive a tracking number via email. Use it to track your delivery in real-time.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-blue-50 rounded">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Email Support</h3>
                <p className="text-gray-700 mb-2">Get help via email within 24 hours</p>
                <p className="text-blue-600 font-semibold">support@fundimart.co.ke</p>
              </div>
              <div className="p-6 bg-green-50 rounded">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Phone Support</h3>
                <p className="text-gray-700 mb-2">Call us during business hours</p>
                <p className="text-green-600 font-semibold">+254 (0) XXX XXX XXX</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
