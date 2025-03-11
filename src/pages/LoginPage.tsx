// import { useState } from 'react';
// import { GraduationCap } from 'lucide-react';
// import LoginForm from '../components/auth/LoginForm';
// import { Link } from 'react-router-dom';

// export default function HomePage() {
//   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

//   return (
//     <div className="flex flex-col min-h-screen font-sans">
//       {/* Header */}
//       <header className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-lg sticky top-0 z-50">
//         {/* Logo and Site Name */}
//         <div className="flex items-center">
//           <h1 className="text-2xl font-bold">Quiz Management System</h1>
//         </div>

//         {/* Navigation Menu */}
//         <nav className="hidden md:flex space-x-6">
//           <Link to="/" className="text-white hover:text-blue-500 transition duration-300">
//             Home
//           </Link>
//           <Link to="/about" className="text-white hover:text-blue-500 transition duration-300">
//             About
//           </Link>
//           <Link to="/features" className="text-white hover:text-blue-500 transition duration-300">
//             Features
//           </Link>
//           <Link to="/contact" className="text-white hover:text-blue-500 transition duration-300">
//             Contact
//           </Link>
//         </nav>

//         {/* Login Button */}
//         <button
//           onClick={() => setIsLoginModalOpen(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md"
//         >
//           Login
//         </button>
//       </header>

//       {/* Rest of the HomePage Content */}
//       <main className="flex-1">
//         {/* Add your existing HomePage content here */}
//       </main>

//       {/* Login Modal */}
//       {isLoginModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
//             <div className="p-6">
//               <div className="sm:mx-auto sm:w-full sm:max-w-md">
//                 <div className="flex justify-center">
//                   <GraduationCap className="h-12 w-12 text-indigo-600" />
//                 </div>
//                 <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//                   Quiz Management System
//                 </h2>
//                 <p className="mt-2 text-center text-sm text-gray-600">
//                   Sign in to access your dashboard
//                 </p>
//               </div>

//               <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//                 <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//                   <LoginForm />

//                   <div className="mt-6">
//                     <div className="relative">
//                       <div className="absolute inset-0 flex items-center">
//                         <div className="w-full border-t border-gray-300" />
//                       </div>
//                       <div className="relative flex justify-center text-sm">
//                         <span className="px-2 bg-white text-gray-500">
//                           New to the platform?
//                         </span>
//                       </div>
//                     </div>

//                     <div className="mt-6 text-center">
//                       <a
//                         href="#"
//                         className="font-medium text-indigo-600 hover:text-indigo-500"
//                       >
//                         Contact your administrator for access
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Close Button */}
//             <div className="absolute top-4 right-4">
//               <button
//                 onClick={() => setIsLoginModalOpen(false)}
//                 className="text-gray-500 hover:text-gray-700 focus:outline-none"
//               >
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>


//   );
// }