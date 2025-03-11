import { BarChart3, Users, Calendar, CheckCircle } from 'lucide-react';

const stats = [
  {
    name: 'Total Students',
    value: '156',
    change: '+12%',
    icon: Users,
  },
  {
    name: 'Active Quizzes',
    value: '8',
    change: '+5%',
    icon: Calendar,
  },
  {
    name: 'Completion Rate',
    value: '92%',
    change: '+2%',
    icon: CheckCircle,
  },
  {
    name: 'Average Score',
    value: '76%',
    change: '+4%',
    icon: BarChart3,
  },
];

const recentQuizzes = [
  {
    id: 1,
    title: 'Database Fundamentals',
    date: '2 hours ago',
    participants: 45,
    averageScore: 82,
  },
  {
    id: 2,
    title: 'Data Structures',
    date: '1 day ago',
    participants: 38,
    averageScore: 75,
  },
  {
    id: 3,
    title: 'Algorithm Analysis',
    date: '2 days ago',
    participants: 42,
    averageScore: 79,
  },
];

export default function TeacherDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Teacher Dashboard</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Create New Quiz
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                        stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Quizzes</h2>
          <div className="space-y-4">
            {recentQuizzes.map((quiz) => (
              <div key={quiz.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{quiz.title}</h3>
                  <p className="text-sm text-gray-500">{quiz.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{quiz.participants} students</p>
                  <p className="text-sm text-gray-500">Avg: {quiz.averageScore}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Upcoming Schedule</h2>
          <div className="space-y-4">
            {[
              { time: '10:00 AM', title: 'Database Quiz', class: 'CS-301' },
              { time: '2:30 PM', title: 'Data Structures Review', class: 'CS-201' },
              { time: '4:00 PM', title: 'Algorithm Analysis Quiz', class: 'CS-401' },
            ].map((event, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="flex-none w-20 text-sm text-gray-500">{event.time}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{event.title}</p>
                  <p className="text-sm text-gray-500">{event.class}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}