"use client";
/*
 * Documentation:
 * Pie Chart — https://app.subframe.com/008548d9f5d8/library?component=Pie+Chart_0654ccc7-054c-4f3a-8e9a-b7c81dd3963c
 */

import React from "react";
import * as SubframeUtils from "../utils";
import * as SubframeCore from "@subframe/core";

interface PieChartRootProps
  extends React.ComponentProps<typeof SubframeCore.PieChart> {
  className?: string;
}

const PieChartRoot = React.forwardRef<
  React.ElementRef<typeof SubframeCore.PieChart>,
  PieChartRootProps
>(function PieChartRoot({ className, ...otherProps }: PieChartRootProps, ref) {
  return (
    <SubframeCore.PieChart
      className={SubframeUtils.twClassNames(
        "h-52 w-52 overflow-auto",
        className
      )}
      ref={ref}
      colors={[
        "#22c55e",
        "#bbf7d0",
        "#16a34a",
        "#86efac",
        "#15803d",
        "#4ade80",
      ]}
      {...otherProps}
    />
  );
});

export const PieChart = PieChartRoot;
