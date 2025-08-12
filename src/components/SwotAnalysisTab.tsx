import { 
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import React from "react";
import { ToggleGroup } from "@/ui/components/ToggleGroup";
import { IconWithBackground } from "@/ui/components/IconWithBackground";
import { Progress } from "@/ui/components/Progress";
import { Table } from "@/ui/components/Table";
import { Badge } from "@/ui/components/Badge";
import { Button } from "@/ui/components/Button";

function SwotAnalysisTab() {
  const strengths = [
    'Extensive experience in civil engineering projects',
    'Strong reputation for timely project completion',
    'Access to advanced construction technology and equipment',
    'Skilled workforce with specialized expertise',
    'Established relationships with suppliers and subcontractors',
  ];

  const weaknesses = [
    'High dependency on key personnel',
    'Limited diversification in project types',
    'Potential cash flow issues during large projects',
    'Vulnerability to material price fluctuations',
    'Geographical limitations in operations',
  ];

  const opportunities = [
    'Growing infrastructure development in emerging markets',
    'Government initiatives for sustainable construction',
    'Potential for public-private partnerships (PPPs)',
    'Expansion into green building projects',
    'Technological advancements in construction methods',
  ];

  const threats = [
    'Intense competition from larger contractors',
    'Regulatory changes and compliance requirements',
    'Economic downturns affecting construction spending',
    'Labor shortages and increasing wage costs',
    'Environmental concerns and project delays',
  ];

  return (
    <div className="container max-w-none flex w-full grow shrink-0 basis-0 flex-col items-start gap-6 bg-default-background py-6 overflow-auto">
  <div className="flex w-full items-center justify-between">
    <span className="text-heading-2 font-heading-2 text-default-font">
      Strategic SWOT Analysis
    </span>
    <ToggleGroup value="" onValueChange={(value: string) => {}}>
      <ToggleGroup.Item icon={null} value="392c86cb">
        Table
      </ToggleGroup.Item>
      <ToggleGroup.Item icon={null} value="0a734e35">
        Graph
      </ToggleGroup.Item>
    </ToggleGroup>
  </div>
  <div className="w-full items-start gap-4 grid grid-cols-2">
    <div className="flex flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-brand-50 px-6 py-6">
      <div className="flex items-center gap-2">
        <IconWithBackground variant="success" icon="FeatherTrendingUp" />
        <span className="text-heading-3 font-heading-3 text-default-font">
          Strengths
        </span>
      </div>
      <div className="flex w-full flex-col items-start gap-2">
        <span className="text-body font-body text-default-font">
          • Strong track record in highway projects
        </span>
        <span className="text-body font-body text-default-font">
          • Robust financial capacity
        </span>
        <span className="text-body font-body text-default-font">
          • Experienced technical team
        </span>
      </div>
      <Progress value={85} />
    </div>
    <div className="flex flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-warning-50 px-6 py-6">
      <div className="flex items-center gap-2">
        <IconWithBackground variant="warning" icon="FeatherAlertTriangle" />
        <span className="text-heading-3 font-heading-3 text-default-font">
          Weaknesses
        </span>
      </div>
      <div className="flex w-full flex-col items-start gap-2">
        <span className="text-body font-body text-default-font">
          • Limited geographical presence
        </span>
        <span className="text-body font-body text-default-font">
          • Equipment availability constraints
        </span>
        <span className="text-body font-body text-default-font">
          • Resource allocation challenges
        </span>
      </div>
      <Progress value={65} />
    </div>
    <div className="flex flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-brand-50 px-6 py-6">
      <div className="flex items-center gap-2">
        <IconWithBackground icon="FeatherLightbulb" />
        <span className="text-heading-3 font-heading-3 text-default-font">
          Opportunities
        </span>
      </div>
      <div className="flex w-full flex-col items-start gap-2">
        <span className="text-body font-body text-default-font">
          • Expanding infrastructure market
        </span>
        <span className="text-body font-body text-default-font">
          • Government policy support
        </span>
        <span className="text-body font-body text-default-font">
          • New technology adoption
        </span>
      </div>
      <Progress value={90} />
    </div>
    <div className="flex flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-error-50 px-6 py-6">
      <div className="flex items-center gap-2">
        <IconWithBackground variant="error" icon="FeatherCloud" />
        <span className="text-heading-3 font-heading-3 text-default-font">
          Threats
        </span>
      </div>
      <div className="flex w-full flex-col items-start gap-2">
        <span className="text-body font-body text-default-font">
          • Intense market competition
        </span>
        <span className="text-body font-body text-default-font">
          • Raw material price volatility
        </span>
        <span className="text-body font-body text-default-font">
          • Regulatory changes
        </span>
      </div>
      <Progress value={45} />
    </div>
  </div>
  <div className="flex w-full flex-col items-start gap-4">
    <span className="text-heading-3 font-heading-3 text-default-font">
      Competitive Analysis
    </span>
    <Table
      header={
        <Table.HeaderRow>
          <Table.HeaderCell>Company</Table.HeaderCell>
          <Table.HeaderCell>Market Position</Table.HeaderCell>
          <Table.HeaderCell>Technical Capability</Table.HeaderCell>
          <Table.HeaderCell>Financial Strength</Table.HeaderCell>
          <Table.HeaderCell>Project Experience</Table.HeaderCell>
          <Table.HeaderCell>Actions</Table.HeaderCell>
        </Table.HeaderRow>
      }
    >
      <Table.Row>
        <Table.Cell>
          <span className="text-body-bold font-body-bold text-neutral-700">
            Iron Triangle
          </span>
        </Table.Cell>
        <Table.Cell>
          <Badge variant="warning">Medium</Badge>
        </Table.Cell>
        <Table.Cell>
          <Badge variant="success">High</Badge>
        </Table.Cell>
        <Table.Cell>
          <Badge variant="warning">Medium</Badge>
        </Table.Cell>
        <Table.Cell>
          <Badge variant="success">Strong</Badge>
        </Table.Cell>
        <Table.Cell>
          <Button
            variant="neutral-tertiary"
            size="small"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
          >
            View Details
          </Button>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <span className="text-body-bold font-body-bold text-neutral-700">
            L&amp;T
          </span>
        </Table.Cell>
        <Table.Cell>
          <Badge variant="success">Strong</Badge>
        </Table.Cell>
        <Table.Cell>
          <Badge variant="success">High</Badge>
        </Table.Cell>
        <Table.Cell>
          <Badge variant="success">High</Badge>
        </Table.Cell>
        <Table.Cell>
          <Badge variant="success">Strong</Badge>
        </Table.Cell>
        <Table.Cell>
          <Button
            variant="neutral-tertiary"
            size="small"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
          >
            View Details
          </Button>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <span className="text-body-bold font-body-bold text-neutral-700">
            Dilip Buildcon
          </span>
        </Table.Cell>
        <Table.Cell>
          <Badge variant="success">Strong</Badge>
        </Table.Cell>
        <Table.Cell>
          <Badge variant="warning">Medium</Badge>
        </Table.Cell>
        <Table.Cell>
          <Badge variant="warning">Medium</Badge>
        </Table.Cell>
        <Table.Cell>
          <Badge variant="success">Strong</Badge>
        </Table.Cell>
        <Table.Cell>
          <Button
            variant="neutral-tertiary"
            size="small"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
          >
            View Details
          </Button>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <span className="text-body-bold font-body-bold text-neutral-700">
            Tata Projects
          </span>
        </Table.Cell>
        <Table.Cell>
          <Badge variant="success">Strong</Badge>
        </Table.Cell>
        <Table.Cell>
          <Badge variant="success">High</Badge>
        </Table.Cell>
        <Table.Cell>
          <Badge variant="success">High</Badge>
        </Table.Cell>
        <Table.Cell>
          <Badge variant="warning">Medium</Badge>
        </Table.Cell>
        <Table.Cell>
          <Button
            variant="neutral-tertiary"
            size="small"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
          >
            View Details
          </Button>
        </Table.Cell>
      </Table.Row>
    </Table>
  </div>
</div>
  );
}

export default SwotAnalysisTab;