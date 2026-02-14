import AsyncStorage from "@react-native-async-storage/async-storage";

export const LANGUAGE_KEY = "user-language";

export const ONBOARDING_KEY = "user-onboarding";

export const saveLanguage = async (lng: string): Promise<void> => {
  await AsyncStorage.setItem(LANGUAGE_KEY, lng);
};

export const loadLanguage = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(LANGUAGE_KEY);
};

export const saveOnboarding = async (value: boolean): Promise<void> => {
  await AsyncStorage.setItem(ONBOARDING_KEY, value.toString());
};

export const loadOnboarding = async (): Promise<boolean | null> => {
  const value = await AsyncStorage.getItem(ONBOARDING_KEY);
  return value ? JSON.parse(value) : null;
};

export const USER_SETUP_KEY = "user-setup";

export const saveSetup = async (value: boolean): Promise<void> => {
  await AsyncStorage.setItem(USER_SETUP_KEY, value.toString());
};

export const loadSetup = async (): Promise<boolean | null> => {
  const value = await AsyncStorage.getItem(USER_SETUP_KEY);
  return value ? JSON.parse(value) : null;
};
