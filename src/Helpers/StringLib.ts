/**
 * case insensitive string search, returns true if match
 * @param toBeSearched string to be searched
 * @param seachedFor string to be searched for
 */
function includesStr(toBeSearched: string, seachedFor: string): boolean {
  return toBeSearched.toLowerCase().includes(seachedFor.toLowerCase());
}

export default includesStr;
