import {
  ActivityIndicator,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Colors,
  FONTS,
  defaultCity,
  phoneNumberIndiaRegex,
} from '@utils/Constants';
import {Form, FormEnum} from './types';
import React, {FC, useState} from 'react';

import BottomSheet from '../bottomsheet';
import ClearInputButton from '../clearInputButton';
import FormInput from './FormInput';
import {useAppSelector} from '@store/hooks';
import {useKeyboardState} from 'react-native-keyboard-controller';
import {useUpdateUser} from './hooks';

interface Props {
  open: boolean;
  onClose: () => void;
}

const AddressSheet: FC<Props> = ({open, onClose}) => {
  const {updateUser, updateUserLoading} = useUpdateUser();
  const user = useAppSelector(gState => gState.auth.user);
  const defaultAddress = user?.address?.[0];
  const defaultPhone = user?.phone || '';
  let isEditMode = Boolean(user);
  const {height: keyboardHeight} = useKeyboardState();

  const [form, setForm] = useState<Form>({
    phone: {value: user?.phone || '', error: ''},
    street: {value: defaultAddress?.street || '', error: ''},
    landmark: {value: defaultAddress?.landmark || '', error: ''},
    area: {value: defaultAddress?.area || '', error: ''},
    city: {value: defaultAddress?.city || defaultCity, error: ''},
    zipCode: {value: String(defaultAddress?.zipCode || ''), error: ''},
  });

  const validate = (key: FormEnum, value: string) => {
    switch (key) {
      case FormEnum.zipCode:
        if (isNaN(Number(value)) || value?.length !== 6) {
          return 'Invalid pin code';
        }
        break;
      case FormEnum.phone:
        if (!phoneNumberIndiaRegex.test(value)) {
          return 'Invalid phone number';
        }
        break;
      default:
        if (value?.length < 3) {
          return 'Enter at least 3 characters';
        }
        break;
    }
  };

  const handleSubmit = async () => {
    let prevent = false;
    const updatedUserAddress: any = {};
    const updatedForm: any = {...form};

    Object.keys(form).forEach(item => {
      const formValue = form[item as FormEnum];

      if (formValue.error || !formValue.value) {
        prevent = true;
      }

      updatedUserAddress[item as FormEnum] = formValue.value;

      updatedForm[item as FormEnum] = {
        value: formValue.value,
        error: validate(item as FormEnum, formValue.value),
      };
    });

    setForm(updatedForm);

    if (prevent) {
      return;
    }
    Keyboard.dismiss();

    await updateUser({
      phone: updatedUserAddress.phone,
      address: [
        {
          ...updatedUserAddress,
          zipCode: Number(updatedUserAddress[FormEnum.zipCode]),
          phone: undefined,
        },
      ],
    });

    onClose();
  };

  const onChange = (key: FormEnum, value: string) => {
    setForm(prev => ({
      ...prev,
      [key]: {value, error: validate(key, value)},
    }));
  };

  return (
    <BottomSheet open={open} onClose={onClose}>
      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {isEditMode ? 'Update' : 'Add'} your details
          </Text>
          <ClearInputButton onClear={onClose} />
        </View>
        <Text style={styles.note}>
          Note: We currently process orders only from and around{' '}
          <Text style={styles.area}>Vasna, Bhayli and Atladara</Text>.
        </Text>

        <FormInput
          id={FormEnum.phone}
          header="Phone Number"
          value={form.phone.value}
          error={form.phone.error}
          handleChange={onChange}
          placeholder="0123456789"
          defaultValue={defaultPhone}
        />
        <FormInput
          header="Street (Address Line No. 1)"
          id={FormEnum.street}
          value={form.street.value}
          error={form.street.error}
          handleChange={onChange}
          placeholder="Apt/flat no, society or street name..."
          defaultValue={defaultAddress?.street || ''}
        />
        <FormInput
          header="Landmark (Address Line No. 2)"
          id={FormEnum.landmark}
          value={form.landmark.value}
          error={form.landmark.error}
          handleChange={onChange}
          placeholder="Near ABC society/mall..."
          defaultValue={defaultAddress?.landmark || ''}
        />
        <FormInput
          header="Area"
          id={FormEnum.area}
          value={form.area.value}
          error={form.area.error}
          handleChange={onChange}
          placeholder="Bhayli, Atladara, Vasna"
          defaultValue={defaultAddress?.area || ''}
        />
        <View style={styles.form}>
          <FormInput
            header="Pin code"
            id={FormEnum.zipCode}
            value={form.zipCode.value}
            error={form.zipCode.error}
            handleChange={onChange}
            placeholder="eg. 390001"
            defaultValue={String(defaultAddress?.zipCode) || ''}
          />
          <FormInput
            header="City"
            id={FormEnum.city}
            value={form.city.value}
            error={form.city.error}
            readOnly
            defaultValue={defaultCity}
          />
        </View>

        <TouchableOpacity
          disabled={updateUserLoading}
          onPress={handleSubmit}
          style={styles.confirm}>
          <Text style={styles.confirmText}>Confirm</Text>
          {updateUserLoading && (
            <ActivityIndicator
              size="small"
              color={Colors.text}
              style={styles.loader}
            />
          )}
        </TouchableOpacity>
        {keyboardHeight ? <View style={styles.footer} /> : <></>}
      </ScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  scrollView: {padding: 20},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: FONTS.heading,
    fontWeight: '700',
    color: Colors.text,
    fontSize: 20,
    textAlign: 'center',
    flex: 1,
    marginRight: -25,
  },
  note: {
    fontFamily: FONTS.heading,
    fontWeight: '500',
    color: Colors.text,
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    lineHeight: 22,
  },
  area: {fontWeight: '900'},
  form: {flexDirection: 'row', gap: 10},
  confirm: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 10,
    minHeight: 42,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  confirmText: {
    fontFamily: FONTS.heading,
    fontWeight: '700',
    color: Colors.text,
    fontSize: 16,
    textAlign: 'center',
  },
  loader: {marginLeft: 10},
  footer: {height: 30},
});

export default AddressSheet;
