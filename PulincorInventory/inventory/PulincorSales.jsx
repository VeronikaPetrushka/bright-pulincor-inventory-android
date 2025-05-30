import React, { useEffect, useState, useCallback } from "react";
import { View, ScrollView, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import PulincorHeadTitle from "../workers/PulincorHeadTitle";
import { pulincorDecor, pulincorCreate, pulincorFilter } from "../merchandise/pulincorImgs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { decor, card, createForm, filter } from "../merchandise/PulincorStyles";
import DateTimePicker from "@react-native-community/datetimepicker";

const PulincorSales = () => {
    const navigation = useNavigation();
    const [pulincorSalesItems, setPulincorSalesItems] = useState([]);
    const [salesFilterOpen, setSalesFilterOpen] = useState(false);
    const [filterDate, setFilterDate] = useState(new Date());
    const [filterStatus, setFilterStatus] = useState(null);
    const [filteredSales, setFilteredSales] = useState([]);
    const [filterApplied, setFilterApplied] = useState(false);

    useFocusEffect(
        useCallback(() => {
            loadSales();
        }, [])
    );

    useEffect(() => {
        loadSales();
    }, [pulincorSalesItems]);

    const loadSales = async () => {
        try {
            const stored = await AsyncStorage.getItem("pulincorSalesItems");
            if (stored !== null) {
                const parsed = JSON.parse(stored);
                setPulincorSalesItems(parsed);
                setFilteredSales(parsed);
            }
        } catch (error) {
            console.error("Failed to load sales from storage:", error);
        }
    };

    const parseDate = (date) => {
        if (typeof date === 'string') {
            const dateObject = new Date(date);
            return isNaN(dateObject.getTime()) ? new Date(date.split('.').reverse().join('-')) : dateObject;
        }
        return new Date(date);
    };

    const formatDate = (dateObj) => {
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year = dateObj.getFullYear();
        return `${day}.${month}.${year}`;
    };

    const applySalesFilter = () => {
        const targetDateStr = formatDate(filterDate);

        const results = pulincorSalesItems.filter(item => {
            const itemDateStr = typeof item.date === 'string' ? item.date : formatDate(parseDate(item.date));
            const matchesDate = itemDateStr === targetDateStr;

            const matchesStatus = filterStatus ? item.status === filterStatus : true;

            return matchesDate && matchesStatus && matchesSupplier;
        });

        setFilteredSales(results);
        setSalesFilterOpen(false);
        setFilterApplied(true);
    };

    const clearWarehouseFilter = () => {
        setFilteredSales(pulincorSalesItems);
        setSalesFilterOpen(false);
        setFilterApplied(false);
    }

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <PulincorHeadTitle title={'Sales'} side={false} />

            {
                filteredSales.length > 0 ? (
                    <ScrollView style={{ width: '100%', paddingHorizontal: 16 }}>
                        {
                            filteredSales.map((item, idx) => (
                                <View key={idx} style={card.card}>
                                    <Image
                                        source={{ uri: item.cover }}
                                        style={card.cover}
                                    />
                                    <View style={{ width: '58%', height: '100%', justifyContent: 'space-between' }}>
                                        {
                                            item.status && (
                                                <View style={card.statusBox}>
                                                    <Text style={card.status}>{item.status}</Text>
                                                </View>
                                            )
                                        }
                                        <Text style={[card.title, {marginBottom: 0}]} numberOfLines={1} ellipsizeMode="tail">{item.productname}</Text>
                                        <Text style={[card.quantity, {marginBottom: 0}]}>{item.date}</Text>
                                        <Text style={[card.quantity, {marginBottom: 0}]}>{item.quantity} pcs</Text>
                                        <TouchableOpacity
                                            style={card.readBtn}
                                            onPress={() => navigation.navigate('PulincorSaleDetails', {item})}
                                        >
                                            <Text style={card.readBtnText}>Read more</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))
                        }
                        <View style={{width: '100%', paddingHorizontal: 48, marginTop: 40}}>
                            <Image source={pulincorDecor} style={decor.empty} />
                        </View>
                        <View style={{height: 300}} />
                    </ScrollView>
                ) : (
                        <View style={{width: '100%', flexGrow: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 64}}>
                            <Image source={pulincorDecor} style={decor.empty} />
                            <Text style={decor.emptyText}>There are no sales here yet, you can add them now</Text>
                        </View>
                )
            }

            <View style={decor.toolsContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('PulincorSalesCreate')}
                >
                    <Image
                        source={pulincorCreate}
                        style={[decor.toolBtn, { marginBottom: 16 }]}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setSalesFilterOpen(true)}
                >
                    <Image
                        source={pulincorFilter}
                        style={decor.toolBtn}
                    />
                </TouchableOpacity>
            </View>

            {
                salesFilterOpen && (
                    <View style={filter.container}>
                        <TouchableOpacity
                            style={filter.btn}
                            onPress={() => setSalesFilterOpen(false)}
                        >
                            
                            </TouchableOpacity>

                        <Text style={filter.title}>Filters</Text>

                        <Text style={createForm.label}>Date</Text>
                        <DateTimePicker 
                            value={filterDate ? new Date(filterDate) : filterDate} 
                            mode="date" 
                            display="spinner" 
                            themeVariant="dark"
                            onChange={(event, selectedDate) => {
                                if (selectedDate) setFilterDate(selectedDate);
                            }} 
                            style={{alignSelf: 'center'}}
                        />

                        <Text style={createForm.label}>Payment status</Text>
                        <View style={createForm.row}>
                            {
                                ['Paid', 'Awaiting payment'].map((st, idx) => (
                                    <TouchableOpacity
                                        key={idx}
                                        style={[createForm.categoryBtn, filterStatus === st && {backgroundColor: '#F301F3'}]}
                                        onPress={() => filterStatus === st ? setFilterStatus(null) : setFilterStatus(st)}
                                    >
                                        <Text style={[createForm.categoryBtnText,
                                            filterStatus === st && { fontWeight: '800' }]}
                                        >{st}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>

                        <TouchableOpacity
                            style={createForm.doneBtn}
                            onPress={applySalesFilter}
                        >
                            <Text style={createForm.doneBtnText}>Done</Text>
                        </TouchableOpacity>

                        {
                            (filterApplied) && (
                                <TouchableOpacity
                                    style={[createForm.doneBtn, {backgroundColor: '#d9490b', marginTop: 5}]}
                                    onPress={clearWarehouseFilter}
                                >
                                    <Text style={createForm.doneBtnText}>Clear filter</Text>
                                </TouchableOpacity>
                            )
                        }

                    </View>
                )
            }
            
        </View>
    )
};

export default PulincorSales;