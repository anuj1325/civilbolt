"use client";
/*
 * Documentation:
 * Custom component2 — https://app.subframe.com/008548d9f5d8/library?component=Custom+component2_c5b78d01-4858-4780-ae7f-014ba568dc8c
 * Custom component1 — https://app.subframe.com/008548d9f5d8/library?component=Custom+component1_65729715-af02-4263-9e82-663ad4bda460
 */

import React from "react";
import * as SubframeUtils from "../utils";
import { CustomComponent1 } from "./CustomComponent1";

interface CustomComponent2RootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  text?: React.ReactNode;
  variant?: "default";
  className?: string;
}

const CustomComponent2Root = React.forwardRef<
  HTMLDivElement,
  CustomComponent2RootProps
>(function CustomComponent2Root(
  {
    text,
    variant = "default",
    className,
    ...otherProps
  }: CustomComponent2RootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex w-full flex-col items-start gap-4",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <CustomComponent1 />
    </div>
  );
});

export const CustomComponent2 = CustomComponent2Root;
