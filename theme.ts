import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#4f46e5',
  background: '#f3f4f6',
  card: '#ffffff',
  text: '#111827',
  muted: '#6b7280',
  border: '#d1d5db',
  danger: '#dc2626',
  success: '#16a34a',
};

// Shared styles keep the three screens visually consistent.
export const shared = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background, padding: 16 },
  heading: { fontSize: 24, fontWeight: '700', color: colors.text, marginBottom: 8 },
  body: { fontSize: 16, color: colors.muted, marginBottom: 16 },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  primaryButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  secondaryButton: {
    backgroundColor: '#e5e7eb',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  secondaryButtonText: { color: colors.text, fontWeight: '600', fontSize: 16 },
  dangerButton: {
    backgroundColor: colors.danger,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
});
