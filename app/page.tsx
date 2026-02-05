import { ChatWidget } from "@/components/ChatWidget";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Navbar simulation */}
      <nav className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            MyMoroccoStore
          </div>
          <div className="flex gap-6 text-sm font-medium text-gray-600">
            <span className="cursor-pointer hover:text-blue-600">Home</span>
            <span className="cursor-pointer hover:text-blue-600">Products</span>
            <span className="cursor-pointer hover:text-blue-600">About</span>
            <span className="cursor-pointer hover:text-blue-600">Contact</span>
          </div>
        </div>
      </nav>

      {/* Hero simulation */}
      <main className="flex-1 max-w-7xl mx-auto p-8 w-full">
         <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100 text-center space-y-6">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
               Authentic Moroccan Products
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
               Discover the best of Morocco, delivered to your doorstep. Handmade crafts, argan oil, rugs, and more.
            </p>
            <div className="pt-4 flex justify-center gap-4">
               <button className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition">
                 Shop Now
               </button>
               <button className="px-8 py-3 bg-gray-100 text-gray-900 rounded-full font-semibold hover:bg-gray-200 transition">
                 Learn More
               </button>
            </div>
         </div>

         {/* Grid simulation */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[1, 2, 3].map((i) => (
               <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-64 flex items-center justify-center text-gray-400">
                  Product Placeholder {i}
               </div>
            ))}
         </div>
      </main>

      {/* The Chat Widget */}
      <ChatWidget />
    </div>
  );
}
