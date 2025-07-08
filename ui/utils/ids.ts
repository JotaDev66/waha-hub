/**
 * Utility functions for generating IDs
 */

/**
 * Generates a random ID with the specified prefix
 * @param prefix The prefix to use for the ID (default: "app")
 * @returns A string in the format "{prefix}_{randomString}" where randomString is 8 alphanumeric characters
 */
export function generateRandomId(prefix: string = "app"): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  
  // Generate 8 random characters
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return `${prefix}_${result}`;
}