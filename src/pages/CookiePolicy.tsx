export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
        
        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Cookies</h2>
            <p>
              Cookies are small pieces of data stored on your browser or device. They help us remember your preferences, understand how you use our website, and improve your experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Types of Cookies We Use</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Essential Cookies</h3>
            <p>
              These cookies are necessary for the website to function properly and cannot be disabled. They enable core functionality such as security, network management, and accessibility.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Performance Cookies</h3>
            <p>
              These cookies collect information about how you use our website, such as which pages you visit most often and whether you get error messages. This information helps us improve the performance of our website.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Functional Cookies</h3>
            <p>
              These cookies allow our website to remember choices you make (such as your user name or region) and provide enhanced, more personalized features.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Marketing Cookies</h3>
            <p>
              These cookies are used to deliver advertisements relevant to you and your interests. They also limit the number of times you see an advertisement and measure the effectiveness of advertising campaigns.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Control Cookies</h2>
            <p>
              You have the right to decide whether to accept or reject cookies. You can exercise this right by setting your preferences in our cookie management tool. You can also adjust your browser settings to reject cookies, although doing so may prevent you from using some features of our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Cookies</h2>
            <p>
              In addition to our own cookies, we may allow third parties to place cookies on your device for:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Analytics and performance tracking</li>
              <li>Marketing and advertising</li>
              <li>Social media integration</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
            <p>
              Under various data protection regulations, you have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Access information about cookies we use</li>
              <li>Opt-out of certain types of cookies</li>
              <li>Request deletion of cookies</li>
              <li>Lodge a complaint with relevant authorities</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p>
              If you have questions about our use of cookies, please contact us at:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Email: privacy@fundimart.co.ke</li>
              <li>Address: FundiMart, Kenya</li>
            </ul>
          </section>

          <div className="mt-12 p-4 bg-gray-100 rounded">
            <p className="text-sm text-gray-600">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
