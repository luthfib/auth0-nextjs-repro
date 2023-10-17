import { Session } from "@auth0/nextjs-auth0";
import { cookies } from "next/headers";
import jwt_decode from "jwt-decode";

export const getUserFromJWT = (accessToken: string | undefined) => {
  if (!accessToken) {
    return undefined;
  }
  const decoded = jwt_decode(accessToken) as { [key: string]: string };

  return {
    iss: decoded["iss"] ?? "",
    zusUserId: decoded["https://zusapi.com/user_id"] ?? "",
    builderId: decoded["https://zusapi.com/builder_id"] ?? "",
    userType: decoded["https://zusapi.com/user_type"] ?? "",
    builderName: decoded["https://zusapi.com/builder_name"] ?? "",
    email: decoded["https://zusapi.com/email"] ?? "",
    practitionerId: decoded["https://zusapi.com/practitioner_id"] ?? "",
  };
};

export const getRequestContext = (session: Session | null | undefined) => {
  const accessToken = session?.["accessToken"];
  const user = getUserFromJWT(accessToken);
  const selectedBuilderId = cookies().get("builderId")?.value;

  return {
    name: session?.user?.name,
    accessToken,
    builderId: selectedBuilderId ?? (user?.builderId as string),
    isImpersonatingBuilder: !!(
      selectedBuilderId && selectedBuilderId !== user?.builderId
    ),
  };
};
