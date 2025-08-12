"use client";
/*
 * Documentation:
 * top nav technical — https://app.subframe.com/008548d9f5d8/library?component=top+nav+technical_023a15ed-1f44-432b-aea6-06f0425dbfd3
 * Icon with background — https://app.subframe.com/008548d9f5d8/library?component=Icon+with+background_c5d68c0e-4c0c-4cff-8d8c-6ff334859b3a
 * Breadcrumbs — https://app.subframe.com/008548d9f5d8/library?component=Breadcrumbs_8898334b-a66f-4ee8-8bd1-afcfa8e37cc0
 * Text Field — https://app.subframe.com/008548d9f5d8/library?component=Text+Field_be48ca43-f8e7-4c0e-8870-d219ea11abfe
 * Avatar — https://app.subframe.com/008548d9f5d8/library?component=Avatar_bec25ae6-5010-4485-b46b-cf79e3943ab2
 */

import React from "react";
import * as SubframeUtils from "../utils";
import { IconWithBackground } from "./IconWithBackground";
import { Breadcrumbs } from "./Breadcrumbs";
import { TextField } from "./TextField";
import { Avatar } from "./Avatar";

interface TopNavTechnicalRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  text?: React.ReactNode;
  className?: string;
}

const TopNavTechnicalRoot = React.forwardRef<
  HTMLDivElement,
  TopNavTechnicalRootProps
>(function TopNavTechnicalRoot(
  { text, className, ...otherProps }: TopNavTechnicalRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex w-full items-center justify-between border-b border-solid border-neutral-border px-8 py-4",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <div className="flex items-center gap-2">
        <IconWithBackground size="small" icon="FeatherBriefcase" />
        {text ? (
          <span className="text-body-bold font-body-bold text-default-font">
            {text}
          </span>
        ) : null}
        <Breadcrumbs>
          <Breadcrumbs.Divider />
          <Breadcrumbs.Item active={true}>Technical Details</Breadcrumbs.Item>
        </Breadcrumbs>
      </div>
      <div className="flex items-center gap-4">
        <TextField variant="filled" label="" helpText="" icon="FeatherSearch">
          <TextField.Input placeholder="Search projects..." />
        </TextField>
        <Avatar
          size="small"
          image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        >
          J
        </Avatar>
      </div>
    </div>
  );
});

export const TopNavTechnical = TopNavTechnicalRoot;
