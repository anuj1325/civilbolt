import React from "react";
import { useNavigate } from "react-router-dom";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { IconWithBackground } from "@/ui/components/IconWithBackground";
import { Breadcrumbs } from "@/ui/components/Breadcrumbs";
import { TextField } from "@/ui/components/TextField";
import { Avatar } from "@/ui/components/Avatar";
import { Tabs } from "@/ui/components/Tabs";
import { Button } from "@/ui/components/Button";
import { ToggleGroup } from "@/ui/components/ToggleGroup";
import { IconButton } from "@/ui/components/IconButton";

function Pre_BuiltTemplets({
  onNavigate,
  selectedProject,
}: {
  onNavigate: (page: string) => void;
  selectedProject: string;
}) {
  const navigate = useNavigate();

  return (
    <DefaultPageLayout>
      <div className="flex h-full w-full flex-col items-start gap-2">
        <div className="flex w-full items-center justify-between border-b border-solid border-neutral-border px-8 py-4">
          <div className="flex items-center gap-2">
            <IconWithBackground size="small" icon="FeatherBriefcase" />
            <span className="text-heading-3 font-heading-3 text-default-font">
              Iron Triangle Limited
            </span>
            <Breadcrumbs>
              <Breadcrumbs.Divider />
              <Breadcrumbs.Item active={true}>{selectedProject}</Breadcrumbs.Item>
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
        <div className="flex w-full grow shrink-0 basis-0 flex-col items-start bg-default-background px-6 py-6">
          <div className="flex w-full flex-col items-start gap-2">
            <span className="text-heading-2 font-heading-2 text-default-font">
              Pre-Built Templates
            </span>
            <span className="text-body font-body text-subtext-color">
              Explore and use pre-built templates
            </span>
            <Button
              className="mt-4"
              variant="outline"
              icon="FeatherArrowLeft"
              onClick={() => onNavigate("contractor-hub")}
            >
              Back
            </Button>
          </div>
          <div className="flex w-full flex-col items-start gap-6 pt-6">
            <div className="flex w-full items-center justify-between">
              <Tabs>
                <Tabs.Item active={true}>Community Templates</Tabs.Item>
                <Tabs.Item>My Templates</Tabs.Item>
              </Tabs>
              <div className="flex items-center gap-2">
                <TextField label="" helpText="">
                  <TextField.Input
                    placeholder="Search templates..."
                    value=""
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
                  />
                </TextField>
                <Button
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  Tag
                </Button>
                <Button
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  Type
                </Button>
                <ToggleGroup value="" onValueChange={(value: string) => {}}>
                  <ToggleGroup.Item icon="FeatherGrid" value="52b942b7" />
                  <ToggleGroup.Item icon="FeatherTable" value="3bff8dce" />
                </ToggleGroup>
              </div>
            </div>
            <div className="w-full items-start gap-4 grid grid-cols-4">
              <div
                className="flex h-48 flex-col items-start overflow-hidden rounded-md border border-solid border-neutral-border bg-white cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onNavigate("workflow")}
              >
                <div className="flex h-1 w-full flex-none items-start bg-brand-primary" />
                <div className="flex w-full grow shrink-0 basis-0 flex-col items-start justify-between px-4 py-4">
                  <div className="flex w-full flex-col items-start gap-2">
                    <span className="text-heading-3 font-heading-3 text-default-font">
                      Bid Assessments
                    </span>
                    <span className="text-body font-body text-subtext-color">
                      An agent based approach using AgentflowV2 to perform
                      self-correcting question answering over documents
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconButton
                      variant="brand-primary"
                      size="small"
                      icon="FeatherPlay"
                      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        event.stopPropagation(); // Prevent card click from triggering
                        // Add specific functionality for Play button if needed
                      }}
                    />
                    <IconButton
                      variant="brand-primary"
                      size="small"
                      icon="FeatherFile"
                      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        event.stopPropagation(); // Prevent card click from triggering
                        // Add specific functionality for File button if needed
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex h-48 flex-col items-start overflow-hidden rounded-md border border-solid border-neutral-border bg-white">
                <div className="flex h-1 w-full flex-none items-start bg-brand-primary" />
                <div className="flex w-full grow shrink-0 basis-0 flex-col items-start justify-between px-4 py-4">
                  <div className="flex w-full flex-col items-start gap-2">
                    <span className="text-heading-3 font-heading-3 text-default-font">
                      Competitor Analysis
                    </span>
                    <span className="text-body font-body text-subtext-color">
                      A customer support agent that can handoff tasks to
                      different agents based on scenarios
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconButton
                      variant="brand-primary"
                      size="small"
                      icon="FeatherPlay"
                      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                    />
                    <IconButton
                      variant="brand-primary"
                      size="small"
                      icon="FeatherFile"
                      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                    />
                  </div>
                </div>
              </div>
              <div className="flex h-48 flex-col items-start overflow-hidden rounded-md border border-solid border-neutral-border bg-white">
                <div className="flex h-1 w-full flex-none items-start bg-brand-primary" />
                <div className="flex w-full grow shrink-0 basis-0 flex-col items-start justify-between px-4 py-4">
                  <div className="flex w-full flex-col items-start gap-2">
                    <span className="text-heading-3 font-heading-3 text-default-font">
                      Go or NoGo
                    </span>
                    <span className="text-body font-body text-subtext-color">
                      Deep research system that conducts multi-turn agent
                      conversations to perform web search and generate reports
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconButton
                      variant="brand-primary"
                      size="small"
                      icon="FeatherPlay"
                      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                    />
                    <IconButton
                      variant="brand-primary"
                      size="small"
                      icon="FeatherFile"
                      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultPageLayout>
  );
}

export default Pre_BuiltTemplets;