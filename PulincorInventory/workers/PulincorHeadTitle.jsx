import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { head } from "../merchandise/PulincorStyles";
import { backArrow } from "../merchandise/pulincorImgs";

const PulincorHeadTitle = ({ title, side }) => {
    const navigation = useNavigation();

    return (
        <View style={head.container}>
            {side && (
                <TouchableOpacity
                    style={{marginRight: 8}}
                    onPress={() => navigation.goBack()}>
                    <Image
                        source={backArrow}
                        style={head.backIcon} />
                </TouchableOpacity>
            )}
            <Text style={
                {
                    fontWeight: side ? '600' : '800',
                    color: '#fff',
                    fontSize: side ? 20 : 24
                }
            }>
                {title}
            </Text>
        </View>
    )
};

export default PulincorHeadTitle;