import { StyleSheet } from 'react-native';

export const globalColors = {
  text: '#111',
  primary: '#6337E6',
  secondary: '#2B7EF3',
  blackBg: '#070410',
  darkGray: '#1E1924',
  altGray: '#47444B',
};

export const loginStyles = StyleSheet.create({
  brandContainer: {
    backgroundColor: globalColors.primary,
    flex: 1,
  },
  container: {
    backgroundColor: '#fff',
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
    padding: 20,
    paddingVertical: 50,
  },
  title: {
    fontSize: 26,
    color: globalColors.text,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  label: {
    marginTop: 25,
    color: globalColors.text,
    fontSize: 16,
  },
  inputField: {
    fontSize: 18,
  },
  inputFieldIOS: {
    borderBottomColor: globalColors.primary,
    borderBottomWidth: 2,
    paddingBottom: 4,
  },
  buttonContainer: {
    marginTop: 40,
  },
  newUserContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
});
