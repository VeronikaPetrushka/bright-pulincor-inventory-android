import { View, ScrollView, Image, Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PulincorHeadTitle from "../workers/PulincorHeadTitle";
import { editBtn, deleteIcon } from "../merchandise/pulincorImgs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { decor, details } from "../merchandise/PulincorStyles";

const PulincorArrivalDetails = ({ item }) => {
    const navigation = useNavigation();

    const deleteArrival = async () => {
        Alert.alert(
            "Delete Arrival",
            "Are you sure you want to delete this item?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete", style: "destructive", onPress: async () => {
                        try {
                            const stored = await AsyncStorage.getItem("pulincorWarehouseArrivals");
                            const arrivals = stored ? JSON.parse(stored) : [];

                            const updated = arrivals.filter(arrival => arrival.id !== item.id);
                            await AsyncStorage.setItem("pulincorWarehouseArrivals", JSON.stringify(updated));

                            navigation.goBack();
                        } catch (error) {
                            console.error("Failed to delete arrival:", error);
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
                onPress={deleteArrival}
            >
                <Image
                    source={deleteIcon}
                    style={details.deleteIcon}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={details.editBtn}
                onPress={() => navigation.navigate('PulincorArrivalsCreate', {item})}
            >
                <Image
                    source={editBtn}
                    style={decor.toolBtn}
                />
            </TouchableOpacity>

            <ScrollView style={{ width: '100%', paddingHorizontal: 16 }}>

                <Image source={{ uri: item.cover }} style={details.cover} />
                
                <Text style={details.title}>{item.productname}</Text>

                <Text style={details.label}>Date</Text>
                <Text style={details.value}>{item.date}</Text>

                <Text style={details.label}>Size</Text>
                <Text style={details.value}>{item.size} cm</Text>

                <Text style={details.label}>Color</Text>
                <Text style={details.value}>{item.color}</Text>

                <Text style={details.label}>Supplier</Text>
                <Text style={details.value}>{item.supplier}</Text>

                <Text style={details.label}>Quiantity</Text>
                <Text style={details.value}>{item.quantity}</Text>

                <View style={{ minHeight: 100}} />
            </ScrollView>

        </View>
    )
};

export default PulincorArrivalDetails;