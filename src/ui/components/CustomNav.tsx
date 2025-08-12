"use client";
/*
 * Documentation:
 * custom nav — https://app.subframe.com/008548d9f5d8/library?component=custom+nav_8328374f-4f93-4e63-80cd-8ecc67ac95cd
 * Custom nva finance — https://app.subframe.com/008548d9f5d8/library?component=Custom+nva+finance_0c58efce-de5e-4c2b-98b7-177675406797
 */

import React from "react";
import * as SubframeUtils from "../utils";
import { CustomNvaFinance } from "./CustomNvaFinance";

interface CustomNavRootProps
  extends React.ComponentProps<typeof CustomNvaFinance> {
  className?: string;
}

const CustomNavRoot = React.forwardRef<
  React.ElementRef<typeof CustomNvaFinance>,
  CustomNavRootProps
>(function CustomNavRoot(
  { className, ...otherProps }: CustomNavRootProps,
  ref
) {
  return <CustomNvaFinance className={className} ref={ref} {...otherProps} />;
});

export const CustomNav = CustomNavRoot;
