"use client";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { IconWithBackground } from "@/ui/components/IconWithBackground";
import * as SubframeCore from "@subframe/core";
import { Breadcrumbs } from "@/ui/components/Breadcrumbs";
import { TextField } from "@/ui/components/TextField";
import { DropdownMenu } from "@/ui/components/DropdownMenu";
import { IconButton } from "@/ui/components/IconButton";
import { TextFieldUnstyled } from "@/ui/components/TextFieldUnstyled";
import { Button } from "@/ui/components/Button";

function ContractorActionHub({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { user, logout } = useAuth0();

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: "http://localhost:5173" } });
  };

  return (
    <DefaultPageLayout>
      <div className="flex h-full w-full flex-col items-start">
        <div className="flex w-full items-center justify-between border-b border-solid border-neutral-border px-8 py-4">
          <div className="flex items-center gap-2">
            <IconWithBackground size="small" icon="FeatherBriefcase" />
            <SubframeCore.Popover.Root>
              <SubframeCore.Popover.Trigger asChild={true}>
                <span className="text-body-bold font-body-bold text-default-font">
                  Iron Triangle Limited
                </span>
              </SubframeCore.Popover.Trigger>
              <SubframeCore.Popover.Portal>
                <SubframeCore.Popover.Content
                  side="bottom"
                  align="start"
                  sideOffset={0}
                  asChild={true}
                >
                  <div className="flex flex-col items-start gap-1 rounded-md border border-solid border-neutral-border bg-default-background px-3 py-3 shadow-sm">
                    <div className="flex w-full flex-col items-start gap-2 px-2 py-2">
                      <div className="flex items-center gap-2">
                        <span className="text-body-bold font-body-bold text-default-font">
                          Projects
                        </span>
                      </div>
                      <div className="flex flex-col items-start gap-2">
                        <div className="flex items-center gap-3 rounded-md bg-neutral-50 px-2 py-2 cursor-pointer">
                          <IconWithBackground
                            size="small"
                            icon="FeatherBriefcase"
                          />
                          <div className="flex flex-col items-start">
                            <span className="text-body font-body text-default-font">
                              NH-23 rehabilitation
                            </span>
                            <span className="text-caption font-caption text-subtext-color">
                              GR Infra Projects
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 rounded-md bg-neutral-50 px-2 py-2 cursor-pointer">
                          <IconWithBackground
                            size="small"
                            icon="FeatherClipboard"
                          />
                          <div className="flex flex-col items-start">
                            <span className="text-body font-body text-default-font">
                              Tender Evaluation
                            </span>
                            <span className="text-caption font-caption text-subtext-color">
                              Municipal Contract
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 rounded-md bg-neutral-50 px-2 py-2 cursor-pointer">
                          <IconWithBackground
                            size="small"
                            icon="FeatherTruck"
                          />
                          <div className="flex flex-col items-start">
                            <span className="text-body font-body text-default-font">
                              Construction Bid
                            </span>
                            <span className="text-caption font-caption text-subtext-color">
                              Highway Development
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 rounded-md bg-neutral-50 px-2 py-2 cursor-pointer">
                          <IconWithBackground size="small" icon="FeatherEye" />
                          <div className="flex flex-col items-start">
                            <span className="text-body font-body text-default-font">
                              View More Projects
                            </span>
                            <span className="text-caption font-caption text-subtext-color">
                              Explore additional project details
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SubframeCore.Popover.Content>
              </SubframeCore.Popover.Portal>
            </SubframeCore.Popover.Root>
            <Breadcrumbs>
              <Breadcrumbs.Divider />
              <Breadcrumbs.Item active={true}>High Way NH-23</Breadcrumbs.Item>
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
            <div className="flex h-6 w-6 flex-none flex-col items-center justify-center gap-2 overflow-hidden rounded-full bg-brand-100 relative">
              <span className="line-clamp-1 w-full font-['Inter'] text-[10px] font-[500] leading-[10px] text-brand-800 text-center absolute">
                {user?.name?.[0] || "J"}
              </span>
              <SubframeCore.DropdownMenu.Root>
                <SubframeCore.DropdownMenu.Trigger asChild={true}>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <img
                      className="h-6 w-6 flex-none object-cover absolute"
                      src={user?.picture || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                      alt="User profile"
                    />
                  </div>
                </SubframeCore.DropdownMenu.Trigger>
                <SubframeCore.DropdownMenu.Portal>
                  <SubframeCore.DropdownMenu.Content
                    side="bottom"
                    align="end"
                    sideOffset={0}
                    asChild={true}
                  >
                    <DropdownMenu className="h-auto w-44 flex-none">
                      <DropdownMenu.DropdownItem icon="FeatherUser">
                        Technical Profile
                      </DropdownMenu.DropdownItem>
                      <DropdownMenu.DropdownItem icon="FeatherDollarSign">
                        Financial Profile
                      </DropdownMenu.DropdownItem>
                      <DropdownMenu.DropdownItem icon="FeatherEdit2">
                        Edit
                      </DropdownMenu.DropdownItem>
                      <DropdownMenu.DropdownItem icon="FeatherLogOut" onClick={handleLogout}>
                        Logout
                      </DropdownMenu.DropdownItem>
                    </DropdownMenu>
                  </SubframeCore.DropdownMenu.Content>
                </SubframeCore.DropdownMenu.Portal>
              </SubframeCore.DropdownMenu.Root>
            </div>
          </div>
        </div>
        <div className="container max-w-none flex w-full grow shrink-0 basis-0 flex-col items-center gap-6 bg-default-background pt-12">
          <div className="flex w-full max-w-[768px] flex-col items-center justify-center gap-8 px-12">
            <div className="flex w-full flex-col items-center justify-center gap-4">
              <img
                className="h-8 flex-none object-cover"
                src="https://images.unsplash.com/photo-1687579520892-5160c0df4b3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxjb250cmFjdCUyMGxvZ28fZW58MHx8fHwxNzA4MTM5MjAwfDA&ixlib=rb-4.0.3&q=80&w=1080"
                alt="Logo"
              />
              <span className="text-heading-1 font-heading-1 text-default-font">
                How can I help you today?
              </span>
            </div>
            <div className="flex w-full flex-col items-center gap-6">
              <div className="flex w-full items-center gap-2 rounded-lg border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
                <IconButton
                  size="large"
                  icon="FeatherSearch"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                />
                <TextFieldUnstyled className="h-auto grow shrink-0 basis-0">
                  <TextFieldUnstyled.Input
                    placeholder="Ask anything about civil contracts..."
                    value=""
                    onChange={(
                      event: React.ChangeEvent<HTMLInputElement>
                    ) => {}}
                  />
                </TextFieldUnstyled>
                <IconButton
                  size="large"
                  icon="FeatherUpload"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                />
                <Button
                  className="bg-brand-500"
                  size="small"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  Ask
                </Button>
              </div>
              <div className="flex w-full flex-col items-start gap-4">
                <span className="text-body-bold font-body-bold text-default-font">
                  Popular questions
                </span>
                <div className="flex w-full flex-wrap items-start gap-4">
                  <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2 rounded-md border border-solid border-neutral-border bg-neutral-50 px-4 py-3 cursor-pointer">
                    <span className="text-body font-body text-default-font">
                      How do I calculate my bid capacity for a new project?
                    </span>
                  </div>
                  <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2 rounded-md border border-solid border-neutral-border bg-neutral-50 px-4 py-3 cursor-pointer">
                    <span className="text-body font-body text-default-font">
                      What factors should I consider in pre-bid assessment?
                    </span>
                  </div>
                  <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2 rounded-md border border-solid border-neutral-border bg-neutral-50 px-4 py-3 cursor-pointer">
                    <span className="text-body font-body text-default-font">
                      How to write a contract dispute resolution letter?
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col items-start gap-4">
              <span className="text-body-bold font-body-bold text-default-font">
                Quick actions
              </span>
              <div className="flex w-full flex-wrap items-start gap-4">
                <div className="flex grow shrink-0 basis-0 items-center gap-4 self-stretch rounded-md border border-solid border-neutral-border bg-neutral-50 px-4 py-4 cursor-pointer" onClick={() => onNavigate('select-existing-project')}>
                  <IconWithBackground
                    size="large"
                    icon="FeatherClipboardCheck"
                    className="rounded-full flex h-12 w-12 flex-none items-center justify-center"
                  />
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-body-bold font-body-bold text-default-font">
                      Pre-bid Assessment
                    </span>
                    <span className="text-caption font-caption text-subtext-color">
                      Evaluate project viability and risks
                    </span>
                  </div>
                </div>
                <div className="flex grow shrink-0 basis-0 items-center gap-4 self-stretch rounded-md border border-solid border-neutral-border bg-neutral-50 px-4 py-4 cursor-pointer">
                  <IconWithBackground size="large" icon="FeatherFileText" className="rounded-full flex h-12 w-12 flex-none items-center justify-center"/>
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-body-bold font-body-bold text-default-font">
                      Bid Evaluation
                    </span>
                    <span className="text-caption font-caption text-subtext-color">
                      Analyze and compare bids
                    </span>
                  </div>
                </div>
                <div className="flex grow shrink-0 basis-0 items-center gap-4 self-stretch rounded-md border border-solid border-neutral-border bg-neutral-50 px-4 py-4 cursor-pointer">
                  <div className="flex h-12 w-12 flex-none items-center justify-center gap-2 rounded-full bg-brand-500">
                    <SubframeCore.Icon
                      className="text-heading-2 font-heading-2 text-white"
                      name="FeatherCalculator"
                    />
                  </div>
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-body-bold font-body-bold text-default-font">
                      Calculate Bid Capacity
                    </span>
                    <span className="text-caption font-caption text-subtext-color">
                      Determine bidding limits
                    </span>
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

export default ContractorActionHub;