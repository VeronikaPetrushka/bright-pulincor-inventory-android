import React, { useEffect, useState } from "react";
import { View, ScrollView, Image, Text } from "react-native";
import PulincorHeadTitle from "../workers/PulincorHeadTitle";
import { pulincorDecor } from "../merchandise/pulincorImgs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { decor, statistics, card, createForm } from "../merchandise/PulincorStyles";

const PulincorStatistic = () => {
    const [pulincorSalesItems, setPulincorSalesItems] = useState([]);

    useEffect(() => {
        const loadSales = async () => {
            try {
                const stored = await AsyncStorage.getItem("pulincorSalesItems");
                if (stored !== null) {
                    setPulincorSalesItems(JSON.parse(stored));
                }
            } catch (error) {
                console.error("Failed to load sales from storage:", error);
            }
        };

        loadSales();
    }, []);

    const filterSalesByRange = (days) => {
        const now = new Date();
        return pulincorSalesItems.filter(item => {
            const saleDate = new Date(item.date.split('.').reverse().join('-'));
            const diffTime = now - saleDate;
            const diffDays = diffTime / (1000 * 60 * 60 * 24);
            return diffDays <= days;
        });
    };

    const getStats = (sales) => {
        const totalSales = sales.length;
        const categoryCount = {};
        const productTotals = {};

        sales.forEach(item => {
            const category = item.arrival?.category || 'Unknown';
            categoryCount[category] = (categoryCount[category] || 0) + item.quantity;

            const product = item.productname || 'Unnamed';
            productTotals[product] = (productTotals[product] || 0) + item.quantity;
        });

        const topProducts = Object.entries(productTotals)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([name, qty]) => `${name} (${qty})`);

        return { totalSales, categoryCount, topProducts };
    };

    const dailyStats = getStats(filterSalesByRange(1));
    const weeklyStats = getStats(filterSalesByRange(7));
    const monthlyStats = getStats(filterSalesByRange(30));

    const renderStatsBlock = (title, stats) => (
        <View style={statistics.card}>
            <Text style={[card.title,
                {
                    fontWeight: '800',
                    marginBottom: 16,
                    position: 'absolute',
                    right: 16,
                    top: 16,
                    paddingVertical: 4,
                    paddingHorizontal: 12,
                    borderRadius: 12,
                    backgroundColor: '#F301F3'
                }]
            }>
                {title}
            </Text>
            <Text style={[statistics.label, {fontSize: 11, marginBottom: 16, lineHeight: 13}]}>Total number of sales</Text>
            <Text style={[card.title, { fontWeight: '900', fontSize: 35 }]}>{stats.totalSales}</Text>
            <Text style={[statistics.label, { fontSize: 14, marginBottom: 4 }]}>Category</Text>
            <View style={createForm.row}>
                {
                    Object.entries(stats.categoryCount).map(([cat, qty], idx) => (
                        <View key={idx} style={[createForm.categoryBtn, {backgroundColor: '#AE00E9'}]}>
                            <Text style={createForm.categoryBtnText}>{cat} - {qty}</Text>
                        </View>
                    ))
                }
            </View>
            <Text style={[statistics.label, {fontSize: 11, marginBottom: 6, lineHeight: 13}]}>Top-selling items:</Text>
            {
                stats.topProducts.map((prod, idx) => (
                    <Text key={idx} style={statistics.topItems}>• {prod}</Text>
                ))
            }
        </View>
    );

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <PulincorHeadTitle title={'Statistics'} side={false} />

            {
                pulincorSalesItems.length > 0 ? (
                    <ScrollView style={{ width: '100%', padding: 16 }}>
                        {renderStatsBlock("Today", dailyStats)}
                        {renderStatsBlock("This Week", weeklyStats)}
                        {renderStatsBlock("This Month", monthlyStats)}
                        <View style={{ height: 300 }} />
                    </ScrollView>
                ) : (
                        <View style={{width: '100%', flexGrow: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 64}}>
                            <Image source={pulincorDecor} style={decor.empty} />
                            <Text style={decor.emptyText}>You don't have statistics yet</Text>
                        </View>
                )
            }
        </View>
    )
};

export default PulincorStatistic;