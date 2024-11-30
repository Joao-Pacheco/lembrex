import { StyleSheet } from 'react-native';
import colors from '../../../../constants/colors';

export default StyleSheet.create({
  item: {
    backgroundColor: colors.background,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: '80%',
    marginBottom: 20,
  },
  itemText: {
    color: colors.secondary,
    fontSize: 20,
    fontWeight: '500',
    width: '100%',
    textAlign: 'center',
  },
});
