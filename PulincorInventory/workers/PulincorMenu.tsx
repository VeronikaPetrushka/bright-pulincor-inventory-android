import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { panel } from '../merchandise/PulincorStyles';
import PulincorMenuInfo from '../merchandise/PulincorMenuInfo';
import usePulincorNavHandler from '../merchandise/PulincorNavigationHandler';

const PulincorMenu: React.FC = () => {
    const { pulincorInventory, handleChangePulincorNav } = usePulincorNavHandler();

    return (
        <View style={panel.container}>

            {
                PulincorMenuInfo.map((pulincor, x) => (
                    <TouchableOpacity
                        key={x}
                        style={[
                            panel.navBtn,
                            pulincorInventory === pulincor.pulincorMerch && { backgroundColor: '#73068C' }
                        ]}
                        onPress={() => handleChangePulincorNav(pulincor.pulincorMerch)}
                    >
                        <Image
                            source={pulincor.pulincorMerchIcon}
                            style={panel.navIcon}
                        />
                        <Text style={panel.navText}>{pulincor.pulincorName}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    );
};

export default PulincorMenu;