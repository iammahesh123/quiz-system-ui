import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Lock, Mail, AlertCircle, User, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../api/axiosInstance';
import { LoginFormData, RegisterFormData, ForgotPasswordFormData } from '../../types/auth';

// Define the login schema using Zod
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Define the registration schema using Zod
const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm Password must be at least 6 characters'),
  role: z.enum(['ADMIN', 'TEACHER', 'STUDENT'], {
    required_error: 'Please select a role',
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

// Define the forgot password schema using Zod
const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email'),
});

// Define the props interface for LoginModal
interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [view, setView] = useState<'login' | 'register' | 'forgotPassword'>('login'); // Toggle between views
  const [loginError, setLoginError] = useState<string>('');
  const [registerError, setRegisterError] = useState<string>('');
  const [forgotPasswordError, setForgotPasswordError] = useState<string>('');
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState<string>('');
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors, isSubmitting: isLoginSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors, isSubmitting: isRegisterSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const {
    register: forgotPasswordRegister,
    handleSubmit: handleForgotPasswordSubmit,
    formState: { errors: forgotPasswordErrors, isSubmitting: isForgotPasswordSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmitLogin = async (data: LoginFormData) => {
    setLoginError('');
    console.log('Submitting login form with data:', data); // Debugging log

    try {
      const response = await API.post('auth/login', data);
      console.log('API response:', response.data); // Debugging log

      const { token, role } = response.data;

      // Normalize the role to lowercase
      const normalizedRole = role.toLowerCase();
      console.log('Normalized role:', normalizedRole); // Debugging log

      // Save user in global state
      dispatch({
        type: 'LOGIN',
        payload: {
          id: 'user-id', // Add a unique user ID (if available)
          email: data.email, // Use the email from the form
          role: normalizedRole, // Use the normalized role
          token, // Include the token
        },
      });

      console.log('User logged in successfully. Redirecting to:', `/${normalizedRole}`); // Debugging log

      // Redirect to role-based dashboard
      navigate(`/${normalizedRole}`);
    } catch (error: any) {
      console.error('Login error:', error); // Debugging log
      setLoginError(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const onSubmitRegister = async (data: RegisterFormData) => {
    setRegisterError('');
    console.log('Submitting registration form with data:', data); // Debugging log

    try {
      // Ensure the role is sent in uppercase
      const payload = {
        ...data,
        role: data.role.toUpperCase(), // Convert role to uppercase
      };

      const response = await API.post('auth/register', payload);
      console.log('API response:', response.data); // Debugging log

      // Automatically log the user in after registration
      await onSubmitLogin({ email: data.email, password: data.password });
    } catch (error: any) {
      console.error('Registration error:', error); // Debugging log
      setRegisterError(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  const onSubmitForgotPassword = async (data: ForgotPasswordFormData) => {
    setForgotPasswordError('');
    setForgotPasswordSuccess('');
    console.log('Submitting forgot password form with data:', data); // Debugging log

    try {
      const response = await API.post('auth/forgot-password', data);
      console.log('API response:', response.data); // Debugging log

      // Show success message
      setForgotPasswordSuccess('Password reset email sent. Please check your inbox.');
    } catch (error: any) {
      console.error('Forgot password error:', error); // Debugging log
      setForgotPasswordError(error.response?.data?.message || 'Failed to send reset email. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg w-96 relative">
        {/* X Button in Top-Right Corner */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="h-6 w-6 text-gray-600" />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">
          {view === 'login'
            ? 'Login'
            : view === 'register'
            ? 'Register'
            : 'Forgot Password'}
        </h2>

        {/* Display login, registration, or forgot password error */}
        {(loginError || registerError || forgotPasswordError) && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-md mb-4">
            <AlertCircle className="h-5 w-5" />
            <p className="text-sm">{loginError || registerError || forgotPasswordError}</p>
          </div>
        )}

        {/* Display forgot password success message */}
        {forgotPasswordSuccess && (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-md mb-4">
            <AlertCircle className="h-5 w-5" />
            <p className="text-sm">{forgotPasswordSuccess}</p>
          </div>
        )}

        {view === 'login' ? (
          // Login Form
          <form onSubmit={handleLoginSubmit(onSubmitLogin)} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...loginRegister('email')}
                  type="email"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
              {loginErrors.email && (
                <p className="mt-1 text-sm text-red-600">{loginErrors.email.message}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...loginRegister('password')}
                  type="password"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
              {loginErrors.password && (
                <p className="mt-1 text-sm text-red-600">{loginErrors.password.message}</p>
              )}
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <button
                  type="button"
                  onClick={() => setView('forgotPassword')}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoginSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoginSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        ) : view === 'register' ? (
          // Registration Form
          <form onSubmit={handleRegisterSubmit(onSubmitRegister)} className="space-y-6">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...registerRegister('name')}
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Your Name"
                />
              </div>
              {registerErrors.name && (
                <p className="mt-1 text-sm text-red-600">{registerErrors.name.message}</p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...registerRegister('email')}
                  type="email"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
              {registerErrors.email && (
                <p className="mt-1 text-sm text-red-600">{registerErrors.email.message}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...registerRegister('password')}
                  type="password"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
              {registerErrors.password && (
                <p className="mt-1 text-sm text-red-600">{registerErrors.password.message}</p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...registerRegister('confirmPassword')}
                  type="password"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
              {registerErrors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{registerErrors.confirmPassword.message}</p>
              )}
            </div>

            {/* Role Selection */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <div className="mt-1">
                <select
                  {...registerRegister('role')}
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select a role</option>
                  <option value="ADMIN">Admin</option>
                  <option value="TEACHER">Teacher</option>
                  <option value="STUDENT">Student</option>
                </select>
              </div>
              {registerErrors.role && (
                <p className="mt-1 text-sm text-red-600">{registerErrors.role.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isRegisterSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isRegisterSubmitting ? 'Registering...' : 'Register'}
            </button>
          </form>
        ) : (
          // Forgot Password Form
          <form onSubmit={handleForgotPasswordSubmit(onSubmitForgotPassword)} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...forgotPasswordRegister('email')}
                  type="email"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
              {forgotPasswordErrors.email && (
                <p className="mt-1 text-sm text-red-600">{forgotPasswordErrors.email.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isForgotPasswordSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isForgotPasswordSubmitting ? 'Sending...' : 'Send Reset Email'}
            </button>
          </form>
        )}

        {/* Toggle between Login and Register */}
        {view !== 'forgotPassword' && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setView(view === 'login' ? 'register' : 'login')}
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              {view === 'login'
                ? 'Need an account? Register here.'
                : 'Already have an account? Login here.'}
            </button>
          </div>
        )}

        {/* Back to Login (for Forgot Password view) */}
        {view === 'forgotPassword' && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setView('login')}
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginModal;