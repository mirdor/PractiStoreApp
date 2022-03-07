import { StyleSheet } from 'react-native';

export const globalColors = {
  text: '#f7f7f7',
  primary: '#9949E9',
  secondary: '#92F035',
  blackBg: '#09050D',
  darkGray: '#1E1924',
  altGray: '#47444B',
};

export const loginStyles = StyleSheet.create({
  brandContainer: {
    backgroundColor: globalColors.primary,
    flex: 1,
  },
  container: {
    backgroundColor: globalColors.darkGray,
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
    padding: 20,
  },
  title: {
    fontSize: 26,
    color: globalColors.text,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputField: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  inputFieldIOS: {},
});
