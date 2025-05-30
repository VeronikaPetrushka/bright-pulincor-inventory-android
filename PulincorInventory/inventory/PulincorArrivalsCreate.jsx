import React, { useState } from "react";
import { View, ScrollView, Image, Text, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PulincorHeadTitle from "../workers/PulincorHeadTitle";
import { pulincorDecor, addIcon, plusBtn, minusBtn } from "../merchandise/pulincorImgs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { decor, createForm } from "../merchandise/PulincorStyles";
import DateTimePicker from "@react-native-community/datetimepicker";
import { launchImageLibrary } from "react-native-image-picker";

const PulincorArrivalsCreate = ({ object }) => {
    const navigation = useNavigation();
    const [category, setCategory] = useState(object?.category || null)
    const [cover, setCover] = useState(object?.cover || null);
    const [size, setSize] = useState(object?.size || null);
    const [color, setColor] = useState(object?.color || null);
    const [supplier, setSupplier] = useState(object?.supplier || null);
    const [productname, setProductname] = useState(object?.productname || null);
    const [quantity, setQuantity] = useState(object?.quantity || 0);

    const parseDate = (date) => {
        if (typeof date === 'string') {
            const dateObject = new Date(date);
            return isNaN(dateObject.getTime()) ? new Date(date.split('.').reverse().join('-')) : dateObject;
        }
        return new Date(date);
    };

    const [date, setDate] = useState(object && parseDate(object?.date) || new Date());

    const uploadArrivalCover = async () => {
        const result = await launchImageLibrary({ mediaType: 'photo', quality: 0.7 });
        if (!result.didCancel && result.assets?.length > 0) {
            setCover(result.assets[0].uri);
        }
    };

    const addPulincorArrival = async () => {
        try {
            const stored = await AsyncStorage.getItem("pulincorWarehouseArrivals");
            const arrivals = stored ? JSON.parse(stored) : [];

            const formatDate = (d) => {
                const day = String(d.getDate()).padStart(2, '0');
                const month = String(d.getMonth() + 1).padStart(2, '0');
                const year = d.getFullYear();
                return `${day}.${month}.${year}`;
            };

            const newItem = {
                id: object?.id || Date.now(),
                category,
                cover,
                size,
                color,
                supplier,
                productname,
                quantity,
                date: formatDate(date),
            };

            let updatedArrivals;
            if (object) {
                updatedArrivals = arrivals.map(item => item.id === object.id ? newItem : item);
            } else {
                updatedArrivals = [newItem, ...arrivals];
            }

            await AsyncStorage.setItem("pulincorWarehouseArrivals", JSON.stringify(updatedArrivals));
            navigation.navigate('PulincorWarehouse');
        } catch (error) {
            console.error("Failed to save arrival:", error);
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <PulincorHeadTitle title={object ? 'Edit object' : 'New object'} side={true} />

            <ScrollView style={{ width: '100%', paddingHorizontal: 16 }}>
                <View style={{ paddingHorizontal: 48 }}>
                    <Image source={pulincorDecor} style={decor.empty} />
                </View>

                <Text style={createForm.label}>Date</Text>
                <DateTimePicker 
                    value={object ? new Date(date) : date} 
                    mode="date" 
                    display="spinner" 
                    themeVariant="dark"
                    onChange={(event, selectedDate) => {
                        if (selectedDate) setDate(selectedDate);
                    }} 
                    style={{alignSelf: 'center'}}
                />

                <Text style={createForm.label}>Product name</Text>
                <TextInput
                    style={createForm.input}
                    value={productname}
                    onChangeText={setProductname}
                    placeholder="Enter title"
                    placeholderTextColor='rgba(255, 255, 255, 0.5)'
                />

                <Text style={createForm.label}>Category</Text>
                <View style={createForm.row}>
                    {
                        ['Helium', 'Latex', 'Foil'].map((baloon, idx) => (
                            <TouchableOpacity
                                key={idx}
                                style={[createForm.categoryBtn, category === baloon && {backgroundColor: '#F301F3'}]}
                                onPress={() => category === baloon ? setCategory(null) : setCategory(baloon)}
                            >
                                <Text style={[createForm.categoryBtnText,
                                    category === baloon && { fontWeight: '800' }]}
                                >{baloon}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>

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

                <Text style={createForm.label}>Size</Text>
                <TextInput
                    style={createForm.input}
                    value={size}
                    onChangeText={setSize}
                    placeholder="Enter size in cm"
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

                <Text style={createForm.label}>Supplier</Text>
                <TextInput
                    style={createForm.input}
                    value={supplier}
                    onChangeText={setSupplier}
                    placeholder="Enter supplier"
                    placeholderTextColor='rgba(255, 255, 255, 0.5)'
                />

                <Text style={createForm.label}>Quantity</Text>
                <View style={createForm.row}>
                    <TouchableOpacity
                        style={{ marginRight: 8 }}
                        onPress={() => setQuantity((prev) => prev + 1)}
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

                <TouchableOpacity
                    style={[
                        createForm.doneBtn,
                        (!productname || !category || !cover || !quantity) && { backgroundColor: 'rgba(180, 41, 196, 0.25)' }
                    ]}
                    onPress={addPulincorArrival}
                    disabled={!productname || !category || !cover || !quantity}
                >
                    <Text style={[
                        createForm.doneBtnText,
                        (!productname || !category || !cover || !quantity) && { color: '#B429C4' }
                    ]}>Done</Text>
                </TouchableOpacity>

                <View style={{ minHeight: 100}} />
            </ScrollView>

        </View>
    )
};

export default PulincorArrivalsCreate;