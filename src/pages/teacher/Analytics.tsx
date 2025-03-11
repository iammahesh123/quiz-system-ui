import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const performanceData = {
  labels: ['Quiz 1', 'Quiz 2', 'Quiz 3', 'Quiz 4', 'Quiz 5'],
  datasets: [
    {
      label: 'Class Average',
      data: [75, 68, 82, 71, 85],
      backgroundColor: 'rgba(79, 70, 229, 0.8)',
    },
  ],
};

const participationData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Student Participation',
      data: [65, 70, 75, 72, 80, 85],
      borderColor: 'rgb(79, 70, 229)',
      tension: 0.3,
    },
  ],
};

const stats = [
  { label: 'Total Quizzes', value: '25' },
  { label: 'Active Students', value: '156' },
  { label: 'Average Score', value: '76%' },
  { label: 'Completion Rate', value: '89%' },
];

export default function TeacherAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Class Analytics</h1>
        <div className="flex gap-4">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
            <option value="all">All Classes</option>
            <option value="cs101">CS 101</option>
            <option value="cs201">CS 201</option>
            <option value="cs301">CS 301</option>
          </select>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Quiz Performance
          </h2>
          <Bar
            data={performanceData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100,
                },
              },
            }}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Student Participation Trend
          </h2>
          <Line
            data={participationData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100,
                },
              },
            }}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Performance Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-medium text-green-800">Top Performing Areas</h3>
              <ul className="mt-2 space-y-2 text-sm text-green-700">
                <li>• Database concepts show highest scores</li>
                <li>• Participation rate increased by 15%</li>
                <li>• Assignment completion rate at 92%</li>
              </ul>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="font-medium text-red-800">Areas Needing Attention</h3>
              <ul className="mt-2 space-y-2 text-sm text-red-700">
                <li>• Algorithm complexity topics need review</li>
                <li>• 15% students below target score</li>
                <li>• Late submission rate at 8%</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}