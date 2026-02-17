/**
 * Utility functions for generating IDs
 */
import { v4 as uuidv4 } from "uuid";

/**
 * Generates a random ID with the specified prefix
 * @param prefix The prefix to use for the ID (default: "app")
 * @returns A string in the format "{prefix}_{randomString}" where randomString is a hyphenless UUID
 */
export function generateRandomId(prefix: string = "app"): string {
  // Use full UUID for entropy and strip hyphens to keep the token compact
  const randomPart = uuidv4().replace(/-/g, "");
  return `${prefix}_${randomPart}`;
}
