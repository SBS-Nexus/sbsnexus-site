// Browser requests must carry the signed-in user's identity, never a shared
// service credential. The maintenance API must validate and scope this token.
export function maintenanceAuthorization(): string {
  const token = localStorage.getItem("sbs_token")?.trim();
  if (!token) throw new Error("Bitte erneut anmelden.");
  return `Bearer ${token}`;
}
