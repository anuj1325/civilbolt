import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Users } from 'lucide-react';

function Badged({ children, color = 'green', icon }: { children: React.ReactNode; color?: string; icon?: React.ReactNode }) {
  const colorMap: Record<string, string> = {
    green: 'bg-green-100 text-green-800',
    blue: 'bg-blue-100 text-blue-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    red: 'bg-red-100 text-red-800',
    gray: 'bg-gray-100 text-gray-800',
    purple: 'bg-purple-100 text-purple-800',
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${colorMap[color] || colorMap.green}`}>
      {icon && <span>{icon}</span>}
      {children}
    </span>
  );
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface CompetitorAnalysisTabProps {
  competitorAnalysis: {
    selectedCount: number;
    competitors: string[];
  };
}

const CompetitorAnalysisTab = ({ competitorAnalysis }: CompetitorAnalysisTabProps) => {
  const [viewMode, setViewMode] = useState('table');

  // Competitor Analysis Chart Data
  const competitorChartData = {
    minThresholdCapability: {
      labels: ['Iron Triangle', 'Competitor A', 'Competitor B'],
      datasets: [
        {
          label: 'Min Threshold Capability (Rs. Cr)',
          data: [1405.2, 1500, 1200],
          backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
        },
      ],
    },
    leadMemberShare: {
      labels: ['Iron Triangle', 'Competitor A', 'Competitor B'],
      datasets: [
        {
          label: 'Lead Member Share (Rs. Cr)',
          data: [1405.2, 1200, 1000],
          backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
        },
      ],
    },
    jvMemberShare: {
      labels: ['Iron Triangle', 'Competitor A', 'Competitor B'],
      datasets: [
        {
          label: 'JV Member Share (Rs. Cr)',
          data: [0, 150, 300],
          backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
        },
      ],
    },
    similarWorkCategory: {
      labels: ['Iron Triangle', 'Competitor A', 'Competitor B'],
      datasets: [
        {
          label: 'Similar Work Category (Rs. Cr)',
          data: [9337.5, 800, 700],
          backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
        },
      ],
    },
    netWorth: {
      labels: ['Iron Triangle', 'Competitor A', 'Competitor B'],
      datasets: [
        {
          label: 'Net Worth (Rs. Cr)',
          data: [247.6, 220, 180],
          backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
        },
      ],
    },
    avgAnnualTurnover: {
      labels: ['Iron Triangle', 'Competitor A', 'Competitor B'],
      datasets: [
        {
          label: 'Avg Annual Turnover (Rs. Cr)',
          data: [619.92, 580, 450],
          backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
        },
      ],
    },
    cashAccruals: {
      labels: ['Iron Triangle', 'Competitor A', 'Competitor B'],
      datasets: [
        {
          label: 'Cash Accruals (Rs. Cr)',
          data: [251.61, 230, 200],
          backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
        },
      ],
    },
    bidCapacity: {
      labels: ['Iron Triangle', 'Competitor A', 'Competitor B'],
      datasets: [
        {
          label: 'Bid Capacity (Rs. Cr)',
          data: [1947.78, 1800, 1500],
          backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
        },
      ],
    },
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Competitor Analysis</h3>
          <div className="flex gap-2">
            <button
              className={`px-4 py-2 rounded-md ${viewMode === 'table' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setViewMode('table')}
            >
              Table View
            </button>
            <button
              className={`px-4 py-2 rounded-md ${viewMode === 'graph' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setViewMode('graph')}
            >
              Graph View
            </button>
          </div>
        </div>

        {viewMode === 'table' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-purple-800">Iron Triangle Limited</span>
                </div>
                <div className="text-2xl font-bold text-purple-900 mb-1">88%</div>
                <Badged color="gray">Medium</Badged>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-blue-800">Competitor A</span>
                </div>
                <div className="text-2xl font-bold text-blue-900 mb-1">97%</div>
                <Badged color="green">High</Badged>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">Competitor B</span>
                </div>
                <div className="text-2xl font-bold text-green-900 mb-1">100%</div>
                <Badged color="green">High</Badged>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-gray-700 font-semibold border-b">
                    <th className="py-3 px-4 text-left">Parameter</th>
                    <th className="py-3 px-4 text-left">Required</th>
                    <th className="py-3 px-4 text-left">Iron Triangle</th>
                    <th className="py-3 px-4 text-left">Competitor A</th>
                    <th className="py-3 px-4 text-left">Competitor B</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium text-gray-900" colSpan={5}>Technical Capacity</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Min Threshold Capability</td>
                    <td className="py-3 px-4">100776</td>
                    <td className="py-3 px-4 text-green-700">1405.2 <Badged color="green">100%</Badged></td>
                    <td className="py-3 px-4 text-green-700">1500 <Badged color="green">100%</Badged></td>
                    <td className="py-3 px-4 text-green-700">1200 <Badged color="green">100%</Badged></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Lead Member Share</td>
                    <td className="py-3 px-4">604.66</td>
                    <td className="py-3 px-4 text-green-700">1405.2 <Badged color="green">100%</Badged></td>
                    <td className="py-3 px-4 text-green-700">1200 <Badged color="green">100%</Badged></td>
                    <td className="py-3 px-4 text-green-700">1000 <Badged color="green">100%</Badged></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">JV Member Share</td>
                    <td className="py-3 px-4">201.55</td>
                    <td className="py-3 px-4 text-red-700">0 <Badged color="red">0%</Badged></td>
                    <td className="py-3 px-4 text-blue-700">150 <Badged color="blue">74%</Badged></td>
                    <td className="py-3 px-4 text-green-700">300 <Badged color="green">100%</Badged></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Similar Work Category</td>
                    <td className="py-3 px-4">125.97</td>
                    <td className="py-3 px-4 text-green-700">9337.5 <Badged color="green">100%</Badged></td>
                    <td className="py-3 px-4 text-green-700">800 <Badged color="green">100%</Badged></td>
                    <td className="py-3 px-4 text-green-700">700 <Badged color="green">100%</Badged></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium text-gray-900" colSpan={5}>Financial Capacity</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Net Worth</td>
                    <td className="py-3 px-4">25.19</td>
                    <td className="py-3 px-4 text-green-700">247.6 <Badged color="green">100%</Badged></td>
                    <td className="py-3 px-4 text-green-700">220 <Badged color="green">100%</Badged></td>
                    <td className="py-3 px-4 text-green-700">180 <Badged color="green">100%</Badged></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Avg Annual Turnover</td>
                    <td className="py-3 px-4">100.78</td>
                    <td className="py-3 px-4 text-green-700">619.92 <Badged color="green">100%</Badged></td>
                    <td className="py-3 px-4 text-green-700">580 <Badged color="green">100%</Badged></td>
                    <td className="py-3 px-4 text-green-700">450 <Badged color="green">100%</Badged></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Cash Accruals</td>
                    <td className="py-3 px-4">150</td>
                    <td className="py-3 px-4 text-green-700">251.61 <Badged color="green">100%</Badged></td>
                    <td className="py-3 px-4 text-green-700">230 <Badged color="green">100%</Badged></td>
                    <td className="py-3 px-4 text-green-700">200 <Badged color="green">100%</Badged></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Bid Capacity</td>
                    <td className="py-3 px-4">503.88</td>
                    <td className="py-3 px-4 text-green-700">1947.78 <Badged color="green">100%</Badged></td>
                    <td className="py-3 px-4 text-green-700">1800 <Badged color="green">100%</Badged></td>
                    <td className="py-3 px-4 text-green-700">1500 <Badged color="green">100%</Badged></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6">
            <div className='grid grid-cols-2 w-full gap-6'>
            <div className="w-full">
              <h4 className="text-lg font-semibold mb-2">Min Threshold Capability</h4>
              <Bar data={competitorChartData.minThresholdCapability} options={chartOptions} />
            </div>
            <div className="w-full">
              <h4 className="text-lg font-semibold mb-2">Lead Member Share</h4>
              <Bar data={competitorChartData.leadMemberShare} options={chartOptions} />
            </div>
            <div className="w-full">
              <h4 className="text-lg font-semibold mb-2">JV Member Share</h4>
              <Bar data={competitorChartData.jvMemberShare} options={chartOptions} />
            </div>
            <div className="w-full">
              <h4 className="text-lg font-semibold mb-2">Similar Work Category</h4>
              <Bar data={competitorChartData.similarWorkCategory} options={chartOptions} />
            </div>
            <div className="w-full">
              <h4 className="text-lg font-semibold mb-2">Net Worth</h4>
              <Bar data={competitorChartData.netWorth} options={chartOptions} />
            </div>
            <div className="w-full">
              <h4 className="text-lg font-semibold mb-2">Average Annual Turnover</h4>
              <Bar data={competitorChartData.avgAnnualTurnover} options={chartOptions} />
            </div>
            <div className="w-full">
              <h4 className="text-lg font-semibold mb-2">Cash Accruals</h4>
              <Bar data={competitorChartData.cashAccruals} options={chartOptions} />
            </div>
            <div className="w-full">
              <h4 className="text-lg font-semibold mb-2">Bid Capacity</h4>
              <Bar data={competitorChartData.bidCapacity} options={chartOptions} />
            </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompetitorAnalysisTab;