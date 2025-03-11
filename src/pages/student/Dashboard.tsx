import { BookOpen, BarChart3, CheckCircle, Calendar } from 'lucide-react';

const stats = [
  {
    name: 'Total Quizzes Taken',
    value: '12',
    change: '+3%',
    icon: BookOpen,
  },
  {
    name: 'Average Score',
    value: '78%',
    change: '+5%',
    icon: BarChart3,
  },
  {
    name: 'Completion Rate',
    value: '95%',
    change: '+2%',
    icon: CheckCircle,
  },
  {
    name: 'Upcoming Quizzes',
    value: '3',
    change: '+1',
    icon: Calendar,
  },
];

const recentQuizzes = [
  {
    id: 1,
    title: 'Database Fundamentals',
    date: '2 days ago',
    score: 85,
  },
  {
    id: 2,
    title: 'Data Structures',
    date: '1 week ago',
    score: 72,
  },
  {
    id: 3,
    title: 'Algorithm Analysis',
    date: '10 days ago',
    score: 78,
  },
];

export default function StudentDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Student Dashboard</h1>
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
                  <p className="text-sm font-medium text-gray-900">Score: {quiz.score}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Upcoming Quizzes</h2>
          <div className="space-y-4">
            {[ 
              { time: '10:00 AM', title: 'Operating Systems', class: 'CS-302' },
              { time: '1:30 PM', title: 'Computer Networks', class: 'CS-202' },
              { time: '3:00 PM', title: 'AI and ML Quiz', class: 'CS-501' },
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
