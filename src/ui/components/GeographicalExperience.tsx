"use client";
/*
 * Documentation:
 * Geographical Experience — https://app.subframe.com/008548d9f5d8/library?component=Geographical+Experience_730ec609-4369-4981-ba4a-0de63fd166e2
 * Table — https://app.subframe.com/008548d9f5d8/library?component=Table_142dfde7-d0cc-48a1-a04c-a08ab2252633
 * Badge — https://app.subframe.com/008548d9f5d8/library?component=Badge_97bdb082-1124-4dd7-a335-b14b822d0157
 */

import React from "react";
import * as SubframeUtils from "../utils";
import { Table } from "./Table";
import { Badge } from "./Badge";

interface GeographicalExperienceRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  text?: React.ReactNode;
  text2?: React.ReactNode;
  text3?: React.ReactNode;
  className?: string;
}

const GeographicalExperienceRoot = React.forwardRef<
  HTMLDivElement,
  GeographicalExperienceRootProps
>(function GeographicalExperienceRoot(
  {
    text,
    text2,
    text3,
    className,
    ...otherProps
  }: GeographicalExperienceRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      {text ? (
        <span className="text-heading-3 font-heading-3 text-default-font">
          {text}
        </span>
      ) : null}
      <Table
        header={
          <Table.HeaderRow>
            <Table.HeaderCell>Primary Operated Region</Table.HeaderCell>
            <Table.HeaderCell>Weather Conditions</Table.HeaderCell>
            <Table.HeaderCell>Similar Terrain Experience</Table.HeaderCell>
            <Table.HeaderCell>Local Presence</Table.HeaderCell>
          </Table.HeaderRow>
        }
      >
        <Table.Row>
          <Table.Cell>
            {text2 ? (
              <span className="whitespace-nowrap text-body font-body text-neutral-500">
                {text2}
              </span>
            ) : null}
          </Table.Cell>
          <Table.Cell>
            {text3 ? (
              <span className="whitespace-nowrap text-body font-body text-neutral-500">
                {text3}
              </span>
            ) : null}
          </Table.Cell>
          <Table.Cell>
            <Badge variant="success">Yes</Badge>
          </Table.Cell>
          <Table.Cell>
            <Badge variant="success">Yes</Badge>
          </Table.Cell>
        </Table.Row>
      </Table>
    </div>
  );
});

export const GeographicalExperience = GeographicalExperienceRoot;
