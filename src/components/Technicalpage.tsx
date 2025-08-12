"use client";

import React from "react";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { IconWithBackground } from "@/ui/components/IconWithBackground";
import { Breadcrumbs } from "@/ui/components/Breadcrumbs";
import { TextField } from "@/ui/components/TextField";
import { DropdownMenu } from "@/ui/components/DropdownMenu";
import * as SubframeCore from "@subframe/core";
import { Avatar } from "@/ui/components/Avatar";
import { Button } from "@/ui/components/Button";
import { Table } from "@/ui/components/Table";
import { Badge } from "@/ui/components/Badge";
import { IconButton } from "@/ui/components/IconButton";
import { Tabs } from "@/ui/components/Tabs";

function TechnicalDetailsEdit({onClose}) {
  const [activeTab, setActiveTab] = React.useState("overview");

  return (
    <DefaultPageLayout>
      <div className="flex h-full w-full flex-col items-start">
        <div className="flex w-full items-center justify-between border-b border-solid border-neutral-border px-8 py-4">
          <div className="flex items-center gap-2">
            <IconWithBackground size="small" icon="FeatherBriefcase" />
            <span className="text-body-bold font-body-bold text-default-font">
              Iron Triangle Limited
            </span>
            <Breadcrumbs>
              <Breadcrumbs.Divider />
              <Breadcrumbs>
                <Breadcrumbs.Item>Pre-bid Ananlysis</Breadcrumbs.Item>
                <Breadcrumbs.Divider />
              </Breadcrumbs>
              <Breadcrumbs.Item active={true}>
                Technical Capacity
              </Breadcrumbs.Item>
            </Breadcrumbs>
          </div>
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
            <SubframeCore.DropdownMenu.Root>
              <SubframeCore.DropdownMenu.Trigger asChild={true}>
                <Avatar
                  size="small"
                  image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                >
                  J
                </Avatar>
              </SubframeCore.DropdownMenu.Trigger>
              <SubframeCore.DropdownMenu.Portal>
                <SubframeCore.DropdownMenu.Content
                  side="bottom"
                  align="end"
                  sideOffset={4}
                  asChild={true}
                >
                  <DropdownMenu className="h-auto w-auto min-w-[176px] flex-none">
                    <DropdownMenu.DropdownItem icon="FeatherUser">
                      Technical Profile
                    </DropdownMenu.DropdownItem>
                    <DropdownMenu.DropdownItem icon="FeatherDollarSign">
                      Financial Profile
                    </DropdownMenu.DropdownItem>
                    <DropdownMenu.DropdownItem icon="FeatherEdit2">
                      Edit
                    </DropdownMenu.DropdownItem>
                    <DropdownMenu.DropdownItem icon="FeatherLogOut">
                      Logout
                    </DropdownMenu.DropdownItem>
                  </DropdownMenu>
                </SubframeCore.DropdownMenu.Content>
              </SubframeCore.DropdownMenu.Portal>
            </SubframeCore.DropdownMenu.Root>
          </div>
        </div>
        <div className="container max-w-none flex w-full grow shrink-0 basis-0 flex-col items-start gap-6 bg-default-background py-6 overflow-auto">
          <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 bg-gradient-to-r from-highlight-green to-highlight-blue relative">
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col items-start gap-2">
                <span className="text-heading-2 font-heading-2 text-default-font">
                  Rehabilitation and up-gradation to 4-laning of
                  Rajamunda-Barkote Section of NH-23
                </span>
                <span className="text-body font-body text-default-background">
                  Upgradation of a highway section to 4-laning under NHDP-IV B
                  on EPC mode
                </span>
              </div>
              <div className="flex h-6 items-center gap-1 rounded-md border border-solid border-brand-100 bg-brand-100 px-2 bg-gradient-to-r from-highlight-green to-highlight-blue relative">
                <SubframeCore.Icon
                  className="text-caption font-caption text-white"
                  name="FeatherMapPin"
                />
                <span className="whitespace-nowrap text-caption font-caption text-white">
                  Odisha
                </span>
              </div>
            </div>
            <div className="flex w-full flex-wrap items-start gap-4">
              <div className="flex items-center gap-4 rounded-md border border-solid border-neutral-border bg-white px-4 py-3 bg-gradient-to-r from-highlight-green relative">
                <IconWithBackground icon="FeatherDollarSign" />
                <div className="flex flex-col items-start">
                  <span className="text-caption font-caption text-subtext-color">
                    EPC Cost
                  </span>
                  <span className="text-body-bold font-body-bold text-default-font">
                    Rs. 503.88 Cr
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6">
            <div className="flex w-full items-center justify-between">
              <span className="text-heading-3 font-heading-3 text-default-font">
                Technical Details
              </span>
              <div className="flex items-center gap-2">
                <Button
                  icon="FeatherX"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-gradient-to-r from-highlight-green to-highlight-blue relative"
                  icon="FeatherSave"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  Save Changes
                </Button>
              </div>
            </div>
            <Tabs className="w-full">
              <Tabs.Item active={activeTab === "overview"} onClick={() => setActiveTab("overview")}>
                Overview
              </Tabs.Item>
              <Tabs.Item active={activeTab === "personal-team"} onClick={() => setActiveTab("personal-team")}>
                Personal & Team
              </Tabs.Item>
              <Tabs.Item active={activeTab === "plant-equipment"} onClick={() => setActiveTab("plant-equipment")}>
                Plant & Equipment
              </Tabs.Item>
              <Tabs.Item active={activeTab === "technical-approach"} onClick={() => setActiveTab("technical-approach")}>
                Technical Approach
              </Tabs.Item>
              <Tabs.Item active={activeTab === "legal-regularities"} onClick={() => setActiveTab("legal-regularities")}>
                Legal & Regularities
              </Tabs.Item>
            </Tabs>
            {activeTab === "overview" && (
              <div className="pt-6 w-full">
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
                      <span className="text-body font-body text-neutral-700">
                        Technical Capability
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <TextField label="" helpText="">
                        <TextField.Input
                          placeholder="Rs. 1505.23845 crore"
                          value=""
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {}}
                        />
                      </TextField>
                    </Table.Cell>
                    <Table.Cell>
                      <TextField label="" helpText="">
                        <TextField.Input
                          placeholder="Rs. 1007.76 crore"
                          value=""
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {}}
                        />
                      </TextField>
                    </Table.Cell>
                    <Table.Cell>
                      <TextField
                        className="from-highlight-green to-highlight-blue relative"
                        label=""
                        helpText=""
                      >
                        <TextField.Input
                          placeholder="Rs. 1405.23845 crore"
                          value=""
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {}}
                        />
                      </TextField>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge
                        className="bg-gradient-to-r from-highlight-green relative"
                        variant="success"
                        icon="FeatherCheck"
                      >
                        Compliant
                      </Badge>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <span className="text-body font-body text-neutral-700">
                        Lead Member Share
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <TextField label="" helpText="">
                        <TextField.Input
                          placeholder="Rs. 1505.23845 crore"
                          value=""
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {}}
                        />
                      </TextField>
                    </Table.Cell>
                    <Table.Cell>
                      <TextField label="" helpText="">
                        <TextField.Input
                          placeholder="Rs. 604.656 crore"
                          value=""
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {}}
                        />
                      </TextField>
                    </Table.Cell>
                    <Table.Cell>
                      <TextField label="" helpText="">
                        <TextField.Input
                          placeholder="Rs. 1405.23845 crore"
                          value=""
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {}}
                        />
                      </TextField>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge
                        className="bg-gradient-to-r from-highlight-green relative"
                        variant="success"
                        icon="FeatherCheck"
                      >
                        Compliant
                      </Badge>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <span className="text-body font-body text-neutral-700">
                        Other JV Members Share
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <TextField label="" helpText="">
                        <TextField.Input
                          placeholder="N/A"
                          value=""
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {}}
                        />
                      </TextField>
                    </Table.Cell>
                    <Table.Cell>
                      <TextField label="" helpText="">
                        <TextField.Input
                          placeholder="Rs. 201.552 crore"
                          value=""
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {}}
                        />
                      </TextField>
                    </Table.Cell>
                    <Table.Cell>
                      <TextField label="" helpText="">
                        <TextField.Input
                          placeholder="N/A"
                          value=""
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {}}
                        />
                      </TextField>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge variant="neutral">Not Applicable</Badge>
                    </Table.Cell>
                  </Table.Row>
                </Table>
                <Button
                  disabled={true}
                  variant="brand-secondary"
                  size="small"
                  icon="FeatherPlus"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  Add more
                </Button>
                <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6">
                  <div className="flex w-full items-center justify-between">
                    <span className="text-heading-3 font-heading-3 text-default-font">
                      Similar Projects
                    </span>
                    <IconButton
                      icon="FeatherEdit2"
                      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                    />
                  </div>
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
                    <Table.Row>
                      <Table.Cell>
                        <span className="text-body-bold font-body-bold text-neutral-700">
                          Four laning of Jetpur-Somnath Section
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <TextField label="" helpText="">
                          <TextField.Input
                            placeholder="Rs. 933.75 Cr"
                            value=""
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => {}}
                          />
                        </TextField>
                      </Table.Cell>
                      <Table.Cell>
                        <Badge variant="neutral">Category 3</Badge>
                      </Table.Cell>
                      <Table.Cell>
                        <Badge
                          className="bg-gradient-to-r from-highlight-green relative"
                          variant="success"
                          icon="FeatherCheck"
                        >
                          Completed
                        </Badge>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <span className="text-body-bold font-body-bold text-neutral-700">
                          Nagpur-Soner-Betul Section
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <TextField label="" helpText="">
                          <TextField.Input
                            placeholder="Rs. 406.44 Cr"
                            value=""
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => {}}
                          />
                        </TextField>
                      </Table.Cell>
                      <Table.Cell>
                        <Badge variant="neutral">Category 3</Badge>
                      </Table.Cell>
                      <Table.Cell>
                        <Badge
                          className="bg-gradient-to-r from-highlight-green relative"
                          variant="success"
                          icon="FeatherCheck"
                        >
                          Completed
                        </Badge>
                      </Table.Cell>
                    </Table.Row>
                  </Table>
                  <Button
                    disabled={true}
                    variant="brand-secondary"
                    size="small"
                    icon="FeatherPlus"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  >
                    Add more
                  </Button>
                  <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6">
                    <span className="text-heading-3 font-heading-3 text-default-font">
                      Geographic Experience
                    </span>
                    <Table
                      header={
                        <Table.HeaderRow>
                          <Table.HeaderCell>Primary Operated Region</Table.HeaderCell>
                          <Table.HeaderCell>Weather Conditions</Table.HeaderCell>
                          <Table.HeaderCell>
                            Similar Terrain Experience
                          </Table.HeaderCell>
                          <Table.HeaderCell>Local Presence</Table.HeaderCell>
                        </Table.HeaderRow>
                      }
                    >
                      <Table.Row>
                        <Table.Cell>
                          <span className="whitespace-nowrap text-body font-body text-neutral-500">
                            North India
                          </span>
                        </Table.Cell>
                        <Table.Cell>
                          <span className="whitespace-nowrap text-body font-body text-neutral-500">
                            Tropical, Arid
                          </span>
                        </Table.Cell>
                        <Table.Cell>
                          <Badge
                            className="bg-gradient-to-r from-highlight-green relative"
                            variant="success"
                          >
                            Yes
                          </Badge>
                        </Table.Cell>
                        <Table.Cell>
                          <Badge
                            className="bg-gradient-to-r from-highlight-green relative"
                            variant="success"
                          >
                            Yes
                          </Badge>
                        </Table.Cell>
                      </Table.Row>
                    </Table>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "personal-team" && (
              <div className="pt-6 w-full">
                {/* Placeholder for Personal & Team component */}
                <div className="text-body font-body text-default-font">
                  Personal & Team details will be loaded from a separate component.
                </div>
              </div>
            )}
            {activeTab === "plant-equipment" && (
              <div className="pt-6 w-full">
                {/* Placeholder for Plant & Equipment component */}
                <div className="text-body font-body text-default-font">
                  Plant & Equipment details will be loaded from a separate component.
                </div>
              </div>
            )}
            {activeTab === "technical-approach" && (
              <div className="pt-6 w-full">
                {/* Placeholder for Technical Approach component */}
                <div className="text-body font-body text-default-font">
                  Technical Approach details will be loaded from a separate component.
                </div>
              </div>
            )}
            {activeTab === "legal-regularities" && (
              <div className="pt-6 w-full">
                {/* Placeholder for Legal & Regularities component */}
                <div className="text-body font-body text-default-font">
                  Legal & Regularities details will be loaded from a separate component.
                </div>
              </div>
            )}
          </div>
          <div className="flex w-full items-start justify-between px-2 py-2">
            <Button
              icon="FeatherArrowLeft"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            >
              Back
            </Button>
            <Button
              className="bg-gradient-to-r from-highlight-green to-highlight-blue relative"
              onClick={onClose}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </DefaultPageLayout>
  );
}

export default TechnicalDetailsEdit;
