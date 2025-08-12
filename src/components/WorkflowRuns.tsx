import React from "react";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { IconWithBackground } from "@/ui/components/IconWithBackground";
import { TextField } from "@/ui/components/TextField";
import { Avatar } from "@/ui/components/Avatar";
import { LinkButton } from "@/ui/components/LinkButton";
import { Button } from "@/ui/components/Button";
import { IconButton } from "@/ui/components/IconButton";
import * as SubframeCore from "@subframe/core";
import { Badge } from "@/ui/components/Badge";
import { Progress } from "@/ui/components/Progress";

function WorkflowRuns({ onClose }: { onClose: () => void }) {
  return (
    <DefaultPageLayout>
      <div className="flex h-full w-full flex-col items-start gap-2">
        <div className="flex w-full items-center justify-between border-b border-solid border-neutral-border px-8 py-4">
          <div className="flex items-center gap-2">
            <IconWithBackground size="small" icon="FeatherBriefcase" />
            <span className="text-body-bold font-body-bold text-default-font">
              Iron Triangle Limited
            </span>
          </div>
          <div className="flex items-center gap-4">
            <TextField variant="filled" label="" helpText="" icon="FeatherSearch">
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
        <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-6 bg-default-background px-6 py-6 mobile:container mobile:max-w-none">
          <div className="flex w-full items-center gap-2">
            <LinkButton
              icon="FeatherArrowLeft"
              onClick={onClose}
            >
              Back to Canvas
            </LinkButton>
          </div>
          <div className="flex w-full flex-wrap items-center gap-4">
            <div className="flex grow shrink-0 basis-0 items-center gap-1">
              <TextField variant="filled" label="" helpText="" icon="FeatherSearch">
                <TextField.Input
                  placeholder="Search prompts..."
                  value=""
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
                />
              </TextField>
              <Button
                iconRight="FeatherChevronDown"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              >
                Last 7 days
              </Button>
              <IconButton
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              />
            </div>
          </div>
          <div className="flex w-full flex-wrap items-start justify-end gap-4 mobile:flex-col mobile:flex-wrap mobile:gap-4">
            <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
              <span className="text-heading-2 font-heading-2 text-default-font">
                Workflow Runs
              </span>
              <span className="text-body font-body text-subtext-color">
                View and manage your EPC contract analysis runs
              </span>
            </div>
          </div>
          <div className="w-full items-start gap-4 grid grid-cols-4">
            <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2 rounded-md border border-solid border-neutral-border px-6 py-6 shadow-sm bg-gradient-to-br from-teal-600 via-teal-400 to-emerald-200">
              <IconWithBackground
                size="medium"
                icon="FeatherCheckCircle"
                square={true}
              />
              <span className="text-heading-2 font-heading-2 text-white">2</span>
              <span className="text-body-bold font-body-bold text-[#f0fdfaff]">
                Completed
              </span>
            </div>
            <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2 rounded-md border border-solid border-neutral-border px-6 py-6 shadow-sm bg-gradient-to-br from-cyan-600 via-cyan-400 to-blue-200">
              <IconWithBackground size="medium" icon="FeatherClock" square={true} />
              <span className="text-heading-2 font-heading-2 text-white">1</span>
              <span className="text-body-bold font-body-bold text-[#ecfeffff]">
                Running
              </span>
            </div>
            <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2 rounded-md border border-solid border-neutral-border px-6 py-6 shadow-sm bg-gradient-to-br from-indigo-600 via-indigo-400 to-purple-200">
              <IconWithBackground
                size="medium"
                icon="FeatherAlertCircle"
                square={true}
              />
              <span className="text-heading-2 font-heading-2 text-white">1</span>
              <span className="text-body-bold font-body-bold text-[#eef2ffff]">
                Failed
              </span>
            </div>
            <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2 rounded-md border border-solid border-neutral-border px-6 py-6 shadow-sm bg-gradient-to-br from-blue-600 via-blue-400 to-cyan-200">
              <IconWithBackground
                size="medium"
                icon="FeatherFileText"
                square={true}
              />
              <span className="text-heading-2 font-heading-2 text-white">2</span>
              <span className="text-body-bold font-body-bold text-[#eff6ffff]">
                Reports
              </span>
            </div>
          </div>
          <div className="flex w-full flex-col items-start gap-4">
            <div className="flex w-full flex-col items-start gap-1">
              <span className="text-heading-3 font-heading-3 text-default-font">
                Analysis History
              </span>
              <span className="text-body font-body text-subtext-color">
                Track your contract analysis workflows and download reports
              </span>
            </div>
            <div className="flex w-full flex-col items-start gap-2">
              <div className="flex w-full items-center justify-between rounded-md border border-solid border-neutral-border px-4 py-4 shadow-sm bg-gradient-to-r from-teal-50 to-white">
                <div className="flex items-center gap-4">
                  <SubframeCore.Icon
                    className="text-body font-body text-[#0d9488ff]"
                    name="FeatherCheckCircle"
                  />
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-body-bold font-body-bold text-default-font">
                      Yagyi-Kalewa EPC Agreement
                    </span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <SubframeCore.Icon
                          className="text-body font-body text-subtext-color"
                          name="FeatherCalendar"
                        />
                        <span className="text-body font-body text-subtext-color">
                          Jan 15, 2024, 04:00 PM
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <SubframeCore.Icon
                          className="text-body font-body text-subtext-color"
                          name="FeatherClock"
                        />
                        <span className="text-body font-body text-subtext-color">
                          45 minutes
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="success">Completed</Badge>
                  <IconButton
                    icon="FeatherEye"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  />
                  <Button
                    icon="FeatherDownload"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  >
                    Download PDF
                  </Button>
                </div>
              </div>
              <div className="flex w-full items-center justify-between rounded-md border border-solid border-neutral-border px-4 py-4 shadow-sm bg-gradient-to-r from-teal-50 to-white">
                <div className="flex items-center gap-4">
                  <SubframeCore.Icon
                    className="text-body font-body text-[#0d9488ff]"
                    name="FeatherCheckCircle"
                  />
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-body-bold font-body-bold text-default-font">
                      Mumbai-Pune Highway Contract
                    </span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <SubframeCore.Icon
                          className="text-body font-body text-subtext-color"
                          name="FeatherCalendar"
                        />
                        <span className="text-body font-body text-subtext-color">
                          Jan 14, 2024, 07:50 PM
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <SubframeCore.Icon
                          className="text-body font-body text-subtext-color"
                          name="FeatherClock"
                        />
                        <span className="text-body font-body text-subtext-color">
                          38 minutes
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="success">Completed</Badge>
                  <IconButton
                    icon="FeatherEye"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  />
                  <Button
                    icon="FeatherDownload"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  >
                    Download PDF
                  </Button>
                </div>
              </div>
              <div className="flex w-full items-center justify-between rounded-md border border-solid border-neutral-border px-4 py-4 shadow-sm bg-gradient-to-r from-cyan-50 to-white">
                <div className="flex items-center gap-4">
                  <SubframeCore.Icon
                    className="text-body font-body text-[#0891b2ff]"
                    name="FeatherClock"
                  />
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-body-bold font-body-bold text-default-font">
                      Delhi Metro Phase 4
                    </span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <SubframeCore.Icon
                          className="text-body font-body text-subtext-color"
                          name="FeatherCalendar"
                        />
                        <span className="text-body font-body text-subtext-color">
                          Jan 14, 2024, 02:45 PM
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <SubframeCore.Icon
                          className="text-body font-body text-subtext-color"
                          name="FeatherClock"
                        />
                        <span className="text-body font-body text-subtext-color">
                          25 minutes
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-body font-body text-subtext-color">
                      Progress
                    </span>
                    <span className="text-body-bold font-body-bold text-default-font">
                      65%
                    </span>
                  </div>
                  <Progress value={65} />
                  <Badge>Running</Badge>
                  <IconButton
                    icon="FeatherEye"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  />
                </div>
              </div>
              <div className="flex w-full items-center justify-between rounded-md border border-solid border-neutral-border px-4 py-4 shadow-sm bg-gradient-to-r from-indigo-50 to-white">
                <div className="flex items-center gap-4">
                  <SubframeCore.Icon
                    className="text-body font-body text-[#4f46e5ff]"
                    name="FeatherAlertCircle"
                  />
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-body-bold font-body-bold text-default-font">
                      Bangalore IT Park Development
                    </span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <SubframeCore.Icon
                          className="text-body font-body text-subtext-color"
                          name="FeatherCalendar"
                        />
                        <span className="text-body font-body text-subtext-color">
                          Jan 13, 2024, 10:15 PM
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <SubframeCore.Icon
                          className="text-body font-body text-subtext-color"
                          name="FeatherClock"
                        />
                        <span className="text-body font-body text-subtext-color">
                          12 minutes
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="error">Failed</Badge>
                  <IconButton
                    icon="FeatherEye"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </DefaultPageLayout>
  );
};

export default WorkflowRuns;
