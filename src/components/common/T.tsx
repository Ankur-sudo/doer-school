"use client";
import { useTranslations } from "next-intl";
import React from "react";

// Define types
type LocalizationMessages = {
  common: {
    more: string;
    0: string;
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
  };
  home: {
    title: "hello";
  };
};

// Define root and tag keys based on the LocalizationMessages type
type RootKeys = keyof LocalizationMessages; // "common"
type CommonKeys<T> = keyof LocalizationMessages["common"]; // "more", "0", "1", ..., "9"

// Define props with type constraints
type Props<T> = {
  rootTag: RootKeys; // Only allows "common"
  tag: keyof LocalizationMessages[RootKeys]; // Only allows keys within "common"
};

export default function T<T>({ rootTag, tag }: Props<RootKeys>) {
  const tr = useTranslations(rootTag);
  return <>{tr(tag)}</>;
}
