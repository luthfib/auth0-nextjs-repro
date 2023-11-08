import { handleAuth, handleLogout } from "@auth0/nextjs-auth0";
import { NextRequest } from "next/server";
import { NextApiResponse } from "next/types";

// Hack to undo ctw-component-library's use of fhir-kit-client which
// uses a fetch polyfill (https://github.com/lquixada/cross-fetch/blob/v4.x/src/node-polyfill.js#L8).
// This causes a problem where NextResponse is defined based on the
// original Response object, and then nextjs's app router would bomb
// due to the response not being a "instanceof Response" (since it is
// different from the original Response object) and we'd get a 500 error

// with "No response is returned from route handler" (see: https://github.com/vercel/next.js/blob/6ed4fddf8a55f956ca6a714e081a384880d45e52/packages/next/src/server/future/route-modules/app-route/module.ts#L367)
// let originalResponse = global.Response;

export const GET = (req: NextRequest, res: NextApiResponse) => {
  // global.Response = originalResponse;

  return handleAuth({
    logout: handleLogout({ returnTo: "/api/auth/login" }),
  })(req, res);
};

export const dynamic = "force-dynamic";
