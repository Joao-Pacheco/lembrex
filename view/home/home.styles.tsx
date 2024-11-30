import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

export default StyleSheet.create({
  background: {
    position: 'absolute',
    width: '50%',
    height: '50%',
    right: 0,
  },
  container: {
    flex: 1,
  },
  containerImage: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  containerList: {
    flex: 2,
  },
  imageCenter: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
    color: colors.textPrimary,
  },
  itemsList: {
    paddingBottom: 100,
    paddingTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  addBtn: {
    position: 'absolute',
    right: 20,
    bottom: 50,
    backgroundColor: colors.primaryButton,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  addBtnText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  wifiSelectorBtn: {
    position: 'absolute',
    left: 20,
    top: 50,
    backgroundColor: colors.background,
    borderRadius: 50,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    zIndex: 9,
  },
  emptyListText: {
    paddingTop: 20,
    marginBottom: 20,
    fontSize: 15,
    textAlign: 'left',
    color: colors.textGrey,
  },
});
