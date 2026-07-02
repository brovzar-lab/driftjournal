import Purchases, { LOG_LEVEL } from 'react-native-purchases';
import { Platform } from 'react-native';
import { isDemoMode } from './demo';

export const ENTITLEMENT_PREMIUM = 'premium';
export const PRODUCT_MONTHLY = 'com.lemaa.driftjournal.premium_monthly';

export function initializePurchases(): void {
  if (isDemoMode) return;

  const apiKey =
    Platform.OS === 'android'
      ? (process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY ?? '')
      : (process.env.EXPO_PUBLIC_REVENUECAT_IOS_API_KEY ?? '');

  if (!apiKey || apiKey === 'REPLACE_WITH_VALUE') return;

  Purchases.setLogLevel(LOG_LEVEL.ERROR);
  Purchases.configure({ apiKey, appUserID: null });
}

export async function checkIsPremium(): Promise<boolean> {
  if (isDemoMode) return false;
  try {
    const info = await Purchases.getCustomerInfo();
    return !!info.entitlements.active[ENTITLEMENT_PREMIUM];
  } catch {
    return false;
  }
}

export async function purchasePremium(): Promise<boolean> {
  if (isDemoMode) return false;
  try {
    const offerings = await Purchases.getOfferings();
    const pkg = offerings.current?.availablePackages[0];
    if (!pkg) return false;
    const { customerInfo } = await Purchases.purchasePackage(pkg);
    return !!customerInfo.entitlements.active[ENTITLEMENT_PREMIUM];
  } catch {
    return false;
  }
}

export async function restorePurchases(): Promise<boolean> {
  if (isDemoMode) return false;
  try {
    const info = await Purchases.restorePurchases();
    return !!info.entitlements.active[ENTITLEMENT_PREMIUM];
  } catch {
    return false;
  }
}
