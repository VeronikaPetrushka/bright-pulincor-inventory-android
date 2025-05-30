import React, { useEffect, useState } from "react";
import { View, ScrollView, Image, Text, Switch, Linking, TouchableOpacity } from "react-native";
import PulincorHeadTitle from "../workers/PulincorHeadTitle";
import { pulincorDecor, notifications, privacy, backArrow } from "../merchandise/pulincorImgs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createForm, decor, settings } from "../merchandise/PulincorStyles";

const PulincorSettings = () => {
    const [ordersEnabled, setOrdersEnabled] = useState(false);
    const [remindersEnabled, setRemindersEnabled] = useState(false);

    useEffect(() => {
        const loadSettings = async () => {
            const orders = await AsyncStorage.getItem('ordersEnabled');
            const reminders = await AsyncStorage.getItem('remindersEnabled');
            if (orders !== null) setOrdersEnabled(orders === 'true');
            if (reminders !== null) setRemindersEnabled(reminders === 'true');
        };
        loadSettings();
    }, []);

    const toggleOrders = async () => {
        const newValue = !ordersEnabled;
        setOrdersEnabled(newValue);
        await AsyncStorage.setItem('ordersEnabled', String(newValue));
    };

    const toggleReminders = async () => {
        const newValue = !remindersEnabled;
        setRemindersEnabled(newValue);
        await AsyncStorage.setItem('remindersEnabled', String(newValue));
    };

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <PulincorHeadTitle title={'Settings'} side={false} />

            <ScrollView style={{ width: '100%' }}>
                <View style={{width: '100%', paddingHorizontal: 64, marginTop: 45}}>
                    <Image source={pulincorDecor} style={decor.empty} />
                </View>

                <View style={[
                    createForm.row,
                    {
                        borderBottomWidth: 0.3,
                        borderBottomColor: 'rgba(255, 255, 255, 0.5)',
                        paddingBottom: 17,
                        paddingHorizontal: 20
                    }
                ]}
                >
                    <Image
                        source={notifications}
                        style={settings.notifIcon}
                    />
                    <Text style={settings.title}>Manage Notifications</Text>
                </View>

                <View style={[
                    createForm.row,
                    {
                        borderBottomWidth: 0.3,
                        borderBottomColor: 'rgba(255, 255, 255, 0.5)',
                        paddingBottom: 17,
                        paddingHorizontal: 20
                    }
                ]}
                >
                    <Text style={settings.title}>Orders</Text>
                    <Switch
                        style={{ position: 'absolute', top: 2, right: 16 }}
                        value={ordersEnabled}
                        onValueChange={toggleOrders}
                        trackColor={{ false: '#767577', true: '#F301F3' }}
                        thumbColor={ordersEnabled ? '#fff' : '#fff'}
                    />
                </View>
                <View style={[
                    createForm.row,
                    {
                        borderBottomWidth: 0.3,
                        borderBottomColor: 'rgba(255, 255, 255, 0.5)',
                        paddingBottom: 17,
                        paddingHorizontal: 20
                    }
                ]}
                >
                    <Text style={settings.title}>Reminders</Text>
                    <Switch
                        style={{ position: 'absolute', top: 2, right: 16 }}
                        value={remindersEnabled}
                        onValueChange={toggleReminders}
                        trackColor={{ false: '#767577', true: '#F301F3' }}
                        thumbColor={ordersEnabled ? '#fff' : '#fff'}
                    />
                </View>

                <View style={[
                    createForm.row,
                    {
                        borderBottomWidth: 0.3,
                        borderBottomColor: 'rgba(255, 255, 255, 0.5)',
                        paddingBottom: 17,
                        paddingHorizontal: 20
                    }
                ]}
                >
                    <Image
                        source={privacy}
                        style={settings.notifIcon}
                    />
                    <Text style={settings.title}>Privacy Policy</Text>
                    <TouchableOpacity
                        style={{position: 'absolute', top: 2, right: 0}}
                        onPress={() => Linking.openURL('https://www.termsfeed.com/live/730f7e6e-6f81-4eae-ab04-e4d0796d107d')}
                    >
                        <Image
                            source={backArrow}
                            style={[settings.notifIcon, { transform: [{ rotate: '180deg' }] }]}
                        />
                    </TouchableOpacity>
                </View>

                <View style={{height: 300}} />
            </ScrollView>
            
        </View>
    )
};

export default PulincorSettings;