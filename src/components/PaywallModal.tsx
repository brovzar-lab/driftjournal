import { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useStore } from '../lib/store';
import { purchasePremium, restorePurchases } from '../lib/revenueCat';
import { isDemoMode } from '../lib/demo';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const FEATURES = [
  { label: 'Unlimited daily voice captures' },
  { label: 'AI theme clustering — always free' },
  { label: 'Daily resurface engine — always free' },
];

export default function PaywallModal({ visible, onClose }: Props) {
  const [loading, setLoading] = useState(false);
  const setIsPremium = useStore((s) => s.setIsPremium);
  const showToast = useStore((s) => s.showToast);

  async function handleSubscribe() {
    if (isDemoMode) {
      showToast('Demo mode — purchase not available');
      return;
    }
    setLoading(true);
    try {
      const success = await purchasePremium();
      if (success) {
        setIsPremium(true);
        showToast('Welcome to DriftJournal Premium!');
        onClose();
      } else {
        showToast('Purchase cancelled');
      }
    } catch {
      showToast('Purchase failed — try again');
    } finally {
      setLoading(false);
    }
  }

  async function handleRestore() {
    if (isDemoMode) return;
    setLoading(true);
    try {
      const restored = await restorePurchases();
      if (restored) {
        setIsPremium(true);
        showToast('Premium restored!');
        onClose();
      } else {
        showToast('No active subscription found');
      }
    } catch {
      showToast('Restore failed — try again');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />
        <View style={styles.sheet}>
          <View style={styles.handle} />

          <Text style={styles.headline}>DriftJournal Premium</Text>
          <Text style={styles.price}>$4.99 / month</Text>
          <Text style={styles.sub}>
            All AI features stay free. Premium unlocks unlimited captures.
          </Text>

          <View style={styles.features}>
            {FEATURES.map((f) => (
              <View key={f.label} style={styles.featureRow}>
                <Text style={styles.featureCheck}>✓</Text>
                <Text style={styles.featureLabel}>{f.label}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.primaryBtn, loading && styles.btnDisabled]}
            onPress={handleSubscribe}
            disabled={loading}
            accessibilityRole="button"
            accessibilityLabel="Subscribe to DriftJournal Premium"
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.primaryBtnText}>Subscribe — $4.99/mo</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.restoreBtn}
            onPress={handleRestore}
            disabled={loading}
            accessibilityRole="button"
            accessibilityLabel="Restore previous purchase"
          >
            <Text style={styles.restoreBtnText}>Restore Purchase</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.dismissBtn} onPress={onClose} accessibilityRole="button">
            <Text style={styles.dismissText}>Not now</Text>
          </TouchableOpacity>

          <Text style={styles.legal}>
            {Platform.OS === 'android'
              ? 'Subscription renews automatically. Manage in Google Play.'
              : 'Subscription renews automatically. Manage in App Store settings.'}
          </Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.6)' },
  sheet: {
    backgroundColor: '#1e1b4b',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
    gap: 12,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 8,
  },
  headline: { fontSize: 22, fontWeight: '800', color: '#f8f8f8', textAlign: 'center' },
  price: { fontSize: 16, fontWeight: '700', color: '#a78bfa', textAlign: 'center' },
  sub: { fontSize: 13, color: '#a78bfa', textAlign: 'center', lineHeight: 18 },
  features: { gap: 8, marginVertical: 8 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  featureCheck: { fontSize: 14, color: '#6d9f71', fontWeight: '700' },
  featureLabel: { fontSize: 14, color: '#f8f8f8' },
  primaryBtn: {
    backgroundColor: '#7c3aed',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    minHeight: 52,
    justifyContent: 'center',
  },
  btnDisabled: { opacity: 0.6 },
  primaryBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  restoreBtn: { alignItems: 'center', paddingVertical: 10, minHeight: 44, justifyContent: 'center' },
  restoreBtnText: { color: '#a78bfa', fontSize: 14 },
  dismissBtn: { alignItems: 'center', paddingVertical: 8, minHeight: 44, justifyContent: 'center' },
  dismissText: { color: '#6b7280', fontSize: 14 },
  legal: { fontSize: 10, color: '#4b5563', textAlign: 'center', lineHeight: 14, marginTop: 4 },
});
