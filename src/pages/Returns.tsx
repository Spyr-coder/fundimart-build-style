export default function Returns() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Returns & Refunds Policy</h1>
        
        <div className="space-y-8">
          <section className="bg-green-50 p-6 rounded">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">30-Day Return Guarantee</h2>
            <p className="text-gray-700">
              We want you to be completely satisfied with your purchase. If you're not happy with your order, you can return it within 30 days for a full refund or exchange.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Return Eligibility</h2>
            <p className="text-gray-700 mb-4">Items are eligible for return if they:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Are unused and in original condition</li>
              <li>Have all original packaging and materials</li>
              <li>Include the original receipt or order confirmation</li>
              <li>Were purchased within the last 30 days</li>
              <li>Are not on the exclusion list (see below)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Non-Returnable Items</h2>
            <p className="text-gray-700 mb-4">The following items cannot be returned:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Custom or made-to-order items</li>
              <li>Items damaged due to misuse</li>
              <li>Clearance or final sale items</li>
              <li>Used or opened items (unless defective)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Return an Item</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-bold text-gray-900">Step 1: Contact Us</h3>
                <p className="text-gray-700">Email our support team with your order number and reason for return</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-bold text-gray-900">Step 2: Receive Return Label</h3>
                <p className="text-gray-700">We'll send you a pre-paid return shipping label</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-bold text-gray-900">Step 3: Ship the Item</h3>
                <p className="text-gray-700">Pack the item securely and use the provided label to ship it back</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-bold text-gray-900">Step 4: Receive Refund</h3>
                <p className="text-gray-700">Once we receive and inspect your return, we'll process your refund within 5-7 business days</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Refunds</h2>
            <p className="text-gray-700 mb-4">
              Refunds are processed within 5-7 business days after we receive your return. The refund will be credited back to your original payment method.
            </p>
            <p className="text-gray-700">
              <strong>Note:</strong> Original shipping charges are non-refundable unless the item is defective.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Defective Items</h2>
            <p className="text-gray-700 mb-4">
              If you receive a defective item, we'll arrange a replacement or refund immediately at no cost to you.
            </p>
            <p className="text-gray-700">
              Please contact our support team within 48 hours of delivery with photos of the defect.
            </p>
          </section>

          <section className="bg-blue-50 p-6 rounded">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help?</h2>
            <p className="text-gray-700 mb-4">
              For return requests or questions, contact our customer service team:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Email: returns@fundimart.co.ke</li>
              <li>Phone: +254 (0) XXX XXX XXX</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
