import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN = "ACCESS_TOKEN";
const REFRESH_TOKEN = "REFRESH_TOKEN";

async function getAccess() {
  return await SecureStore.getItemAsync(ACCESS_TOKEN);
}

async function getRefresh() {
  return await SecureStore.getItemAsync(REFRESH_TOKEN);
}

async function setAccess(token: string) {
  await SecureStore.setItemAsync(ACCESS_TOKEN, token);
}

async function setRefresh(token: string) {
  await SecureStore.setItemAsync(REFRESH_TOKEN, token);
}

async function clear() {
  await SecureStore.deleteItemAsync(ACCESS_TOKEN);
  await SecureStore.deleteItemAsync(REFRESH_TOKEN);
}


const tokens = {
  getAccess,
  getRefresh,
  setAccess,
  setRefresh,
  clear
}

export default tokens;