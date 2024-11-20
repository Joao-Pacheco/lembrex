import { StyleSheet } from 'react-native';
import colors from '../../../../constants/colors';

export default StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '90%',
    margin: 20,
    backgroundColor: colors.background,
    borderRadius: 4,
    padding: 25,
    alignItems: 'center',
    shadowColor: colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  addItemInput: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    fontSize: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 4,
    borderWidth: 0,
  },
  modalMessage: {
    marginBottom: 20,
    fontSize: 15,
    textAlign: 'left',
    color: colors.textGrey,
  },
  button: {
    backgroundColor: colors.primaryButton,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: colors.primaryButton,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: colors.textWhite,
  },
  secondaryButton: {},
  secondaryButtonText: {
    color: colors.textGrey,
    textAlignVertical: 'center',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
