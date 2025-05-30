import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { appearence } from '../merchandise/PulincorStyles';
import PulincorMenu from './PulincorMenu';

interface PulincorAppearanceProps {
    inventory: ReactNode;
    menu?: boolean;
}

const PulincorAppearance: React.FC<PulincorAppearanceProps> = ({ inventory, menu }) => {
    return (
        <View style={{flex: 1}}>
            <View style={appearence.route}>{inventory}</View>

            {menu && (
                <View style={appearence.panel}>
                    <PulincorMenu />
                </View>
            )}  
        </View>
      
    );
};

export default PulincorAppearance;
