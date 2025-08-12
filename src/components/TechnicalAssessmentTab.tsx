import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Table } from "@/ui/components/Table";
import { ProjectDetailsBlade2 } from "@/ui/components/ProjectDetailsBlade2";
import * as SubframeCore from "@subframe/core";
import { Badge } from "@/ui/components/Badge";
import { GeographicalExperience } from "@/ui/components/GeographicalExperience";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const TechnicalAssessmentTab = ({ assessmentResults }) => {
  const [viewMode, setViewMode] = useState('table');

  // Filter technical assessment data
  const technicalData = {
    technicalCapability: {
      claimed: assessmentResults.find(r => r.name === 'Technical Capability')?.score || 1505.23845,
      required: 1007.76,
      assessed: 1405.23845,
    },
    leadMemberShare: {
      claimed: assessmentResults.find(r => r.name === 'Lead Member Share')?.score || 1505.23845,
      required: 604.656,
      assessed: 1405.23845,
    },
    otherJVMembersShare: {
      claimed: null,
      required: 201.552,
      assessed: null,
    },
    similarWork: {
      claimed: assessmentResults.find(r => r.name === 'Similar Work (Category 1 & 3)')?.score || 225.97,
      required: 933.75,
      assessed: 125.97,
    },
  };

  const similarProjectsData = [
    { name: 'Four laning of Jetpur-Somnath Section', value: 933.75, category: 'Category 3' },
    { name: 'Nagpur-Soner-Betul Section', value: 406.44, category: 'Category 3' },
    { name: 'Maliya-Pipalaiya junction project', value: 132.00, category: 'Category 3' },
    { name: 'Widening of NH-59', value: 132.61, category: 'Category 3' },
  ];

  const technicalCapacityChartData = {
    labels: ['Claimed', 'Required', 'Assessed'],
    datasets: [
      {
        label: 'Technical Capability (Rs. Crore)',
        data: [
          technicalData.technicalCapability.claimed,
          technicalData.technicalCapability.required,
          technicalData.technicalCapability.assessed,
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const leadMemberShareChartData = {
    labels: ['Claimed', 'Required', 'Assessed'],
    datasets: [
      {
        label: 'Lead Member Share (Rs. Crore)',
        data: [
          technicalData.leadMemberShare.claimed,
          technicalData.leadMemberShare.required,
          technicalData.leadMemberShare.assessed,
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const similarProjectsChartData = {
    labels: similarProjectsData.map(project => project.name),
    datasets: [
      {
        data: similarProjectsData.map(project => project.value),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
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

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Technical Assessment</h3>
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
            <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6">
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
                    <span className="text-body font-body text-neutral-700">Technical Capability</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-body font-body text-neutral-500">Rs. {technicalData.technicalCapability.claimed} crore</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-body font-body text-neutral-500">Rs. {technicalData.technicalCapability.required} crore</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-body font-body text-neutral-500">Rs. {technicalData.technicalCapability.assessed} crore</span>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge variant="success" icon="FeatherCheck">Compliant</Badge>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <span className="text-body font-body text-neutral-700">Lead Member Share</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-body font-body text-neutral-500">Rs. {technicalData.leadMemberShare.claimed} crore</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-body font-body text-neutral-500">Rs. {technicalData.leadMemberShare.required} crore</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-body font-body text-neutral-500">Rs. {technicalData.leadMemberShare.assessed} crore</span>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge variant="success" icon="FeatherCheck">Compliant</Badge>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <span className="text-body font-body text-neutral-700">Other JV Members Share</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-body font-body text-neutral-500">{technicalData.otherJVMembersShare.claimed || 'N/A'}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-body font-body text-neutral-500">Rs. {technicalData.otherJVMembersShare.required} crore</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-body font-body text-neutral-500">{technicalData.otherJVMembersShare.assessed || 'N/A'}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge variant="neutral">Not Applicable</Badge>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <span className="text-body font-body text-neutral-700">Similar Work (Category 1 & 3)</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-body font-body text-neutral-500">Rs. {technicalData.similarWork.claimed} crore</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-body font-body text-neutral-500">Rs. {technicalData.similarWork.required} crore</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-body font-body text-neutral-500">Rs. {technicalData.similarWork.assessed} crore</span>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge variant="success">Criteria Met</Badge>
                  </Table.Cell>
                </Table.Row>
              </Table>
            </div>
            <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6">
              <span className="whitespace-pre-wrap text-heading-3 font-heading-3 text-default-font">Similar Projects</span>
              <Table
                header={
                  <Table.HeaderRow>
                    <Table.HeaderCell>Project Name</Table.HeaderCell>
                    <Table.HeaderCell>Value</Table.HeaderCell>
                    <Table.HeaderCell>Category</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                  </Table.HeaderRow>
                }
              >
                {similarProjectsData.map((project, index) => (
                  <Table.Row key={index}>
                    <SubframeCore.Popover.Root>
                      <SubframeCore.Popover.Trigger asChild={true}>
                        <Table.Cell>
                          <span className="text-body-bold font-body-bold text-neutral-700">{project.name}</span>
                        </Table.Cell>
                      </SubframeCore.Popover.Trigger>
                      <SubframeCore.Popover.Portal>
                        <SubframeCore.Popover.Content
                          side="bottom"
                          align="center"
                          sideOffset={index === 2 || index === 3 ? 4 : 0}
                          asChild={true}
                        >
                          <div className="flex flex-col items-start gap-1 rounded-md border border-solid border-neutral-border bg-default-background px-3 py-3 shadow-lg">
                            <ProjectDetailsBlade2
                              text="Project Details"
                              text2="Project Name"
                              text3="Rehabilitation and up-gradation to 4-laning of Rajamunda-Barkote Section of NH-23"
                              text4="EPC Cost"
                              text5="Rs. 503.88 crore"
                              text6="Location"
                              text7="Odisha"
                              text8="Client"
                              text9="National Highways Authority of India"
                              text10="Claimed Score"
                              text11="92.5"
                              text12="Updated Cost"
                              text13="Rs. 503.88 crore"
                              text14="Date of Completion"
                              text15="December 31, 2023"
                              text16="Assessed Cost"
                              text17="Rs. 525 crore"
                              text18="Initial Project Cost"
                              text19="Rs. 450 crore"
                              text20="Category"
                              text21="3"
                              text22="Year-wise Payment Details"
                              text23="2013-14"
                              text24="Rs. 50 crore"
                              text25="2014-15"
                              text26="Rs. 100 crore"
                              text27="2015-16"
                              text28="Rs. 150 crore"
                              text29="2016-17"
                              text30="Rs. 153.88 crore"
                              text31="Total payments"
                              text32="Rs. 453.88 crore"
                            />
                          </div>
                        </SubframeCore.Popover.Content>
                      </SubframeCore.Popover.Portal>
                    </SubframeCore.Popover.Root>
                    <Table.Cell>
                      <span className="text-body font-body text-neutral-500">Rs. {project.value} Cr</span>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge variant="neutral">{project.category}</Badge>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge variant="success" icon="FeatherCheck">Completed</Badge>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table>
              <GeographicalExperience text="Geographic Experience" text2="North India" text3="Tropical, Arid" />
            </div>
          </>
        ) : (
          <div className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6">
            <div className='flex w-full gap-6'>
            <div className="w-full">
              <h4 className="text-lg font-semibold mb-2">Technical Capability</h4>
              <Bar data={technicalCapacityChartData} options={chartOptions} />
            </div>
            <div className="w-full">
              <h4 className="text-lg font-semibold mb-2">Lead Member Share</h4>
              <Bar data={leadMemberShareChartData} options={chartOptions} />
            </div>
            </div>
            <div className="w-full">
              <h4 className="text-lg font-semibold mb-2">Similar Projects</h4>
              <div className="w-1/2 mx-auto">
                <Pie data={similarProjectsChartData} options={chartOptions} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechnicalAssessmentTab;