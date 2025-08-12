"use client";
/*
 * Documentation:
 * Custom component5 — https://app.subframe.com/008548d9f5d8/library?component=Custom+component5_3e4220f9-ccc6-425f-b487-54efd7830935
 * Icon with background — https://app.subframe.com/008548d9f5d8/library?component=Icon+with+background_c5d68c0e-4c0c-4cff-8d8c-6ff334859b3a
 * Breadcrumbs — https://app.subframe.com/008548d9f5d8/library?component=Breadcrumbs_8898334b-a66f-4ee8-8bd1-afcfa8e37cc0
 * custom nav — https://app.subframe.com/008548d9f5d8/library?component=custom+nav_8328374f-4f93-4e63-80cd-8ecc67ac95cd
 * Text Field — https://app.subframe.com/008548d9f5d8/library?component=Text+Field_be48ca43-f8e7-4c0e-8870-d219ea11abfe
 * Avatar — https://app.subframe.com/008548d9f5d8/library?component=Avatar_bec25ae6-5010-4485-b46b-cf79e3943ab2
 */

import React from "react";
import * as SubframeUtils from "../utils";
import { IconWithBackground } from "./IconWithBackground";
import { Breadcrumbs } from "./Breadcrumbs";
import { CustomNav } from "./CustomNav";
import { TextField } from "./TextField";
import { Avatar } from "./Avatar";

interface CustomComponent5RootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  text?: React.ReactNode;
  className?: string;
}

const CustomComponent5Root = React.forwardRef<
  HTMLDivElement,
  CustomComponent5RootProps
>(function CustomComponent5Root(
  { text, className, ...otherProps }: CustomComponent5RootProps,
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
      <div className="flex items-center gap-1">
        <IconWithBackground size="small" icon="FeatherBriefcase" />
        {text ? (
          <span className="text-body-bold font-body-bold text-default-font">
            {text}
          </span>
        ) : null}
        <Breadcrumbs>
          <Breadcrumbs.Divider />
          <Breadcrumbs.Item active={true}>Highway Project</Breadcrumbs.Item>
        </Breadcrumbs>
      </div>
      <CustomNav />
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

export const CustomComponent5 = CustomComponent5Root;
