import React, { useContext } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { globalColors } from '../theme/loginTheme';

const ProtectedScreen = () => {
  const { user, token, logOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ProtectedScreen</Text>

      <Button title="Logout" color={globalColors.primary} onPress={logOut} />

      <Text>{JSON.stringify(user, null, 4)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default ProtectedScreen;
