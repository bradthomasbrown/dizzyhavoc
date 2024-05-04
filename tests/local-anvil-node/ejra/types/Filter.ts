import { Tag } from "./Tag.ts";

export type Filter = {
  fromBlock: Tag;
  toBlock: Tag;
  address?: string;
  topics?: (string | string[])[];
};