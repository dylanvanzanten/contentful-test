import { createClient } from "contentful";

export const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

const getClient = () => {
  return createClient({
    space: CONTENTFUL_SPACE_ID,
    accessToken: CONTENTFUL_ACCESS_TOKEN,
  });
};

export const getContentType = (query) => {
  const client = getClient();

  return client.getContentType(query);
};

export const getEntries = (query) => {
  const client = getClient();

  return client.getEntries(query);
};

export const getEntry = (id, query) => {
  const client = getClient();

  return client.getEntry(id, query);
};
