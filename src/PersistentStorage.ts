export function getPersistentStorage(name: string) {
  try {
    const stringyfiedData = localStorage.getItem(name);
    if (!stringyfiedData) return null;
    return JSON.parse(stringyfiedData);
  } catch (e) {
    return null
  }
}

export function setPersistentStorage(name: string, data: any) {
  try {
    const stringyfiedData = JSON.stringify(data);
    localStorage.setItem(name, stringyfiedData);
    return true
  } catch (e) {
    return null
  }
}
