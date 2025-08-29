"use client";
/*
 * Documentation:
 * Default Page Layout — https://app.subframe.com/008548d9f5d8/library?component=Default+Page+Layout_a57b1c43-310a-493f-b807-8cc88e2452cf
 * Sidebar rail with icons — https://app.subframe.com/008548d9f5d8/library?component=Sidebar+rail+with+icons_0d7efe0e-8762-46f5-b399-9f6d329e13b9
 * Dropdown Menu — https://app.subframe.com/008548d9f5d8/library?component=Dropdown+Menu_99951515-459b-4286-919e-a89e7549b43b
 * Avatar — https://app.subframe.com/008548d9f5d8/library?component=Avatar_bec25ae6-5010-4485-b46b-cf79e3943ab2
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import * as SubframeUtils from "../utils";
import { SidebarRailWithIcons } from "../components/SidebarRailWithIcons";
import { DropdownMenu } from "../components/DropdownMenu";
import * as SubframeCore from "@subframe/core";
import { Avatar } from "../components/Avatar";
import { Tooltip } from "../components/Tooltip";
import { Button } from "../components/Button";

interface DefaultPageLayoutRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const DefaultPageLayoutRoot = React.forwardRef<
  HTMLDivElement,
  DefaultPageLayoutRootProps
>(function DefaultPageLayoutRoot(
  { children, className, ...otherProps }: DefaultPageLayoutRootProps,
  ref
) {
  const navigate = useNavigate();
  const [isSidebarExpanded, setIsSidebarExpanded] = React.useState(true);
  const [sequenceSubmenuExpanded, setSequenceSubmenuExpanded] = React.useState(false);


  const handleNavigation = (path: string) => {
    navigate(path);
  };
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex h-screen w-full items-start",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <SidebarRailWithIcons
        expanded={isSidebarExpanded}
        header={
          <div className="flex w-full flex-col items-start gap-2">
            <div className="flex w-full items-center gap-2">
              <img
                className="h-6 w-6 flex-none object-cover"
                src="https://res.cloudinary.com/subframe/image/upload/v1711417507/shared/y2rsnhq3mex4auk54aye.png"
              />
              {isSidebarExpanded ? (
                <span className="text-heading-3 font-heading-3 text-default-font">
                  Bolt
                </span>
              ) : null}
            </div>
            <Button
              variant="neutral-secondary"
              size="small"
              iconRight="FeatherChevronsLeft"
              onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
            >
              {isSidebarExpanded ? <span>Collapse</span> : null}
            </Button>
          </div>
    }
        footer={
          <div className="flex w-full flex-col items-start gap-2">
            <div className="flex w-full flex-col items-start gap-1">
              <SubframeCore.Tooltip.Provider>
                <SubframeCore.Tooltip.Root>
                  <SubframeCore.Tooltip.Trigger asChild={true}>
                    <div className="flex w-full cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-neutral-50">
                      <SubframeCore.Icon
                        className="text-body-bold font-body-bold text-neutral-500"
                        name="FeatherBell"
                      />
                      {isSidebarExpanded ? (
                        <span className="text-body-bold font-body-bold text-neutral-700">
                          Notifications
                        </span>
                      ) : null}
                    </div>
                  </SubframeCore.Tooltip.Trigger>
                  {!isSidebarExpanded ? (
                    <SubframeCore.Tooltip.Portal>
                      <SubframeCore.Tooltip.Content
                        side="right"
                        align="center"
                        sideOffset={4}
                        asChild={true}
                      >
                        <Tooltip>Notifications</Tooltip>
                      </SubframeCore.Tooltip.Content>
                    </SubframeCore.Tooltip.Portal>
                  ) : null}
                </SubframeCore.Tooltip.Root>
              </SubframeCore.Tooltip.Provider>
              <SubframeCore.Tooltip.Provider>
                <SubframeCore.Tooltip.Root>
                  <SubframeCore.Tooltip.Trigger asChild={true}>
                    <div className="flex w-full cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-neutral-50">
                      <SubframeCore.Icon
                        className="text-body-bold font-body-bold text-neutral-500"
                        name="FeatherSettings"
                      />
                      {isSidebarExpanded ? (
                        <span className="text-body-bold font-body-bold text-neutral-700">
                          Settings
                        </span>
                      ) : null}
                    </div>
                  </SubframeCore.Tooltip.Trigger>
                  {!isSidebarExpanded ? (
                    <SubframeCore.Tooltip.Portal>
                      <SubframeCore.Tooltip.Content
                        side="right"
                        align="center"
                        sideOffset={4}
                        asChild={true}
                      >
                        <Tooltip>Settings</Tooltip>
                      </SubframeCore.Tooltip.Content>
                    </SubframeCore.Tooltip.Portal>
                  ) : null}
                </SubframeCore.Tooltip.Root>
              </SubframeCore.Tooltip.Provider>
            </div>
            <SubframeCore.DropdownMenu.Root>
              <SubframeCore.DropdownMenu.Trigger asChild={true}>
                <div className="flex w-full cursor-pointer items-center gap-2 rounded-md border border-solid border-neutral-border p-2">
                  <Avatar
                    size="small"
                    image="https://res.cloudinary.com/subframe/image/upload/v1711417507/shared/fychrij7dzl8wgq2zjq9.avif"
                  >
                    A
                  </Avatar>
                  {isSidebarExpanded ? (
                    <div className="flex flex-col items-start">
                      <span className="text-body-bold font-body-bold text-default-font">
                        Anuj
                      </span>
                      <span className="text-caption font-caption text-subtext-color">
                        anuj@subframe.com
                      </span>
                    </div>
                  ) : null}
                </div>
              </SubframeCore.DropdownMenu.Trigger>
              <SubframeCore.DropdownMenu.Portal>
                <SubframeCore.DropdownMenu.Content
                  side="right"
                  align="end"
                  sideOffset={4}
                  asChild={true}
                >
                  <DropdownMenu>
                    <DropdownMenu.DropdownItem icon="FeatherUser">
                      Profile
                    </DropdownMenu.DropdownItem>
                    <DropdownMenu.DropdownItem icon="FeatherSettings">
                      Settings
                    </DropdownMenu.DropdownItem>
                    <DropdownMenu.DropdownItem icon="FeatherLogOut">
                      Log out
                    </DropdownMenu.DropdownItem>
                  </DropdownMenu>
                </SubframeCore.DropdownMenu.Content>
              </SubframeCore.DropdownMenu.Portal>
            </SubframeCore.DropdownMenu.Root>
          </div>
        }
      >
        <SidebarRailWithIcons.NavItem 
          icon="FeatherHome" 
          selected={true}
          onClick={() => handleNavigation('/contractor-hub')}
          expanded={isSidebarExpanded}
        >
          Home
        </SidebarRailWithIcons.NavItem>
        <SidebarRailWithIcons.NavItem
          icon="FeatherFileText"
          onClick={() => handleNavigation('/editor')}
          expanded={isSidebarExpanded}
        >
          Draft
        </SidebarRailWithIcons.NavItem>
        <SidebarRailWithIcons.NavItem
          icon="FeatherCalendar"
          onClick={() => handleNavigation('/project-management')}
          expanded={isSidebarExpanded}
        >
          Obligation calendar
        </SidebarRailWithIcons.NavItem>
        <SidebarRailWithIcons.NavItem
          icon="FeatherWorkflow"
          onClick={() => handleNavigation('/sequence-of-event')}
          expanded={isSidebarExpanded}
          hasSubmenu={true}
          submenuExpanded={sequenceSubmenuExpanded}
          onToggleSubmenu={() => setSequenceSubmenuExpanded(!sequenceSubmenuExpanded)}
          submenuItems={
            <SidebarRailWithIcons.SubNavItem
              onClick={() => handleNavigation('/corresponding-letters')}
            >
              Corresponding letters
            </SidebarRailWithIcons.SubNavItem>
          }
        >
          Sequence of Events
        </SidebarRailWithIcons.NavItem>
      </SidebarRailWithIcons>
      {children ? (
        <div 
          className="flex flex-col items-start gap-2 self-stretch overflow-y-auto bg-default-background transition-all"
          style={{
            width: isSidebarExpanded ? 'calc(100vw - 256px)' : 'calc(100vw - 80px)'
          }}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
});

export const DefaultPageLayout = DefaultPageLayoutRoot;
