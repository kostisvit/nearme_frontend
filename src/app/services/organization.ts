import { API_URL } from "../api/api";

export type OrganizationImage = { image_url: string; };

// export type OrgType = {
//   id: number;
//   name: string;
//   icon: string;
//   slug: string;
// };

export type Organization = {
  id: number;
  name: string;
  phone: string;
  address: string;
  description?: string;
  email?: string;
  //reviews: OrganizationReview[];
  latitude: number;
  longitude: number;
  image_url: OrganizationImage[];
  average_rating?: number;
  open_status?: string;
  images: OrganizationImage[];
  //status_info?: StatusInfo;
  //hours?: OrgHour[];
  //organization_type?: OrgType;
  is_verified?:boolean;
};

export async function searchOrganizations(query: string) {
  const response = await fetch(
    `${API_URL}/api/organizations/?search=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error("Failed to search organizations");
  }

  return response.json();
}
