import React, { useEffect, useState, useCallback } from "react";
import { View, ScrollView, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import PulincorHeadTitle from "../workers/PulincorHeadTitle";
import { pulincorDecor, pulincorCreate, pulincorFilter } from "../merchandise/pulincorImgs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { decor, card, filter, createForm } from "../merchandise/PulincorStyles";
import DateTimePicker from "@react-native-community/datetimepicker";

const PulincorWarehouse = () => {
    const navigation = useNavigation();
    const [pulincorWarehouseArrivals, setPulincorWarehouseArrivals] = useState([]);
    const [arrivalsFilterOpen, setArrivalsFilterOpen] = useState(false);
    const [filterDate, setFilterDate] = useState(new Date());
    const [filterCategory, setFilterCategory] = useState(null);
    const [filterBySupplier, setFilterBySupplier] = useState(null);
    const [filteredArrivals, setFilteredArrivals] = useState([]);
    const [filterApplied, setFilterApplied] = useState(false);

    useFocusEffect(
        useCallback(() => {
            loadArrivals();
        }, [])
    );

    useEffect(() => {
        loadArrivals();
    }, [pulincorWarehouseArrivals]);

    const loadArrivals = async () => {
        try {
            const stored = await AsyncStorage.getItem("pulincorWarehouseArrivals");
            if (stored !== null) {
                const parsed = JSON.parse(stored);
                setPulincorWarehouseArrivals(parsed);
                setFilteredArrivals(parsed);
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

    const formatDate = (dateObj) => {
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year = dateObj.getFullYear();
        return `${day}.${month}.${year}`;
    };

    const applyWarehouseFilter = () => {
        const targetDateStr = formatDate(filterDate);

        const results = pulincorWarehouseArrivals.filter(item => {
            const itemDateStr = typeof item.date === 'string' ? item.date : formatDate(parseDate(item.date));
            const matchesDate = itemDateStr === targetDateStr;

            const matchesCategory = filterCategory ? item.category === filterCategory : true;
            const matchesSupplier = filterBySupplier ? item.supplier === filterBySupplier : true;

            return matchesDate && matchesCategory && matchesSupplier;
        });

        setFilteredArrivals(results);
        setArrivalsFilterOpen(false);
        setFilterApplied(true);
    };

    const clearWarehouseFilter = () => {
        setFilteredArrivals(pulincorWarehouseArrivals);
        setArrivalsFilterOpen(false);
        setFilterApplied(false);
    }

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <PulincorHeadTitle title={'Warehouse'} side={false} />

            {
                filteredArrivals.length > 0 ? (
                    <ScrollView style={{ width: '100%', paddingHorizontal: 16 }}>
                        {
                            filteredArrivals.map((item, idx) => (
                                <View key={idx} style={card.card}>
                                    <Image
                                        source={{ uri: item.cover }}
                                        style={card.cover}
                                    />
                                    <View style={{width: '58%', height: '100%'}}>
                                        <Text style={card.title} numberOfLines={1} ellipsizeMode="tail">{item.productname}</Text>
                                        <Text style={card.quantity}>{item.quantity} pcs in stock</Text>
                                        <TouchableOpacity
                                            style={card.readBtn}
                                            onPress={() => navigation.navigate('PulincorArrivalDetails', {item})}
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
                            <Text style={decor.emptyText}>There are no new arrivals here, you can add them now</Text>
                        </View>
                )
            }

            <View style={decor.toolsContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('PulincorArrivalsCreate')}
                >
                    <Image
                        source={pulincorCreate}
                        style={[decor.toolBtn, { marginBottom: 16 }]}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setArrivalsFilterOpen(true)}
                >
                    <Image
                        source={pulincorFilter}
                        style={decor.toolBtn}
                    />
                </TouchableOpacity>
            </View>

            {
                arrivalsFilterOpen && (
                    <View style={filter.container}>
                        <TouchableOpacity
                            style={filter.btn}
                            onPress={() => setArrivalsFilterOpen(false)}
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

                        <Text style={createForm.label}>Category</Text>
                        <View style={createForm.row}>
                            {
                                ['Helium', 'Latex', 'Foil'].map((baloon, idx) => (
                                    <TouchableOpacity
                                        key={idx}
                                        style={[createForm.categoryBtn, filterCategory === baloon && {backgroundColor: '#F301F3'}]}
                                        onPress={() => filterCategory === baloon ? setFilterCategory(null) : setFilterCategory(baloon)}
                                    >
                                        <Text style={[createForm.categoryBtnText,
                                            filterCategory === baloon && { fontWeight: '800' }]}
                                        >{baloon}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>

                        {
                            pulincorWarehouseArrivals.some((item) => item.supplier) && (
                                <>
                                    <Text style={createForm.label}>Supplier</Text>
                                    <View style={[createForm.row, {flexWrap: 'wrap'}]}>
                                        {
                                            pulincorWarehouseArrivals.map((item, idx) => (
                                            <TouchableOpacity
                                                key={idx}
                                                style={[createForm.categoryBtn, filterBySupplier === item.supplier && {backgroundColor: '#F301F3'}, {marginBottom: 7}]}
                                                onPress={() => filterBySupplier === item.supplier ? setFilterBySupplier(null) : setFilterBySupplier(item.supplier)}
                                            >
                                                <Text style={[createForm.categoryBtnText,
                                                    filterBySupplier === item.supplier && { fontWeight: '800' }]}
                                                >{item.supplier}</Text>
                                            </TouchableOpacity>
                                            ))
                                        }
                                    </View>
                                </>
                            )
                        }

                        <TouchableOpacity
                            style={createForm.doneBtn}
                            onPress={applyWarehouseFilter}
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

export default PulincorWarehouse;