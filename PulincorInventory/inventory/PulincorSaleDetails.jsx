import { View, ScrollView, Image, Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PulincorHeadTitle from "../workers/PulincorHeadTitle";
import { editBtn, deleteIcon } from "../merchandise/pulincorImgs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { decor, details, createForm } from "../merchandise/PulincorStyles";

const PulincorSaleDetails = ({ item }) => {
    const navigation = useNavigation();

        const deleteSale = async () => {
        Alert.alert(
            "Delete Sale",
            "Are you sure you want to delete this item?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete", style: "destructive", onPress: async () => {
                        try {
                            const stored = await AsyncStorage.getItem("pulincorSalesItems");
                            const sales = stored ? JSON.parse(stored) : [];

                            const updated = sales.filter(sale => sale.id !== item.id);
                            await AsyncStorage.setItem("pulincorSalesItems", JSON.stringify(updated));

                            navigation.goBack();
                        } catch (error) {
                            console.error("Failed to delete sale:", error);
                        }
                    }
                }
            ]
        );
    };

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <PulincorHeadTitle title={'Info'} side={true} />

            <TouchableOpacity
                style={details.deleteBtn}
                onPress={deleteSale}
            >
                <Image
                    source={deleteIcon}
                    style={details.deleteIcon}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={details.editBtn}
                onPress={() => navigation.navigate('PulincorSalesCreate', {item})}
            >
                <Image
                    source={editBtn}
                    style={decor.toolBtn}
                />
            </TouchableOpacity>

            <ScrollView style={{ width: '100%', paddingHorizontal: 16 }}>

                <Image source={{ uri: item.cover }} style={details.cover} />

                <View style={[
                    createForm.categoryBtn,
                    { backgroundColor: '#F301F3', marginBottom: 12 }
                ]}>
                    <Text style={[createForm.categoryBtnText, {textAlign: 'center'}]}>{item.status}</Text>
                </View>
                
                <Text style={details.title}>{item.productname}</Text>

                <Text style={details.label}>Date</Text>
                <Text style={details.value}>{item.date}</Text>

                <Text style={details.label}>Quiantity</Text>
                <Text style={details.value}>{item.quantity}</Text>

                <Text style={details.label}>Commentary</Text>
                <Text style={details.value}>{item.commentary}</Text>

                <View style={{ minHeight: 100}} />
            </ScrollView>

        </View>
    )
};

export default PulincorSaleDetails;