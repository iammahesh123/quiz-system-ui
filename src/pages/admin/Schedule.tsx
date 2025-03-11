import { Calendar as CalendarIcon, Clock, Users } from 'lucide-react';
import { format } from 'date-fns';

const schedules = [
  {
    id: 1,
    title: 'Database Management Quiz',
    department: 'Computer Science',
    teacher: 'Dr. Smith',
    date: new Date(2024, 2, 20, 10, 0),
    duration: 60,
    participants: 45,
  },
  {
    id: 2,
    title: 'Advanced Mathematics Test',
    department: 'Mathematics',
    teacher: 'Prof. Johnson',
    date: new Date(2024, 2, 21, 14, 30),
    duration: 90,
    participants: 32,
  },
  {
    id: 3,
    title: 'Circuit Theory Quiz',
    department: 'Engineering',
    teacher: 'Dr. Williams',
    date: new Date(2024, 2, 22, 9, 0),
    duration: 45,
    participants: 28,
  },
];

export default function AdminSchedule() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Quiz Schedule</h1>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            View Calendar
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            Schedule Quiz
          </button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {schedules.map((schedule) => (
            <li key={schedule.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                        <CalendarIcon className="h-6 w-6 text-indigo-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{schedule.title}</h3>
                      <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500">
                        <span>{schedule.department}</span>
                        <span>•</span>
                        <span>{schedule.teacher}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button className="text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Edit</span>
                      Edit
                    </button>
                    <button className="text-red-400 hover:text-red-500">
                      <span className="sr-only">Delete</span>
                      Delete
                    </button>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      <span>{format(schedule.date, 'PPp')}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="flex-shrink-0 mr-1.5">{schedule.duration} minutes</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      <span>{schedule.participants} participants</span>
                    </div>
                  </div>
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Scheduled
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}