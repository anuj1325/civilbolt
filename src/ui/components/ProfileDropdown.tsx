"use client";
/*
 * Documentation:
 * profile dropdown — https://app.subframe.com/008548d9f5d8/library?component=profile+dropdown_9ac929bb-c95d-4fea-bb96-33af0dd7aac7
 * Dropdown Menu — https://app.subframe.com/008548d9f5d8/library?component=Dropdown+Menu_99951515-459b-4286-919e-a89e7549b43b
 */

import React from "react";
import * as SubframeUtils from "../utils";
import { DropdownMenu } from "./DropdownMenu";

interface ProfileDropdownRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const ProfileDropdownRoot = React.forwardRef<
  HTMLDivElement,
  ProfileDropdownRootProps
>(function ProfileDropdownRoot(
  { className, ...otherProps }: ProfileDropdownRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex items-start justify-between",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <DropdownMenu className="h-auto w-44 flex-none">
        <DropdownMenu.DropdownItem icon="FeatherActivitySquare">
          Technical Profile
        </DropdownMenu.DropdownItem>
        <DropdownMenu.DropdownItem icon="FeatherBadgeIndianRupee">
          Financial Profile
        </DropdownMenu.DropdownItem>
        <DropdownMenu.DropdownItem icon="FeatherEdit2">
          Edit
        </DropdownMenu.DropdownItem>
        <DropdownMenu.DropdownItem icon="FeatherLogOut">
          Logout
        </DropdownMenu.DropdownItem>
      </DropdownMenu>
    </div>
  );
});

export const ProfileDropdown = ProfileDropdownRoot;
