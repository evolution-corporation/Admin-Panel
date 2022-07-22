import React, { useEffect, useState } from "react";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "~styles";

import NumberInput from "~components/NumberInput";
import SMSCodeInput, {
  SMSCodeInputInfo,
  SMSCodeInputInfoShow,
} from "~components/SMSCodeInput";
import { addHiddenCAPTCHA, requestSMSCode } from "~api/user";

const SelectMethodAuthorizationScreen: FC<
  AuthorizationStackScreenProps<"SelectMethodAuthorization">
> = ({}) => {
  const [numberPhone, setNumberPhone] = useState<string>("");
  const [isValidate, setIsValidate] = useState<boolean>(false);
  const [isSMSCodInput, setIsSMScodeInput] = useState<boolean>(false);
  const [statusSMSCode, setStatusSMSCode] = useState<SMSCodeInputInfoShow>(
    SMSCodeInputInfoShow.loadingIndicator
  );
  const numberInput = (number: string, isValidate: boolean) => {
    setNumberPhone(number);
    setIsValidate(isValidate);
  };
  const getSMSCode = () => {
    if (isValidate) {
      setIsSMScodeInput(true);
    }
  };

  useEffect(() => {
    addHiddenCAPTCHA();
  }, [setIsSMScodeInput]);

  return (
    <LinearGradient style={styles.background} colors={["#242582", "#870000"]}>
      <View style={styles.methodAuthentication}>
        <Text variant={"headlineMedium"}>Вход по номеру телефона</Text>
        <View style={styles.numberInput}>
          <NumberInput
            autoFocus={true}
            defaultCode={"RU"}
            onChange={numberInput}
          />

          <Button
            mode={"contained"}
            compact
            textColor="#fff"
            style={{ marginLeft: "20px" }}
            onPress={getSMSCode}
          >
            Получить код
          </Button>
        </View>
      </View>
    </LinearGradient>
  );
};

export default SelectMethodAuthorizationScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  methodAuthentication: {
    backgroundColor: colors.white,
    paddingHorizontal: "100px",
    paddingVertical: "50px",
    borderRadius: 20,
    minWidth: "40%",
    minHeight: "40%",
    alignItems: "center",
    justifyContent: "center",
  },
  numberInput: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "25px",
  },
});
