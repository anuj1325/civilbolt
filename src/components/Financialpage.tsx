"use client";

import React from "react";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { IconWithBackground } from "@/ui/components/IconWithBackground";
import * as SubframeCore from "@subframe/core";
import { Breadcrumbs } from "@/ui/components/Breadcrumbs";
import { TextField } from "@/ui/components/TextField";
import { Avatar } from "@/ui/components/Avatar";
import { Badge } from "@/ui/components/Badge";
import { Button } from "@/ui/components/Button";
import { Table } from "@/ui/components/Table";
import { Tabs } from "@/ui/components/Tabs";

function FinancialEditView({onClose}) {
  const [activeTab, setActiveTab] = React.useState("overview");

  return (
    <DefaultPageLayout>
      <div className="flex h-full w-full flex-col items-start gap-2">
        <div className="flex w-full items-center justify-between border-b border-solid border-neutral-border px-8 py-4">
          <div className="flex items-center gap-2">
            <IconWithBackground size="small" icon="FeatherBriefcase" />
            <span className="text-body-bold font-body-bold text-default-font">
              Iron Triangle Limited
            </span>
            <Breadcrumbs>
              <Breadcrumbs>
                <SubframeCore.Icon
                  className="text-body font-body text-brand-primary"
                  name="FeatherChevronRight"
                />
                <Breadcrumbs.Item>Pre-bid Analysis</Breadcrumbs.Item>
              </Breadcrumbs>
              <Breadcrumbs.Divider />
              <Breadcrumbs.Item active={true}>
                Financial Details
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
            <Avatar
              size="small"
              image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            >
              J
            </Avatar>
          </div>
        </div>
        <div className="container max-w-none flex w-full grow shrink-0 basis-0 flex-col items-start gap-6 bg-default-background py-6 overflow-auto">
          <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 bg-gradient-to-r from-highlight-green to-highlight-blue">
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
              <Badge icon="FeatherMapPin">Odisha</Badge>
            </div>
            <div className="flex w-full flex-wrap items-start gap-4">
              <div className="flex items-center gap-4 rounded-md border border-solid border-neutral-border bg-white px-4 py-3 bg-gradient-to-r from-highlight-green to-highlight-purple">
                <IconWithBackground icon="FeatherDollarSign" />
                <div className="flex flex-col items-start">
                  <span className="text-caption font-caption text-default-background">
                    EPC Cost
                  </span>
                  <span className="text-body-bold font-body-bold text-default-background">
                    Rs. 503.88 Cr
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full items-center justify-between">
            <span className="text-heading-3 font-heading-3 text-default-font">
              Financial Details
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="neutral-secondary"
                icon="FeatherX"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
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
            <Tabs.Item active={activeTab === "net-worth"} onClick={() => setActiveTab("net-worth")}>
              Net Worth
            </Tabs.Item>
            <Tabs.Item active={activeTab === "annual-turnover"} onClick={() => setActiveTab("annual-turnover")}>
              Annual Turnover
            </Tabs.Item>
            <Tabs.Item active={activeTab === "cash-accruals"} onClick={() => setActiveTab("cash-accruals")}>
              Cash Accruals
            </Tabs.Item>
            <Tabs.Item active={activeTab === "compliance"} onClick={() => setActiveTab("compliance")}>
              Compliance
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
                      Net Worth
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <TextField label="" helpText="">
                      <TextField.Input
                        placeholder="Rs. 247.60 Cr"
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
                        placeholder="Rs. 25.194 Cr"
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
                        placeholder="Rs. 247.60 Cr"
                        value=""
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {}}
                      />
                    </TextField>
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
                    <TextField label="" helpText="">
                      <TextField.Input
                        placeholder="Rs. 595.571 Cr"
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
                        placeholder="Rs. 100.776 Cr"
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
                        placeholder="Rs. 595.571 Cr"
                        value=""
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {}}
                      />
                    </TextField>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge variant="success" icon="FeatherCheck">
                      Compliant
                    </Badge>
                  </Table.Cell>
                </Table.Row>
              </Table>
              <div className="flex w-full flex-col items-start gap-4 pt-6">
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
                      <TextField label="" helpText="">
                        <TextField.Input
                          placeholder="8.00"
                          value=""
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {}}
                        />
                      </TextField>
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
                      <TextField label="" helpText="">
                        <TextField.Input
                          placeholder="239.60"
                          value=""
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {}}
                        />
                      </TextField>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge variant="success" icon="FeatherCheck">
                        Verified
                      </Badge>
                    </Table.Cell>
                  </Table.Row>
                </Table>
              </div>
              <div className="flex w-full flex-col items-start gap-4 pt-6">
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
                      <TextField label="" helpText="">
                        <TextField.Input
                          placeholder="625.45"
                          value=""
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {}}
                        />
                      </TextField>
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
                      <TextField label="" helpText="">
                        <TextField.Input
                          placeholder="598.32"
                          value=""
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {}}
                        />
                      </TextField>
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
                      <TextField label="" helpText="">
                        <TextField.Input
                          placeholder="562.94"
                          value=""
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {}}
                        />
                      </TextField>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge variant="success" icon="FeatherCheck">
                        Audited
                      </Badge>
                    </Table.Cell>
                  </Table.Row>
                </Table>
              </div>
            </div>
          )}
          {activeTab === "net-worth" && (
            <div className="pt-6 w-full">
              {/* Placeholder for Net Worth component */}
              <div className="text-body font-body text-default-font">
                Net Worth details will be loaded from a separate component.
              </div>
            </div>
          )}
          {activeTab === "annual-turnover" && (
            <div className="pt-6 w-full">
              {/* Placeholder for Annual Turnover component */}
              <div className="text-body font-body text-default-font">
                Annual Turnover details will be loaded from a separate component.
              </div>
            </div>
          )}
          {activeTab === "cash-accruals" && (
            <div className="pt-6 w-full">
              {/* Placeholder for Cash Accruals component */}
              <div className="text-body font-body text-default-font">
                Cash Accruals details will be loaded from a separate component.
              </div>
            </div>
          )}
          {activeTab === "compliance" && (
            <div className="pt-6 w-full">
              {/* Placeholder for Compliance component */}
              <div className="text-body font-body text-default-font">
                Compliance details will be loaded from a separate component.
              </div>
            </div>
          )}
          <div className="flex w-full items-start justify-between px-2 py-2">
            <Button
              onClick={onClose}
            >
              Back
            </Button>
            <Button
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </DefaultPageLayout>
  );
}

export default FinancialEditView;