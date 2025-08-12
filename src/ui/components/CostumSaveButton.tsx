"use client";
/*
 * Documentation:
 * costum save button — https://app.subframe.com/008548d9f5d8/library?component=costum+save+button_bbcdf29b-9e25-49f2-b9ad-a5550c094f1d
 * Button — https://app.subframe.com/008548d9f5d8/library?component=Button_3b777358-b86b-40af-9327-891efc6826fe
 */

import React from "react";
import * as SubframeUtils from "../utils";
import { Button } from "./Button";

interface CostumSaveButtonRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const CostumSaveButtonRoot = React.forwardRef<
  HTMLDivElement,
  CostumSaveButtonRootProps
>(function CostumSaveButtonRoot(
  { className, ...otherProps }: CostumSaveButtonRootProps,
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
      <Button variant="neutral-secondary" icon="FeatherSave">
        Save Progress
      </Button>
      <Button icon="FeatherCheck">Submit Assessment</Button>
    </div>
  );
});

export const CostumSaveButton = CostumSaveButtonRoot;
