import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import Colors from '@/constants/Colors';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo';

const CELL_COUNT = 6;

export default function Page() {
    const {phone, signin} = useLocalSearchParams<{phone: string, signin: string}>();
    const [code, setCode] = useState('');
    const ref = useBlurOnFulfill({value: code, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
      value: code,
      setValue: setCode,
    });
    const { signUp, setActive} = useSignUp();
    const {signIn} = useSignIn();

    useEffect(() => {
      if(code.length === 6) {
        if(signin === 'true') {
          verifySignIn();
        } else {
          verifyCode();
        }
      }
    }, [code])

    const verifyCode = async() => {
      try {
        await signUp!.attemptPhoneNumberVerification({
          code,
        })
        await setActive!({ session: signUp!.createdSessionId })
      } catch (err: any) {
        console.error(JSON.stringify(err, null, 2));
        if(isClerkAPIResponseError(err)) {
          Alert.alert('Error', err.errors[0].message);
        }
      }
    };

    const verifySignIn = async() => {
      try {
        await signIn!.attemptFirstFactor({
          strategy: 'phone_code',
          code,
        });
        await setActive!({ session: signIn!.createdSessionId });
      } catch (err) {
        console.log(err);
        if(isClerkAPIResponseError(err)) {
          Alert.alert('Error', err.errors[0].message);
        }
      }
    };
    
    const resendCode = async () => {
      try {
        if (signin === 'true') {
          const { supportedFirstFactors } = await signIn!.create({
            identifier: phone,
          });
  
          const firstPhoneFactor: any = supportedFirstFactors?.find((factor: any) => {
            return factor.strategy === 'phone_code';
          });
  
          const { phoneNumberId } = firstPhoneFactor;
  
          await signIn!.prepareFirstFactor({
            strategy: 'phone_code',
            phoneNumberId,
          });
        } else {
          await signUp!.create({
            phoneNumber: phone,
          });
          const res = await signUp!.preparePhoneNumberVerification();
          console.log("resend code ", res);
          
        }
      } catch (err) {
        console.log('error', JSON.stringify(err, null, 2));
        if (isClerkAPIResponseError(err)) {
          Alert.alert('Error', err.errors[0].message);
        }
      }
    };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{headerTitle: phone}}/>
      <Text style={styles.legal}>We have sent you an SMS with a code to the number above.</Text>
      <Text style={styles.legal}>To complete you phone number verification, Please enter the 6-digit activation code.</Text>

      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor/> : null)}
          </Text>
        )}
      />

      <TouchableOpacity style={styles.button} onPress={resendCode}>
        <Text style={styles.buttonText}>Didn't receive a verification code?</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: Colors.background,
    gap: 20
  },
  legal: {
    fontSize: 13,
    textAlign: 'center',
    color: '#000'
  },
  button: {
    width: '100%',
    marginTop: 40,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 20,
    color: Colors.primary
  },
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 45,
    height: 45,
    lineHeight: 38,
    fontSize: 28,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
    margin: 5,
    borderRadius: 7
  },
  focusCell: {
    borderColor: '#000',
  },
})