import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Shield, 
  BarChart3, 
  Download, 
  Printer, 
  Share2, 
  ArrowLeft,
  Calendar,
  MapPin,
  Building,
  Award,
  Target,
  PieChart as PieChartIcon
} from 'lucide-react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Table } from "@/ui/components/Table";
import { ProjectDetailsBlade2 } from "@/ui/components/ProjectDetailsBlade2";
import * as SubframeCore from "@subframe/core";
import { Badge } from "@/ui/components/Badge";
import { GeographicalExperience } from "@/ui/components/GeographicalExperience";
import TechnicalAssessmentTab from './TechnicalAssessmentTab'
import CompetitorAnalysisTab from './CompetitorAnalysisTab';
import FinancialAssessmentTab from './FinancialAssessmentTab';
import SwotAnalysisTab from './SwotAnalysisTab';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

interface AssessmentResult {
  id: string;
  name: string;
  status: 'completed' | 'pending' | 'failed';
  score: number;
  weight: number;
  recommendation: 'go' | 'no-go' | 'conditional';
  details: string;
  category: 'technical' | 'financial' | 'eligibility' | 'capacity';
}

interface ReportPageProps {
  onClose: () => void;
  assessmentResults: AssessmentResult[];
  projectDetails: {
    name: string;
    value: string;
    location: string;
    duration: string;
    client: string;
  };
  competitorAnalysis: {
    selectedCount: number;
    competitors: string[];
  };
  overallScore: number;
  finalDecision: 'go' | 'no-go' | 'conditional';
}

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

function ProgressBar({ percentage, color = 'blue' }: { percentage: number; color?: string }) {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500',
  };
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className={`h-2 rounded-full transition-all duration-300 ${colorMap[color] || colorMap.blue}`} 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}

function ReportPage({ onClose, assessmentResults, projectDetails, competitorAnalysis, overallScore, finalDecision }: ReportPageProps) {
  const [activeTab, setActiveTab] = useState('summary');

  const getDecisionColor = (decision: string) => {
    switch (decision) {
      case 'go': return 'green';
      case 'no-go': return 'red';
      case 'conditional': return 'yellow';
      default: return 'gray';
    }
  };

  const getDecisionIcon = (decision: string) => {
    switch (decision) {
      case 'go': return <CheckCircle className="w-4 h-4" />;
      case 'no-go': return <XCircle className="w-4 h-4" />;
      case 'conditional': return <AlertTriangle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const categoryData = {
    labels: ['Technical', 'Financial', 'Eligibility', 'Capacity'],
    datasets: [
      {
        data: [85, 92, 95, 78],
        backgroundColor: ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const tabs = [
    { id: 'summary', label: 'Executive Summary', icon: FileText },
    { id: 'technical-assessment', label: 'Technical Assessment', icon: BarChart3 },
    { id: 'financial-assessment', label: 'Financial Assessment', icon: DollarSign },
    { id: 'competitors', label: 'Competitor Analysis', icon: Users },
    { id: 'bid-capacity', label: 'Bid Capacity', icon: PieChartIcon },
    { id: 'swot-analysis', label: 'SWOT Analysis', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h2 className="text-xl font-bold text-gray-900">Report Summary</h2>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4" />
              Export PDF
            </button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <Building className="w-5 h-5 text-blue-600" />
                        <div>
                            <div className="text-sm text-gray-500">Project Name</div>
                            <div className="font-semibold text-gray-900">{projectDetails.name}</div>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        <div>
                            <div className="text-sm text-gray-500">Project Value</div>
                            <div className="font-semibold text-gray-900">{projectDetails.value}</div>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-red-600" />
                        <div>
                            <div className="text-sm text-gray-500">Location</div>
                            <div className="font-semibold text-gray-900">{projectDetails.location}</div>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-purple-600" />
                        <div>
                            <div className="text-sm text-gray-500">Duration</div>
                            <div className="font-semibold text-gray-900">{projectDetails.duration}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === tab.id 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'summary' && (
            <div className="space-y-6">
              {/* Overall Assessment Score */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Overall Assessment Score</h3>
                  <Badged 
                    color={getDecisionColor(finalDecision)} 
                    icon={getDecisionIcon(finalDecision)}
                  >
                    {finalDecision.toUpperCase()} DECISION
                  </Badged>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="flex items-center justify-center">
                    <div className="w-48 h-48">
                      <Pie data={categoryData} options={chartOptions} />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Overall Score</span>
                        <span className="text-sm font-bold text-gray-900">{overallScore}%</span>
                      </div>
                      <ProgressBar percentage={overallScore} color={overallScore >= 80 ? 'green' : overallScore >= 60 ? 'yellow' : 'red'} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {categoryData.datasets[0].data.map((value, index) => (
                        <div key={categoryData.labels[index]} className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium text-gray-600">{categoryData.labels[index]}</span>
                            <span className="text-xs font-bold text-gray-900">{value}%</span>
                          </div>
                          <ProgressBar percentage={value} color={value >= 80 ? 'green' : value >= 60 ? 'yellow' : 'red'} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Findings */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Findings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-800">Strengths</span>
                    </div>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Strong financial capacity</li>
                      <li>• Excellent technical track record</li>
                      <li>• Meets all eligibility criteria</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                      <span className="font-semibold text-yellow-800">Considerations</span>
                    </div>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Moderate bid capacity</li>
                      <li>• Limited local presence</li>
                      <li>• Competitive market</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-blue-800">Recommendations</span>
                    </div>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Proceed with bidding</li>
                      <li>• Strengthen local partnerships</li>
                      <li>• Optimize resource allocation</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Assessment Summary */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Assessment Summary</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="text-gray-700 font-semibold border-b">
                        <th className="py-3 px-4 text-left">Assessment</th>
                        <th className="py-3 px-4 text-left">Status</th>
                        <th className="py-3 px-4 text-left">Score</th>
                        <th className="py-3 px-4 text-left">Weight</th>
                        <th className="py-3 px-4 text-left">Recommendation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assessmentResults.map((assessment) => (
                        <tr key={assessment.id} className="border-b last:border-0">
                          <td className="py-3 px-4 text-gray-900 font-medium">{assessment.name}</td>
                          <td className="py-3 px-4">
                            <Badged 
                              color={assessment.status === 'completed' ? 'green' : assessment.status === 'failed' ? 'red' : 'yellow'}
                              icon={assessment.status === 'completed' ? <CheckCircle className="w-3 h-3" /> : assessment.status === 'failed' ? <XCircle className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                            >
                              {assessment.status.toUpperCase()}
                            </Badged>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{assessment.score}%</span>
                              <div className="w-16">
                                <ProgressBar percentage={assessment.score} color={assessment.score >= 80 ? 'green' : assessment.score >= 60 ? 'yellow' : 'red'} />
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{assessment.weight}%</td>
                          <td className="py-3 px-4">
                            <Badged color={getDecisionColor(assessment.recommendation)}>
                              {assessment.recommendation.toUpperCase()}
                            </Badged>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'technical-assessment' && (
            <TechnicalAssessmentTab assessmentResults={assessmentResults} />
          )}

          {activeTab === 'financial-assessment' && (
            <FinancialAssessmentTab assessmentResults={assessmentResults} />
          )}

          {activeTab === 'competitors' && (
            <CompetitorAnalysisTab competitorAnalysis={competitorAnalysis} />
          )}

          {activeTab === 'bid-capacity' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Bid Capacity Analysis</h3>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">Bid Capacity Assessment</h4>
                  <Badged color="green" icon={<CheckCircle className="w-4 h-4" />}>
                    Meets Requirements
                  </Badged>
                </div>
                <p className="text-sm text-gray-600 mb-4">Formula: A × N × 2.5 - B + C</p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-gray-900">Maximum Turnover (A)</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">₹800.00 Cr</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-gray-900">Project Duration (N)</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">3 Years</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <TrendingDown className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-gray-900">Balance Work (B)</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">₹875.00 Cr</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Award className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-gray-900">Bonus Received (C)</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">₹18.00 Cr</div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h4>
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="text-md font-medium text-gray-900">Sample Project 1</h5>
                    <div className="space-x-2">
                      <button className="px-2 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200">
                        In Progress
                      </button>
                      <button className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Show Details
                      </button>
                      <button className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700">
                        Add Project
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 mb-2">
                    <div>
                      <div className="text-sm text-gray-600">Participation</div>
                      <div className="font-medium text-gray-900">75%</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Bid Opening</div>
                      <div className="font-medium text-gray-900">1-Jan-25</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">LOA Date</div>
                      <div className="font-medium text-gray-900">1-Mar-25</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Start Date</div>
                      <div className="font-medium text-gray-900">1-Apr-25</div>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="text-sm text-gray-600">Contract Value</div>
                    <div className="font-medium text-gray-900">₹500.00 Cr</div>
                  </div>
                  <div className="mb-2">
                    <div className="text-sm text-gray-600">Work Completed</div>
                    <ProgressBar percentage={100} color="green" />
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                      <h4 className="text-lg font-semibold text-gray-900">Total Bid Capacity</h4>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">₹5,143.00 Cr</div>
                  </div>
                  <div className="mt-4 space-x-2">
                    <button className="px-4 py-2 bg-purple-100 text-purple-800 rounded hover:bg-purple-200">
                      Recalculate
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                      Submit Evaluation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'swot-analysis' && (
            <SwotAnalysisTab />
          )}
        </div>
      </div>
    </div>
  );
}

export default ReportPage;