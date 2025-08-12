import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Table } from "@/ui/components/Table";
import { Badge } from "@/ui/components/Badge";
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

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

interface FinancialAssessmentTabProps {
  assessmentResults: {
    id: string;
    name: string;
    status: 'completed' | 'pending' | 'failed';
    score: number;
    weight: number;
    recommendation: 'go' | 'no-go' | 'conditional';
    details: string;
    category: 'technical' | 'financial' | 'eligibility' | 'capacity';
  }[];
}

const FinancialAssessmentTab = ({ assessmentResults }: FinancialAssessmentTabProps) => {
  const [viewMode, setViewMode] = useState('table');

  const financialChartData = {
    netWorth: {
      labels: ['Claimed Value', 'Required Value', 'Assessed Value'],
      datasets: [
        {
          label: 'Net Worth (Rs. Cr)',
          data: [247.60, 25.194, 247.60],
          backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
        },
      ],
    },
    annualTurnover: {
      labels: ['Claimed Value', 'Required Value', 'Assessed Value'],
      datasets: [
        {
          label: 'Annual Turnover (Rs. Cr)',
          data: [595.571, 100.776, 595.571],
          backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
        },
      ],
    },
    financialBreakdown: {
      labels: ['Paid-up Share Capital', 'Reserves'],
      datasets: [
        {
          data: [8.00, 239.60],
          backgroundColor: ['#3B82F6', '#10B981'],
        },
      ],
    },
    annualTurnoverHistory: {
      labels: ['2014-15', '2015-16', '2016-17'],
      datasets: [
        {
          data: [562.94, 598.32, 625.45],
          backgroundColor: ['#3B82F6', '#10B981', '#F59E0B'],
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
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ₹${context.parsed.y} Cr`,
        },
      },
    },
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ₹${context.parsed} Cr`,
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Financial Assessment</h3>
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
            <Table
              header={
                <Table.HeaderRow>
                  <Table.HeaderCell>Requirement</Table.HeaderCell>
                  <Table.HeaderCell>Claimed Value</Table.HeaderCell>
                  <Table.HeaderCell>Required Value</Table.HeaderCell>
                  <Table.HeaderCell>Assessed Value</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                </Table.HeaderRow>
              }
            >
              <Table.Row>
                <Table.Cell>
                  <span className="text-body font-body text-neutral-700">Net Worth</span>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-body font-body text-neutral-500">
                    Rs. 247.60 Cr
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-body font-body text-neutral-500">
                    Rs. 25.194 Cr
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-body font-body text-neutral-500">
                    Rs. 247.60 Cr
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <Badge variant="success" icon="FeatherCheck">
                    Compliant
                  </Badge>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <span className="text-body font-body text-neutral-700">
                    Annual Turnover
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-body font-body text-neutral-500">
                    Rs. 595.571 Cr
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-body font-body text-neutral-500">
                    Rs. 100.776 Cr
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-body font-body text-neutral-500">
                    Rs. 595.571 Cr
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <Badge variant="success" icon="FeatherCheck">
                    Compliant
                  </Badge>
                </Table.Cell>
              </Table.Row>
            </Table>

            <div className="flex w-full flex-col items-start gap-4">
              <span className="text-heading-3 font-heading-3 text-default-font">
                Financial Breakdown
              </span>
              <Table
                header={
                  <Table.HeaderRow>
                    <Table.HeaderCell>Component</Table.HeaderCell>
                    <Table.HeaderCell>Amount (₹ Cr)</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                  </Table.HeaderRow>
                }
              >
                <Table.Row>
                  <Table.Cell>
                    <span className="text-body-bold font-body-bold text-default-font">
                      Paid-up Share Capital
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-body font-body text-default-font">8.00</span>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge variant="success" icon="FeatherCheck">
                      Verified
                    </Badge>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <span className="text-body-bold font-body-bold text-default-font">
                      Reserves
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-body font-body text-default-font">239.60</span>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge variant="success" icon="FeatherCheck">
                      Verified
                    </Badge>
                  </Table.Cell>
                </Table.Row>
              </Table>
            </div>
            <div className="flex w-full flex-col items-start gap-4">
              <span className="text-heading-3 font-heading-3 text-default-font">
                Annual Turnover History
              </span>
              <Table
                header={
                  <Table.HeaderRow>
                    <Table.HeaderCell>Financial Year</Table.HeaderCell>
                    <Table.HeaderCell>Turnover (₹ Cr)</Table.HeaderCell>
                    <Table.HeaderCell>Verification</Table.HeaderCell>
                  </Table.HeaderRow>
                }
              >
                <Table.Row>
                  <Table.Cell>
                    <span className="text-body-bold font-body-bold text-default-font">
                      2016-17
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-body font-body text-default-font">625.45</span>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge variant="success" icon="FeatherCheck">
                      Audited
                    </Badge>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <span className="text-body-bold font-body-bold text-default-font">
                      2015-16
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-body font-body text-default-font">598.32</span>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge variant="success" icon="FeatherCheck">
                      Audited
                    </Badge>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <span className="text-body-bold font-body-bold text-default-font">
                      2014-15
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-body font-body text-default-font">562.94</span>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge variant="success" icon="FeatherCheck">
                      Audited
                    </Badge>
                  </Table.Cell>
                </Table.Row>
              </Table>
            </div>
          </>
        ) : (
          <div className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6">
            <div className='flex w-full gap-6'>
            <div className="w-1/2">
              <h4 className="text-lg font-semibold mb-2">Net Worth</h4>
              <Bar data={financialChartData.netWorth} options={chartOptions} />
            </div>
            <div className="w-1/2">
              <h4 className="text-lg font-semibold mb-2">Annual Turnover</h4>
              <Bar data={financialChartData.annualTurnover} options={chartOptions} />
            </div>
            </div>
            <div className="w-full">
              <h4 className="text-lg font-semibold mb-2">Financial Breakdown</h4>
              <div className="max-w-md mx-auto">
                <Pie data={financialChartData.financialBreakdown} options={pieChartOptions} />
              </div>
            </div>
            <div className="w-full">
              <h4 className="text-lg font-semibold mb-2">Annual Turnover History</h4>
              <div className="max-w-md mx-auto">
                <Pie data={financialChartData.annualTurnoverHistory} options={pieChartOptions} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialAssessmentTab;