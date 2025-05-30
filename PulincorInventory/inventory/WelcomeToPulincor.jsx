import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { pulincorLogo } from "../merchandise/pulincorImgs";

const WelcomeToPulincor = () => {
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();

        const timeout = setTimeout(() => {
            navigation.navigate("PulincorWarehouse");
        }, 1300);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Animated.Image
                source={pulincorLogo}
                style={{
                    width: "100%",
                    height: 500,
                    resizeMode: "contain",
                    opacity: fadeAnim,
                }}
            />
        </View>
    )
};

export default WelcomeToPulincor;