"use client";
/*
 * Documentation:
 * Area Chart — https://app.subframe.com/008548d9f5d8/library?component=Area+Chart_8aa1e7b3-5db6-4a62-aa49-137ced21a231
 */

import React from "react";
import * as SubframeUtils from "../utils";
import * as SubframeCore from "@subframe/core";

interface AreaChartRootProps
  extends React.ComponentProps<typeof SubframeCore.AreaChart> {
  stacked?: boolean;
  className?: string;
}

const AreaChartRoot = React.forwardRef<
  React.ElementRef<typeof SubframeCore.AreaChart>,
  AreaChartRootProps
>(function AreaChartRoot(
  { stacked = false, className, ...otherProps }: AreaChartRootProps,
  ref
) {
  return (
    <SubframeCore.AreaChart
      className={SubframeUtils.twClassNames("h-80 w-full", className)}
      ref={ref}
      stacked={stacked}
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

export const AreaChart = AreaChartRoot;
