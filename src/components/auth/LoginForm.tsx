// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { LoginFormData } from '../../types/auth';
// import { Lock, Mail, AlertCircle } from 'lucide-react';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import API from '../../api/axiosInstance';

// const loginSchema = z.object({
//   email: z.string().email('Please enter a valid email'),
//   password: z.string().min(6, 'Password must be at least 6 characters'),
// });

// export default function LoginForm() {
//   const [loginError, setLoginError] = useState<string>('');
//   const navigate = useNavigate();
//   const { dispatch } = useAuth();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<LoginFormData>({
//     resolver: zodResolver(loginSchema),
//   });

//   const onSubmit = async (data: { email: string; password: string }) => {
//     setLoginError("");
//     try {
//       const response = await API.post("/login", data);
//       const { token, ...userDetails } = response.data;

//       // Save user in global state
//       dispatch({ type: "LOGIN", payload: { ...userDetails, token } });

//       navigate(`/${userDetails.role}`); // Redirect user to role-based page
//     } catch (error: any) {
//       setLoginError(error.response?.data?.message || "Login failed. Please try again.");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
//       <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
//       {/* <div className="mb-6 p-4 bg-blue-50 rounded-lg">
//         <h3 className="text-sm font-medium text-blue-800 mb-2">Sample Credentials:</h3>
//         <div className="space-y-1 text-sm text-blue-700">
//           <p>Admin: admin@quiz.com / admin123</p>
//           <p>Teacher: teacher@quiz.com / teacher123</p>
//           <p>Student: student@quiz.com / student123</p>
//         </div>
//       </div> */}

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full max-w-sm">
//         {loginError && (
//           <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-md">
//             <AlertCircle className="h-5 w-5" />
//             <p className="text-sm">{loginError}</p>
//           </div>
//         )}

//         <div>
//           <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//             Email
//           </label>
//           <div className="mt-1 relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Mail className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               {...register('email')}
//               type="email"
//               className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               placeholder="you@example.com"
//             />
//           </div>
//           {errors.email && (
//             <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
//           )}
//         </div>

//         <div>
//           <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//             Password
//           </label>
//           <div className="mt-1 relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Lock className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               {...register('password')}
//               type="password"
//               className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               placeholder="••••••••"
//             />
//           </div>
//           {errors.password && (
//             <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
//           )}
//         </div>

//         <div className="flex items-center justify-between">
//           <div className="flex items-center">
//             <input
//               id="remember-me"
//               name="remember-me"
//               type="checkbox"
//               className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//             />
//             <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
//               Remember me
//             </label>
//           </div>

//           <div className="text-sm">
//             <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
//               Forgot password?
//             </a>
//           </div>
//         </div>

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
//         >
//           {isSubmitting ? 'Signing in...' : 'Sign in'}
//         </button>
//       </form>
//     </div>
//   );
// }