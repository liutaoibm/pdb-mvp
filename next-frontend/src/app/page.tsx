import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <header className="bg-blue-500 text-white py-10 px-6 text-center">
        <h1 className="text-3xl font-bold mb-6">Crafting Technology Tailored for You: Your Vision, Our Expertise</h1>
        <div className="max-w-2xl mx-auto mb-8">
          <p className="text-xl font-medium mb-3">Design Customized Products Effortlessly in a Few Simple Steps...</p>
          <p className="text-lg">Explore Our Extensive Catalog for Your Desired Product or Component...</p>
        </div>
        <div className="flex justify-center space-x-6 mt-8">
          <button className="bg-white text-blue-500 py-2 px-6 rounded-lg font-medium hover:bg-blue-50 transition-all">Watch Demo</button>
          <button className="bg-white text-blue-500 py-2 px-6 rounded-lg font-medium hover:bg-blue-50 transition-all">View Templates</button>
        </div>
      </header>

      <section className="bg-gray-100 text-center py-6">
        <p className="text-xl">Get started</p>
        <a href="/dashboard">
          <button className="bg-blue-500 text-white py-2 px-4 rounded">Create your own space now!</button>
        </a>
      </section>

      <section className="grid grid-cols-2 text-center py-10 bg-gray-100">
        <div>
          <p className="text-4xl text-blue-500">125</p>
          <p className="text-lg">Individual spaces created</p>
        </div>
        <div>
          <p className="text-4xl text-blue-500">286</p>
          <p className="text-lg">Products have been defined</p>
        </div>
      </section>

      <section className="py-10 px-6">
        <h2 className="text-2xl font-bold mb-4">How the IBM Builder works?</h2>
        <ol className="list-decimal list-inside space-y-2 pl-4">
          <li>Create your own space</li>
          <li>Define your product / leverage from repository</li>
          <li>Define your systems</li>
          <li>Define your services</li>
          <li>Finalize corresponding APIs / Resources</li>
        </ol>
        <p className="mt-4">Your product is ready...</p>
      </section>

      <section className="px-6">
        <h2 className="text-2xl font-bold mb-4">Our featured Building Blocks</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Template 01</h3>
            <p>A very short information about Template 01 goes as a link</p>
          </div>
          <div>
            <h3 className="font-semibold">Template 02</h3>
            <p>A very short information about Template 01 goes as a link</p>
          </div>
          <div>
            <h3 className="font-semibold">Template 03</h3>
            <p>A very short information about Template 01 goes as a link</p>
          </div>
          <div>
            <h3 className="font-semibold">Template 04</h3>
            <p>A very short information about Template 01 goes as a link</p>
          </div>
        </div>
        <div className="text-center mt-6">
          <button className="bg-blue-500 text-white py-2 px-4 rounded">View our entire library</button>
        </div>
      </section>

      <footer className="text-center py-10 text-sm">
        <p>For any assistance, email us at <a href="mailto:buildmyproduct@ibm.com" className="text-blue-500">buildmyproduct@ibm.com</a></p>
        <p>Copyright © IBM 2025</p>
      </footer>
    </div>
  );
}
