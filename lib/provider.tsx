"use client";

import { CTWProvider } from "@zus-health/ctw-component-library";
import { ReactNode } from "react";
import { Claims } from "@auth0/nextjs-auth0";

export type CTWProviderProps = {
  children: ReactNode;
  featureFlags: Record<string, boolean>;
  ctwRequestContext: {
    env: string;
    authToken: string | undefined;
    builderId?: string;
    user: Claims | undefined;
  };
};

export const ComponentLibraryProvider = ({
  children,
  ctwRequestContext,
}: CTWProviderProps) => {
  return (
    <CTWProvider
      authToken={ctwRequestContext.authToken}
      builderId={ctwRequestContext.builderId}
      env={ctwRequestContext.env}
    >
      {children}
    </CTWProvider>
  );
};
