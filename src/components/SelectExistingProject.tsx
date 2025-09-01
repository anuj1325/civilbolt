import React, { useState } from "react";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { Component4 } from "@/ui/components/Component4";
import { IconWithBackground } from "@/ui/components/IconWithBackground";
import { Button } from "@/ui/components/Button";
import { Tabs } from "@/ui/components/Tabs";
import { TextField } from "@/ui/components/TextField";
import { ToggleGroup } from "@/ui/components/ToggleGroup";
import { DropdownMenu } from "@/ui/components/DropdownMenu";
import * as SubframeCore from "@subframe/core";
import { Table } from "@/ui/components/Table";
import { Avatar } from "@/ui/components/Avatar";

// Define project data
const projects = [
  {
    name: "NH-23 Rehabilitation",
    location: "NH-23 Corridor, Odisha",
    dueDate: "Jul 2025",
    estimatedValue: "$25M",
    teamSize: "8 members",
    teamInitial: "R",
  },
  {
    name: "Metro Station",
    location: "City Central Line",
    dueDate: "Aug 2025",
    estimatedValue: "$40M",
    teamSize: "12 members",
    teamInitial: "M",
  },
  {
    name: "Airport Terminal",
    location: "International T3",
    dueDate: "October 2025",
    estimatedValue: "$60M",
    teamSize: "15 members",
    teamInitial: "A",
  },
];

function SelectExistingProject({
  onNavigate,
  onSelectProject,
}: {
  onNavigate: (page: string) => void;
  onSelectProject: (projectName: string) => void;
}) {
  const [selectedProject, setSelectedProject] = useState<string>("Highway Extension");

  const handleSelectProject = (projectName: string) => {
    setSelectedProject(projectName);
    onSelectProject(projectName);
    onNavigate("pre-built-templets");
  };

  return (
    <DefaultPageLayout>
      <div className="flex h-full w-full flex-col items-start rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm">
        <Component4 text="Iron Triangle Limited" />
        <div className="flex w-full grow shrink-0 basis-0 flex-col items-start rounded-md border border-solid border-neutral-border bg-default-background shadow-sm">
          <div className="container max-w-none flex w-full grow shrink-0 basis-0 flex-col items-start gap-8 bg-default-background py-8">
            <div className="flex w-full items-center justify-between rounded-lg border border-solid border-default-font bg-brand-50 px-6 py-6 bg-inherit">
              <div className="flex items-center gap-4">
                <IconWithBackground size="large" icon="FeatherPlus" />
                <div className="flex flex-col items-start gap-1">
                  <span className="text-heading-2 font-heading-2 text-default-font">
                    Create New Project
                  </span>
                  <span className="text-body font-body text-custom-palette-subtext-color">
                    Start a new construction project from scratch
                  </span>
                </div>
              </div>
              <Button
                className="bg-brand-500"
                size="large"
                icon="FeatherPlus"
                onClick={() => onNavigate("pre-built-templets")}
              >
                Create Project
              </Button>
            </div>
            <div className="flex w-full flex-col items-start gap-2">
              <div className="flex w-full items-center justify-between">
                <Tabs>
                  <Tabs.Item active={true}>RFP Released</Tabs.Item>
                  <Tabs.Item>Ongoing</Tabs.Item>
                  <Tabs.Item>Completed</Tabs.Item>
                  <Tabs.Item>All Projects</Tabs.Item>
                </Tabs>
                <div className="flex items-center gap-4">
                  <TextField
                    variant="filled"
                    label=""
                    helpText=""
                    icon="FeatherSearch"
                  >
                    <TextField.Input
                      placeholder="Search projects..."
                      value=""
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
                    />
                  </TextField>
                  <ToggleGroup value="" onValueChange={(value: string) => {}}>
                    <ToggleGroup.Item icon="FeatherGrid" value="2ecb057d">
                      Grid
                    </ToggleGroup.Item>
                    <ToggleGroup.Item icon="FeatherList" value="1d9ee32c">
                      List
                    </ToggleGroup.Item>
                  </ToggleGroup>
                  <SubframeCore.DropdownMenu.Root>
                    <SubframeCore.DropdownMenu.Trigger asChild={true}>
                      <Button
                        icon="FeatherArrowUpDown"
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                      >
                        Sort by
                      </Button>
                    </SubframeCore.DropdownMenu.Trigger>
                    <SubframeCore.DropdownMenu.Portal>
                      <SubframeCore.DropdownMenu.Content
                        side="bottom"
                        align="end"
                        sideOffset={4}
                        asChild={true}
                      >
                        <DropdownMenu>
                          <DropdownMenu.DropdownItem>Due Date</DropdownMenu.DropdownItem>
                          <DropdownMenu.DropdownItem>Project Value</DropdownMenu.DropdownItem>
                          <DropdownMenu.DropdownItem>Team Size</DropdownMenu.DropdownItem>
                        </DropdownMenu>
                      </SubframeCore.DropdownMenu.Content>
                    </SubframeCore.DropdownMenu.Portal>
                  </SubframeCore.DropdownMenu.Root>
                </div>
              </div>
              <Table
                header={
                  <Table.HeaderRow>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Location</Table.HeaderCell>
                    <Table.HeaderCell>Due Date</Table.HeaderCell>
                    <Table.HeaderCell>Estimated Value</Table.HeaderCell>
                    <Table.HeaderCell>Team</Table.HeaderCell>
                    <Table.HeaderCell />
                  </Table.HeaderRow>
                }
              >
                {projects.map((project) => (
                  <Table.Row key={project.name}>
                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        <IconWithBackground size="small" icon="FeatherFileText" />
                        <span className="whitespace-nowrap text-body-bold font-body-bold text-neutral-700">
                          {project.name}
                        </span>
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <span className="whitespace-nowrap text-body font-body text-neutral-500">
                        {project.location}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <span className="whitespace-nowrap text-body font-body text-neutral-500">
                        {project.dueDate}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <span className="whitespace-nowrap text-body font-body text-neutral-500">
                        {project.estimatedValue}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        <Avatar size="x-small" image="">
                          {project.teamInitial}
                        </Avatar>
                        <span className="whitespace-nowrap text-body font-body text-neutral-500">
                          {project.teamSize}
                        </span>
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex grow shrink-0 basis-0 items-center justify-end gap-2">
                        <Button
                          className="bg-brand-500"
                          size="small"
                          onClick={() => handleSelectProject(project.name)}
                        >
                          Select
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table>
            </div>
          </div>
          <div className="flex w-full items-center justify-between border-t border-solid border-neutral-border bg-default-background px-8 py-4">
            <span className="text-body font-body text-subtext-color">
              Selected Project: {selectedProject}
            </span>
            <Button
              className="bg-brand-500"
              icon="FeatherArrowRight"
              onClick={() => onNavigate("pre-built-templets")}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </DefaultPageLayout>
  );
}

export default SelectExistingProject;