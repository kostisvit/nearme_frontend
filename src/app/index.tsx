import { router } from 'expo-router';
import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const COLORS = {
  background: '#0F172A',
  surface: '#172033',
  primary: '#FF4500',
  primaryPressed: '#E63E00',
  text: '#FFFFFF',
  textSecondary: '#94A3B8',
  border: '#334155',
  divider: '#475569',
};

const WelcomeScreen = () => {
  const handleGuestPress = () => {
    router.replace('/home');
  };

  const handleLoginPress = () => {
    console.log('Login');
  };

  const handleSignupPress = () => {
    console.log('Signup');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.background}
      />

      <View style={styles.container}>
        {/* Brand */}
        <View style={styles.brandContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>N</Text>
          </View>

          <Text style={styles.title}>NearMe</Text>

          <Text style={styles.subtitle}>
            Ψάξε · Βρες · Πήγαινε
          </Text>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Συνέχεια ως επισκέπτης"
            onPress={handleGuestPress}
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.primaryButtonPressed,
            ]}
          >
            <Text style={styles.primaryButtonText}>
              Συνέχεια ως επισκέπτης
            </Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Είσοδος"
            onPress={handleLoginPress}
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.secondaryButtonPressed,
            ]}
          >
            <Text style={styles.secondaryButtonText}>
              Είσοδος
            </Text>
          </Pressable>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />

            <Text style={styles.dividerText}>ή</Text>

            <View style={styles.divider} />
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Κάνε εγγραφή"
            onPress={handleSignupPress}
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.secondaryButtonPressed,
            ]}
          >
            <Text style={styles.secondaryButtonText}>
              Κάνε Εγγραφή
            </Text>
          </Pressable>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Βρες ό,τι χρειάζεσαι γύρω σου.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: 'space-between',
  },

  brandContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 24,
  },

  logo: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },

  logoText: {
    color: COLORS.text,
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: -1,
  },

  title: {
    color: COLORS.text,
    fontSize: 40,
    fontWeight: '800',
    letterSpacing: -1.2,
    marginBottom: 8,
  },

  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 1.5,
    textAlign: 'center',
  },

  actions: {
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
  },

  primaryButton: {
    minHeight: 56,
    width: '100%',
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },

  primaryButtonPressed: {
    backgroundColor: COLORS.primaryPressed,
    transform: [{ scale: 0.99 }],
  },

  primaryButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '700',
  },

  secondaryButton: {
    minHeight: 56,
    width: '100%',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  secondaryButtonPressed: {
    backgroundColor: '#1E293B',
    borderColor: COLORS.primary,
    transform: [{ scale: 0.99 }],
  },

  secondaryButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
  },

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },

  divider: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.divider,
  },

  dividerText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '500',
    marginHorizontal: 16,
  },

  footer: {
    alignItems: 'center',
    paddingTop: 24,
  },

  footerText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    textAlign: 'center',
  },
});

export default WelcomeScreen;
