const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

export async function fetchStrapi(endpoint, options = {}) {
  const url = `${STRAPI_URL}/api/${endpoint}`;

  const isGet = !options.method || options.method.toUpperCase() === 'GET';

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Only send the token on GET requests.
  // If your Strapi API token has "Full Access", remove the `&& isGet` condition.
  // The current token appears to have read-only permissions (writes use public access).
  if (STRAPI_TOKEN && isGet) {
    headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
  }

  const res = await fetch(url, {
    ...options,
    headers,
    // Only cache GET requests; mutations must bypass cache
    ...(isGet ? { next: { revalidate: 60 } } : { cache: 'no-store' }),
  });

  if (!res.ok) {
    console.error(`Strapi error: ${res.status} ${res.statusText} - ${url}`);
    return null;
  }

  // DELETE and some PUTs return 204 No Content or empty body
  const text = await res.text();
  if (!text || text.trim() === '') return {};

  let json;
  try {
    json = JSON.parse(text);
  } catch {
    return {};
  }

  // Strapi v5 returns { data: [...] } or { data: {...} }
  if (json?.data !== undefined) return json.data;
  return json;
}

/**
 * Converts a Strapi v5 media object { url, ... } to a full URL string.
 * Works on an entire item recursively so all image fields are normalized.
 */
export function normalizeItem(item) {
  if (!item || typeof item !== 'object') return item;
  if (Array.isArray(item)) return item.map(normalizeItem);

  const out = {};
  for (const [key, val] of Object.entries(item)) {
    if (val && typeof val === 'object' && !Array.isArray(val) && 'url' in val) {
      // Media field — flatten to URL string
      out[key] = getStrapiMedia(val.url);
    } else if (Array.isArray(val)) {
      out[key] = val.map(normalizeItem);
    } else {
      out[key] = val;
    }
  }
  return out;
}

export function getStrapiMedia(url) {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}

// ─── Collection helpers ───────────────────────────────────────────────────────

export async function getMaterials() {
  const data = await fetchStrapi('materials?populate=*');
  return data ? (Array.isArray(data) ? data.map(normalizeItem) : normalizeItem(data)) : [];
}

export async function getMaterial(id) {
  const data = await fetchStrapi(`materials/${id}?populate=*`);
  return data ? normalizeItem(data) : null;
}

export async function getProducts() {
  const data = await fetchStrapi('products?populate=*');
  return data ? (Array.isArray(data) ? data.map(normalizeItem) : normalizeItem(data)) : [];
}

export async function getProduct(id) {
  const data = await fetchStrapi(`products/${id}?populate=*`);
  return data ? normalizeItem(data) : null;
}

export async function getProjects() {
  const data = await fetchStrapi('projects?populate=*');
  return data ? (Array.isArray(data) ? data.map(normalizeItem) : normalizeItem(data)) : [];
}

export async function getProject(id) {
  const data = await fetchStrapi(`projects/${id}?populate=*`);
  return data ? normalizeItem(data) : null;
}

export async function getServices() {
  const data = await fetchStrapi('services?populate=*');
  return data ? (Array.isArray(data) ? data.map(normalizeItem) : normalizeItem(data)) : [];
}

export async function getCertificates() {
  const data = await fetchStrapi('certificates?populate=*');
  return data ? (Array.isArray(data) ? data.map(normalizeItem) : normalizeItem(data)) : [];
}

export async function getTeamMembers() {
  const data = await fetchStrapi('team-members?populate=*');
  return data ? (Array.isArray(data) ? data.map(normalizeItem) : normalizeItem(data)) : [];
}

export async function getPartners() {
  const data = await fetchStrapi('partners?populate=*');
  return data ? (Array.isArray(data) ? data.map(normalizeItem) : normalizeItem(data)) : [];
}

export async function getCustomers() {
  const data = await fetchStrapi('customers?populate=*');
  return data ? (Array.isArray(data) ? data.map(normalizeItem) : normalizeItem(data)) : [];
}

export async function getSiteSettings() {
  const data = await fetchStrapi('site-settings');
  if (!data) return {};
  const list = Array.isArray(data) ? data : [data];
  // Transform [{key, value, ...}] → { key: value, ... }
  return list.reduce((acc, s) => {
    if (s.key) acc[s.key] = s.value;
    return acc;
  }, {});
}

// ─── Mutation helpers ─────────────────────────────────────────────────────────

/**
 * Resolve a documentId from either a numeric id or an existing documentId string.
 * Strapi v5 uses documentId (opaque string) for all single-document mutations.
 */
export async function getDocumentId(collection, id) {
  // Already a documentId (non-numeric string)
  if (typeof id === 'string' && isNaN(Number(id))) return id;
  // Numeric id → look up the documentId
  const items = await fetchStrapi(
    `${collection}?filters[id][$eq]=${id}&fields[0]=documentId`
  );
  return items?.[0]?.documentId ?? null;
}

export async function strapiDelete(collection, id) {
  const documentId = await getDocumentId(collection, id);
  if (!documentId) return null;
  return fetchStrapi(`${collection}/${documentId}`, { method: 'DELETE' });
}

export async function strapiUpdate(collection, id, data) {
  const documentId = await getDocumentId(collection, id);
  if (!documentId) return null;
  const result = await fetchStrapi(`${collection}/${documentId}`, {
    method: 'PUT',
    body: JSON.stringify({ data }),
  });
  return result ? normalizeItem(result) : null;
}

export async function strapiCreate(collection, data) {
  const result = await fetchStrapi(collection, {
    method: 'POST',
    body: JSON.stringify({ data }),
  });
  return result ? normalizeItem(result) : null;
}

// ─────────────────────────────────────────────────────────────────────────────

export async function strapiHealth() {
  try {
    const res = await fetch(`${STRAPI_URL}/_health`, { next: { revalidate: 0 } });
    return res.ok;
  } catch {
    return false;
  }
}
