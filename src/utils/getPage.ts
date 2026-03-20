const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';

export function getPage(pageId: string) {
  return fetch(`${STRAPI_URL}/api/${pageId}?populate=*`, {
    headers: {
      authorization: `Bearer ${STRAPI_API_TOKEN}`,
    },
  })
    .then((res) => res.json())
    .then((json) => json.data);
}
