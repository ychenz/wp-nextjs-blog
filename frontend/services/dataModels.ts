export interface WPMedia {
  source_url: string;
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string; // category used in url
}

export interface WPPost {
  id: number;
  type: string;  // Whether this is a post or something else (everything is a post in wp x.x)
  title: {
    rendered: string;
  };
  modified_gmt: string; // e.g: "2019-11-20T18:24:13"
  date_gmt: string; // date created
  slug: string; // post name in link
  _embedded: {
    "wp:featuredmedia": WPMedia[];
    "wp:term": WPCategory[][];
  };
  content: {
    rendered: string; // embedded thml string
  };
}

export function getFeaturedImageUrl(post: Partial<WPPost>): string | null {
  return (
    post._embedded &&
    post._embedded["wp:featuredmedia"] &&
    post._embedded["wp:featuredmedia"][0] &&
    post._embedded["wp:featuredmedia"][0].source_url
  ) ? post._embedded["wp:featuredmedia"][0].source_url : null;
}

export function getCategories(post: Partial<WPPost>): Partial<WPCategory>[] {
  return (
    post._embedded &&
    post._embedded["wp:term"] &&
    post._embedded["wp:term"][0] &&
    post._embedded["wp:term"][0].length > 0
) ? post._embedded["wp:term"][0] : null;
}
