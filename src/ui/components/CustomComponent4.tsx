"use client";
/*
 * Documentation:
 * Custom component4 — https://app.subframe.com/008548d9f5d8/library?component=Custom+component4_e23d18a1-463e-4a0c-aace-e049ea3aafd8
 * Custom component5 — https://app.subframe.com/008548d9f5d8/library?component=Custom+component5_3e4220f9-ccc6-425f-b487-54efd7830935
 */

import React from "react";
import * as SubframeUtils from "../utils";
import { CustomComponent5 } from "./CustomComponent5";

interface CustomComponent4RootProps
  extends React.ComponentProps<typeof CustomComponent5> {
  className?: string;
}

const CustomComponent4Root = React.forwardRef<
  React.ElementRef<typeof CustomComponent5>,
  CustomComponent4RootProps
>(function CustomComponent4Root(
  { className, ...otherProps }: CustomComponent4RootProps,
  ref
) {
  return (
    <CustomComponent5
      className={className}
      text="GR Infra"
      ref={ref}
      {...otherProps}
    />
  );
});

export const CustomComponent4 = CustomComponent4Root;
