"use client";
/*
 * Documentation:
 * Sidebar rail with icons — https://app.subframe.com/008548d9f5d8/library?component=Sidebar+rail+with+icons_0d7efe0e-8762-46f5-b399-9f6d329e13b9
 * Dropdown Menu — https://app.subframe.com/008548d9f5d8/library?component=Dropdown+Menu_99951515-459b-4286-919e-a89e7549b43b
 * Avatar — https://app.subframe.com/008548d9f5d8/library?component=Avatar_bec25ae6-5010-4485-b46b-cf79e3943ab2
 */

import React from "react";
import * as SubframeUtils from "../utils";
import { DropdownMenu } from "./DropdownMenu";
import * as SubframeCore from "@subframe/core";
import { Tooltip } from "./Tooltip";

interface NavItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: SubframeCore.IconName;
  children?: React.ReactNode;
  selected?: boolean;
  className?: string;
  expanded?: boolean;
  hasSubmenu?: boolean;
  submenuExpanded?: boolean;
  onToggleSubmenu?: () => void;
  submenuItems?: React.ReactNode;
}

const NavItem = React.forwardRef<HTMLDivElement, NavItemProps>(function NavItem(
  {
    icon = "FeatherCircleDashed",
    children,
    selected = false,
    className,
    expanded = false,
    hasSubmenu = false,
    submenuExpanded = false,
    onToggleSubmenu,
    submenuItems,
    ...otherProps
  }: NavItemProps,
  ref
) {
  const handleMainClick = (e: React.MouseEvent) => {
    if (otherProps.onClick) {
      otherProps.onClick(e);
    }
  };

  const handleSubmenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleSubmenu) {
      onToggleSubmenu();
    }
  };

  return (
    <div className="w-full">
      <div
        className={SubframeUtils.twClassNames(
          "group/ba3a61e5 flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-2 hover:bg-neutral-50 active:bg-neutral-100",
          { "bg-brand-50 hover:bg-brand-50 active:bg-brand-100": selected },
          className
        )}
        ref={ref}
        onClick={handleMainClick}
      >
        <SubframeCore.Icon
          className={SubframeUtils.twClassNames(
            "text-heading-3 font-heading-3 text-neutral-600",
            { "text-brand-700": selected }
          )}
          name={icon}
        />
        {expanded ? (
          <span
            className={SubframeUtils.twClassNames(
              "text-body-bold font-body-bold text-neutral-700 flex-1",
              { "text-brand-700": selected }
            )}
          >
            {children}
          </span>
        ) : null}
        {expanded && hasSubmenu ? (
          <div
            className="p-1 hover:bg-neutral-100 rounded"
            onClick={handleSubmenuToggle}
          >
            <SubframeCore.Icon
              className={SubframeUtils.twClassNames(
                "text-heading-3 font-heading-3 text-neutral-600 transition-transform",
                { "rotate-90": submenuExpanded }
              )}
              name="FeatherChevronRight"
            />
          </div>
        ) : null}
      </div>
      {expanded && hasSubmenu && submenuExpanded && submenuItems ? (
        <div className="ml-4 mt-1 space-y-1">
          {submenuItems}
        </div>
      ) : null}
    </div>
  );
});

interface SubNavItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  selected?: boolean;
  className?: string;
}

const SubNavItem = React.forwardRef<HTMLDivElement, SubNavItemProps>(function SubNavItem(
  {
    children,
    selected = false,
    className,
    ...otherProps
  }: SubNavItemProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 hover:bg-neutral-50 active:bg-neutral-100 text-sm",
        { "bg-brand-50 hover:bg-brand-50 active:bg-brand-100": selected },
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <div className="w-2 h-2 rounded-full bg-neutral-400" />
      <span
        className={SubframeUtils.twClassNames(
          "text-body font-body text-neutral-600",
          { "text-brand-700 font-body-bold": selected }
        )}
      >
        {children}
      </span>
    </div>
  );
});

interface SidebarRailWithIconsRootProps
  extends React.HTMLAttributes<HTMLElement> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  expanded?: boolean;
}

const SidebarRailWithIconsRoot = React.forwardRef<
  HTMLElement,
  SidebarRailWithIconsRootProps
>(function SidebarRailWithIconsRoot(
  {
    header,
    footer,
    children,
    className,
    expanded = false,
    ...otherProps
  }: SidebarRailWithIconsRootProps,
  ref
) {
  return (
    <nav
      className={SubframeUtils.twClassNames(
        "flex h-full flex-col items-start border-r border-solid border-neutral-border bg-default-background transition-all",
        { "w-64 p-4": expanded, "w-20 p-2": !expanded },
        className
      )}
      ref={ref}
      {...otherProps}
    >
      {header ? (
        <div className="flex w-full flex-col items-start gap-2 ">
          {header}
        </div>
      ) : null}
      {children ? (
        <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-1  overflow-auto">
          {children}
        </div>
      ) : null}
      {footer ? (
        <div className="flex w-full flex-col items-start justify-end gap-1 border-t border-solid border-neutral-border py-3">
          {footer}
        </div>
      ) : null}
    </nav>
  );
});

export const SidebarRailWithIcons = Object.assign(SidebarRailWithIconsRoot, {
  NavItem,
  SubNavItem,
});
