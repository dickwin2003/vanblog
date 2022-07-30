import { Article } from "../types/article";
import { config } from "../utils/loadConfig";
export type SortOrder = "asc" | "desc";
export interface GetArticleOption {
  page: number;
  pageSize: number;
  toListView?: boolean;
  category?: string;
  tags?: string;
  sortCreatedAt?: SortOrder;
  sortTop?: SortOrder;
  withWordCount?: boolean;
}
export const getArticlesByOption = async (
  option: GetArticleOption
): Promise<{ articles: Article[]; total: number; totalWordCount?: number }> => {
  let queryString = "";
  for (const [k, v] of Object.entries(option)) {
    queryString += `${k}=${v}&`;
  }
  queryString = queryString.substring(0, queryString.length - 1);
  try {
    const url = `${config.baseUrl}api/public/article?${queryString}`;
    const res = await fetch(url);
    const { data } = await res.json();
    return data;
  } catch (err) {
    if (process.env.isBuild == "t") {
      console.log("无法连接，采用默认值");
      return {
        articles: [],
        total: 0,
      };
    } else {
      throw err;
    }
  }
};
export const getArticlesByTimeLine = async () => {
  try {
    const url = `${config.baseUrl}api/public/timeline`;
    const res = await fetch(url);
    const { data } = await res.json();
    return data;
  } catch (err) {
    if (process.env.isBuild == "t") {
      console.log("无法连接，采用默认值");
      return {};
    } else {
      throw err;
    }
  }
};
export const getArticlesByCategory = async () => {
  try {
    const url = `${config.baseUrl}api/public/category`;
    const res = await fetch(url);
    const { data } = await res.json();
    return data;
  } catch (err) {
    if (process.env.isBuild == "t") {
      console.log("无法连接，采用默认值");
      return {};
    } else {
      throw err;
    }
  }
};
export const getArticlesByTag = async (tagName: string) => {
  try {
    const url = `${config.baseUrl}api/public/tag`;
    const res = await fetch(url);
    const { data } = await res.json();
    return data;
  } catch (err) {
    if (process.env.isBuild == "t") {
      console.log("无法连接，采用默认值");
      return {};
    } else {
      throw err;
    }
  }
};
export const getArticleById = async (id: number) => {
  try {
    const url = `${config.baseUrl}api/public/article/${id}`;
    const res = await fetch(url);
    const { data } = await res.json();
    return data;
  } catch (err) {
    if (process.env.isBuild == "t") {
      console.log("无法连接，采用默认值");
      return {};
    } else {
      throw err;
    }
  }
};