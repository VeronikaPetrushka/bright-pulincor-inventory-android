import React, { useState, useCallback } from "react";
import { View, ScrollView, Image, Text, TouchableOpacity, TextInput } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import PulincorHeadTitle from "../workers/PulincorHeadTitle";
import { pulincorDecor, addIcon, plusBtn, minusBtn } from "../merchandise/pulincorImgs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { decor, createForm, card } from "../merchandise/PulincorStyles";
import DateTimePicker from "@react-native-community/datetimepicker";
import { launchImageLibrary } from "react-native-image-picker";

const PulincorSalesCreate = ({ sale }) => {
    const navigation = useNavigation();
    const [status, setStatus] = useState(sale?.status || null)
    const [cover, setCover] = useState(sale?.cover || null);
    const [commentary, setCommentary] = useState(sale?.commentary || null);
    const [color, setColor] = useState(sale?.color || null);
    const [productname, setProductname] = useState(sale?.productname || null);
    const [quantity, setQuantity] = useState(sale?.quantity || 0);
    const [pulincorWarehouseArrivals, setPulincorWarehouseArrivals] = useState([]);
    const [selectedArrival, setSelectedArrival] = useState(sale?.arrival || null)

    useFocusEffect(
        useCallback(() => {
            loadArrivals();
        }, [])
    );

    const loadArrivals = async () => {
        try {
            const stored = await AsyncStorage.getItem("pulincorWarehouseArrivals");
            if (stored !== null) {
                const parsed = JSON.parse(stored);
                setPulincorWarehouseArrivals(parsed);
            }
        } catch (error) {
            console.error("Failed to load arrivals from storage:", error);
        }
    };

    const parseDate = (date) => {
        if (typeof date === 'string') {
            const dateObject = new Date(date);
            return isNaN(dateObject.getTime()) ? new Date(date.split('.').reverse().join('-')) : dateObject;
        }
        return new Date(date);
    };

    const [date, setDate] = useState(sale && parseDate(sale?.date) || new Date());

    const uploadArrivalCover = async () => {
        const result = await launchImageLibrary({ mediaType: 'photo', quality: 0.7 });
        if (!result.didCancel && result.assets?.length > 0) {
            setCover(result.assets[0].uri);
        }
    };

    const selectedArrivalData = pulincorWarehouseArrivals.find(a => a.id === selectedArrival);
    const selectedArrivalQuantity = selectedArrivalData?.quantity ?? 0;

    const addPulincorArrival = async () => {
        try {
            const storedSales = await AsyncStorage.getItem("pulincorSalesItems");
            const sales = storedSales ? JSON.parse(storedSales) : [];

            const storedArrivals = await AsyncStorage.getItem("pulincorWarehouseArrivals");
            const arrivals = storedArrivals ? JSON.parse(storedArrivals) : [];

            const selectedArrivalData = arrivals.find(a => a.id === selectedArrival);
            if (!selectedArrivalData || quantity > selectedArrivalData.quantity) {
                alert("Selected quantity exceeds available stock.");
                return;
            }

            const formatDate = (d) => {
                const day = String(d.getDate()).padStart(2, '0');
                const month = String(d.getMonth() + 1).padStart(2, '0');
                const year = d.getFullYear();
                return `${day}.${month}.${year}`;
            };

            const newSale = {
                id: sale?.id || Date.now(),
                status,
                cover,
                color,
                commentary,
                productname,
                quantity,
                date: formatDate(date),
                arrival: selectedArrivalData
            };

            const updatedArrivals = arrivals.map(arrival => {
                if (arrival.id === selectedArrival) {
                    return { ...arrival, quantity: arrival.quantity - quantity };
                }
                return arrival;
            });

            const updatedSales = sale
                ? sales.map(item => item.id === sale.id ? newSale : item)
                : [newSale, ...sales];

            await AsyncStorage.setItem("pulincorWarehouseArrivals", JSON.stringify(updatedArrivals));
            await AsyncStorage.setItem("pulincorSalesItems", JSON.stringify(updatedSales));

            navigation.navigate('PulincorSales');
        } catch (error) {
            console.error("Failed to save sale:", error);
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <PulincorHeadTitle title={sale ? 'Edit sale' : 'New sale'} side={true} />

            <ScrollView style={{ width: '100%', paddingHorizontal: 16 }}>
                <View style={{ paddingHorizontal: 48 }}>
                    <Image source={pulincorDecor} style={decor.empty} />
                </View>

                {
                    pulincorWarehouseArrivals.length > 0 ? (
                        <View style={{ width: '100%' }}>
                            
                             <View style={{width: '100%', height: 170, marginBottom: 12}}>
                                <ScrollView horizontal>
                                    {
                                        pulincorWarehouseArrivals.map((item, idx) => (
                                            <View key={idx} style={[card.card, {width: 350, marginRight: 5}]}>
                                                <Image
                                                    source={{ uri: item.cover }}
                                                    style={card.cover}
                                                />
                                                <View style={{width: '58%', height: '100%'}}>
                                                    <Text style={card.title} numberOfLines={1} ellipsizeMode="tail">{item.productname}</Text>
                                                    <Text style={card.quantity}>{item.quantity} pcs in stock</Text>
                                                    <TouchableOpacity
                                                        style={[card.readBtn, selectedArrival === item.id && {backgroundColor: '#d9490b'}]}
                                                        onPress={() => selectedArrival === item.id ?
                                                            setSelectedArrival(null)
                                                            : setSelectedArrival(item.id)
                                                        }
                                                    >
                                                        <Text style={card.readBtnText}>{selectedArrival === item.id ? 'Current' : 'Select'}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        ))
                                    }
                                </ScrollView>
                            </View>
                            
                            <Text style={createForm.label}>Date</Text>
                            <DateTimePicker 
                                value={sale ? new Date(date) : date} 
                                mode="date" 
                                display="spinner" 
                                themeVariant="dark"
                                onChange={(event, selectedDate) => {
                                    if (selectedDate) setDate(selectedDate);
                                }} 
                                style={{alignSelf: 'center'}}
                            />

                            <Text style={createForm.label}>Cover</Text>
                            <TouchableOpacity
                                style={createForm.coverContainer}
                                onPress={uploadArrivalCover}
                            >
                                <Image
                                    source={cover ? { uri: cover } : addIcon}
                                    style={[cover ? createForm.cover : createForm.addIcon]}
                                />
                            </TouchableOpacity>

                            <Text style={createForm.label}>Product</Text>
                            <TextInput
                                style={createForm.input}
                                value={productname}
                                onChangeText={setProductname}
                                placeholder="Enter description"
                                placeholderTextColor='rgba(255, 255, 255, 0.5)'
                            />

                            <Text style={createForm.label}>Color</Text>
                            <TextInput
                                style={createForm.input}
                                value={color}
                                onChangeText={setColor}
                                placeholder="Enter color"
                                placeholderTextColor='rgba(255, 255, 255, 0.5)'
                            />

                            <Text style={createForm.label}>Quantity</Text>
                            <View style={createForm.row}>
                                <TouchableOpacity
                                    style={[{ marginRight: 8 }, (selectedArrivalData && quantity === selectedArrivalData.quantity) && {opacity: 0.5}]}
                                    onPress={() => {
                                        if (selectedArrivalData && quantity < selectedArrivalData.quantity) {
                                            setQuantity(prev => prev + 1);
                                        }
                                    }}
                                >
                                    <Image source={plusBtn} style={createForm.quantityBtn} />
                                </TouchableOpacity>
                                <Text style={createForm.quantityText}>{quantity}</Text>
                                <TouchableOpacity
                                    style={{ marginLeft: 8, opacity: quantity < 1 ? 0.5 : 1 }}
                                    onPress={() => setQuantity((prev) => prev - 1)}
                                    disabled={quantity < 1}
                                >
                                    <Image source={minusBtn} style={createForm.quantityBtn} />
                                </TouchableOpacity>
                            </View>

                            <Text style={createForm.label}>Payment status</Text>
                            <View style={createForm.row}>
                                {
                                    ['Paid', 'Awaiting payment'].map((st, idx) => (
                                        <TouchableOpacity
                                            key={idx}
                                            style={[createForm.categoryBtn, status === st && {backgroundColor: '#F301F3'}]}
                                            onPress={() => status === st ? setStatus(null) : setStatus(st)}
                                        >
                                            <Text style={[createForm.categoryBtnText,
                                                status === st && { fontWeight: '800' }]}
                                            >{st}</Text>
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>

                            <Text style={createForm.label}>Commentary</Text>
                            <TextInput
                                style={[createForm.input, {minHeight: 100}]}
                                value={commentary}
                                onChangeText={setCommentary}
                                placeholder="Enter description"
                                placeholderTextColor='rgba(255, 255, 255, 0.5)'
                                multiline
                            />

                            <TouchableOpacity
                                style={[
                                    createForm.doneBtn,
                                    (!productname || !status || !cover || !quantity || quantity > selectedArrivalQuantity) && { backgroundColor: 'rgba(180, 41, 196, 0.25)' }
                                ]}
                                onPress={addPulincorArrival}
                                disabled={!productname || !status || !cover || !quantity || quantity > selectedArrivalQuantity}
                            >
                                <Text style={[
                                    createForm.doneBtnText,
                                    (!productname || !status || !cover || !quantity || quantity > selectedArrivalQuantity) && { color: '#B429C4' }
                                ]}>Done</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                            <View style={{ width: '100%' }}>
                                <Text style={decor.emptyText}>There are no arrivals here, you can add them now</Text>
                                <TouchableOpacity
                                    style={[createForm.doneBtn, {marginTop: 30}]}
                                    onPress={() => navigation.navigate('PulincorArrivalsCreate')}
                                >
                                    <Text style={createForm.doneBtnText}>Create an object</Text>
                                </TouchableOpacity>
                            </View>
                    )
                }

                <View style={{ minHeight: 100 }} />
            </ScrollView>

        </View>
    )
};

export default PulincorSalesCreate;