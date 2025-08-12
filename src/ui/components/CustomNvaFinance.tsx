"use client";
/*
 * Documentation:
 * Custom nva finance — https://app.subframe.com/008548d9f5d8/library?component=Custom+nva+finance_0c58efce-de5e-4c2b-98b7-177675406797
 * Link Button — https://app.subframe.com/008548d9f5d8/library?component=Link+Button_a4ee726a-774c-4091-8c49-55b659356024
 * Icon with background — https://app.subframe.com/008548d9f5d8/library?component=Icon+with+background_c5d68c0e-4c0c-4cff-8d8c-6ff334859b3a
 */

import React from "react";
import * as SubframeUtils from "../utils";
import { LinkButton } from "./LinkButton";
import { IconWithBackground } from "./IconWithBackground";

interface CustomNvaFinanceRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const CustomNvaFinanceRoot = React.forwardRef<
  HTMLDivElement,
  CustomNvaFinanceRootProps
>(function CustomNvaFinanceRoot(
  { className, ...otherProps }: CustomNvaFinanceRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex items-center gap-2",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <LinkButton size="small">Pre-bid Risk Assessment</LinkButton>
      <IconWithBackground icon="FeatherChevronRight" />
      <LinkButton size="small">Evaluation</LinkButton>
      <IconWithBackground icon="FeatherChevronRight" />
      <LinkButton variant="brand" size="small">
        Technical Eligibility
      </LinkButton>
    </div>
  );
});

export const CustomNvaFinance = CustomNvaFinanceRoot;
