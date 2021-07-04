interface Store {
  type?: "session" | "local";
  key: string;
  value?: unknown;
}
export function getStore({ type = "session", key }: Store) {
  if (type === "session") {
    let result = sessionStorage.getItem(key);
    try {
      result = JSON.parse(result!);
    } catch (error) {}

    return result as any;
  }
  if (type === "local") {
    let result = localStorage.getItem(key);
    try {
      result = JSON.parse(result!);
    } catch (error) {}

    return result as any;
  }
}
export function setStore({ type = "session", key, value }: Store) {
  let target = value;
  if (typeof value === "object") {
    target = JSON.stringify(value);
  }
  if (type === "session") {
    sessionStorage.setItem(key, String(target));
  } else {
    localStorage.setItem(key, String(target));
  }
}
