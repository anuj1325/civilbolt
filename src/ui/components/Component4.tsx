"use client";
/*
 * Documentation:
 * component4 — https://app.subframe.com/008548d9f5d8/library?component=component4_09476bff-633b-42dd-a429-95c5de72be7e
 * Icon with background — https://app.subframe.com/008548d9f5d8/library?component=Icon+with+background_c5d68c0e-4c0c-4cff-8d8c-6ff334859b3a
 * Text Field — https://app.subframe.com/008548d9f5d8/library?component=Text+Field_be48ca43-f8e7-4c0e-8870-d219ea11abfe
 * Avatar — https://app.subframe.com/008548d9f5d8/library?component=Avatar_bec25ae6-5010-4485-b46b-cf79e3943ab2
 */

import React from "react";
import * as SubframeUtils from "../utils";
import { IconWithBackground } from "./IconWithBackground";
import { TextField } from "./TextField";
import { Avatar } from "./Avatar";

interface Component4RootProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: React.ReactNode;
  className?: string;
}

const Component4Root = React.forwardRef<HTMLDivElement, Component4RootProps>(
  function Component4Root(
    { text, className, ...otherProps }: Component4RootProps,
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
  }
);

export const Component4 = Component4Root;
