import { API_URL } from "../api/api";

export type OrganizationImage = { image_url: string; };

export type OrgType = {
  id: number;
  name: string;
  icon: string;
  slug: string;
};


export async function getOrgTypes(query: string) {
  const response = await fetch(
    `${API_URL}/api/organization/type/`
  );

  if (!response.ok) {
    throw new Error("Failed to search organization types");
  }

  return response.json();
}
