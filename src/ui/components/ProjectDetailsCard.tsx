"use client";
/*
 * Documentation:
 * project details card — https://app.subframe.com/008548d9f5d8/library?component=project+details+card_e89c89a5-5d09-46fd-a66b-61a33c089ce1
 * Icon with background — https://app.subframe.com/008548d9f5d8/library?component=Icon+with+background_c5d68c0e-4c0c-4cff-8d8c-6ff334859b3a
 * Button — https://app.subframe.com/008548d9f5d8/library?component=Button_3b777358-b86b-40af-9327-891efc6826fe
 */

import React from "react";
import * as SubframeUtils from "../utils";
import { IconWithBackground } from "./IconWithBackground";
import { Button } from "./Button";

interface ProjectDetailsCardRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  text?: React.ReactNode;
  text2?: React.ReactNode;
  text3?: React.ReactNode;
  text4?: React.ReactNode;
  text5?: React.ReactNode;
  text6?: React.ReactNode;
  text7?: React.ReactNode;
  text8?: React.ReactNode;
  text9?: React.ReactNode;
  text10?: React.ReactNode;
  text11?: React.ReactNode;
  text12?: React.ReactNode;
  text13?: React.ReactNode;
  text14?: React.ReactNode;
  text15?: React.ReactNode;
  text16?: React.ReactNode;
  text17?: React.ReactNode;
  text18?: React.ReactNode;
  text19?: React.ReactNode;
  text20?: React.ReactNode;
  text21?: React.ReactNode;
  text22?: React.ReactNode;
  text23?: React.ReactNode;
  className?: string;
}

const ProjectDetailsCardRoot = React.forwardRef<
  HTMLDivElement,
  ProjectDetailsCardRootProps
>(function ProjectDetailsCardRoot(
  {
    text,
    text2,
    text3,
    text4,
    text5,
    text6,
    text7,
    text8,
    text9,
    text10,
    text11,
    text12,
    text13,
    text14,
    text15,
    text16,
    text17,
    text18,
    text19,
    text20,
    text21,
    text22,
    text23,
    className,
    ...otherProps
  }: ProjectDetailsCardRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex h-full w-full flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <div className="flex w-full items-center justify-between border-b border-solid border-neutral-border pb-4">
        <div className="flex items-center gap-2">
          <IconWithBackground size="small" icon="FeatherFileText" />
          {text ? (
            <span className="text-heading-2 font-heading-2 text-default-font">
              {text}
            </span>
          ) : null}
        </div>
        <Button variant="neutral-tertiary" size="small" icon="FeatherX" />
      </div>
      <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm">
        <div className="flex w-full items-start gap-4">
          <div className="flex flex-col items-start gap-1">
            {text2 ? (
              <span className="text-caption font-caption text-subtext-color">
                {text2}
              </span>
            ) : null}
            {text3 ? (
              <span className="text-body-bold font-body-bold text-default-font">
                {text3}
              </span>
            ) : null}
          </div>
        </div>
        <div className="flex w-full flex-wrap items-start gap-8">
          <div className="flex flex-col items-start gap-1">
            {text4 ? (
              <span className="text-caption font-caption text-subtext-color">
                {text4}
              </span>
            ) : null}
            {text5 ? (
              <span className="text-body-bold font-body-bold text-default-font">
                {text5}
              </span>
            ) : null}
          </div>
          <div className="flex flex-col items-start gap-1">
            {text6 ? (
              <span className="text-caption font-caption text-subtext-color">
                {text6}
              </span>
            ) : null}
            {text7 ? (
              <span className="text-body-bold font-body-bold text-default-font">
                {text7}
              </span>
            ) : null}
          </div>
          <div className="flex flex-col items-start gap-2">
            {text8 ? (
              <span className="text-caption font-caption text-subtext-color">
                {text8}
              </span>
            ) : null}
            <div className="flex items-center gap-2">
              <IconWithBackground
                variant="neutral"
                size="small"
                icon="FeatherUser"
              />
              {text9 ? (
                <span className="text-body-bold font-body-bold text-default-font">
                  {text9}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-start gap-8 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm mt-4">
        <div className="flex w-full items-start gap-8">
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2">
            {text10 ? (
              <span className="text-caption font-caption text-subtext-color">
                {text10}
              </span>
            ) : null}
            <div className="flex items-center gap-2">
              <IconWithBackground size="small" icon="FeatherTrendingUp" />
              {text11 ? (
                <span className="text-body-bold font-body-bold text-default-font">
                  {text11}
                </span>
              ) : null}
            </div>
          </div>
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2">
            {text12 ? (
              <span className="text-caption font-caption text-subtext-color">
                {text12}
              </span>
            ) : null}
            <div className="flex items-center gap-2">
              <IconWithBackground
                variant="neutral"
                size="small"
                icon="FeatherLayers"
              />
              {text13 ? (
                <span className="text-body-bold font-body-bold text-default-font">
                  {text13}
                </span>
              ) : null}
            </div>
          </div>
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2">
            {text14 ? (
              <span className="text-caption font-caption text-subtext-color">
                {text14}
              </span>
            ) : null}
            <div className="flex items-center gap-2">
              <IconWithBackground
                variant="success"
                size="small"
                icon="FeatherDollarSign"
              />
              {text15 ? (
                <span className="text-body-bold font-body-bold text-default-font">
                  {text15}
                </span>
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex w-full items-start gap-8">
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2">
            {text16 ? (
              <span className="text-caption font-caption text-subtext-color">
                {text16}
              </span>
            ) : null}
            <div className="flex items-center gap-2">
              <IconWithBackground
                variant="warning"
                size="small"
                icon="FeatherRefreshCw"
              />
              {text17 ? (
                <span className="text-body-bold font-body-bold text-default-font">
                  {text17}
                </span>
              ) : null}
            </div>
          </div>
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2">
            {text18 ? (
              <span className="text-caption font-caption text-subtext-color">
                {text18}
              </span>
            ) : null}
            <div className="flex items-center gap-2">
              <IconWithBackground
                variant="success"
                size="small"
                icon="FeatherCheckCircle"
              />
              {text19 ? (
                <span className="text-body-bold font-body-bold text-default-font">
                  {text19}
                </span>
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex w-full items-start gap-8">
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2">
            {text20 ? (
              <span className="text-caption font-caption text-subtext-color">
                {text20}
              </span>
            ) : null}
            <div className="flex items-center gap-2">
              <IconWithBackground
                variant="neutral"
                size="small"
                icon="FeatherCalendar"
              />
              {text21 ? (
                <span className="text-body-bold font-body-bold text-default-font">
                  {text21}
                </span>
              ) : null}
            </div>
          </div>
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2">
            {text22 ? (
              <span className="text-caption font-caption text-subtext-color">
                {text22}
              </span>
            ) : null}
            <div className="flex items-center gap-2">
              <IconWithBackground
                variant="success"
                size="small"
                icon="FeatherCreditCard"
              />
              {text23 ? (
                <span className="text-body-bold font-body-bold text-default-font">
                  {text23}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export const ProjectDetailsCard = ProjectDetailsCardRoot;
