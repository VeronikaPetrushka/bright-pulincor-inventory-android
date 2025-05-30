import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useCallback } from 'react';

const usePulincorNavHandler = () => {
    const navigation = useNavigation();
    const [pulincorInventory, setPulincorInventory] = useState('PulincorWarehouse');

    const handleChangePulincorNav = useCallback((route) => {
        navigation.navigate(route);
    }, [navigation]);

    useEffect(() => {
        const changePulincorNav = () => {
            const state = navigation.getState();
            if (state?.routes?.length) {
                const activePulincorInventory = state.routes[state.index];
                if (activePulincorInventory?.name) {
                    setPulincorInventory(activePulincorInventory.name);
                }
            }
        };

        changePulincorNav();

        const unsubscribe = navigation.addListener('state', changePulincorNav);

        return unsubscribe;
    }, [navigation]);

    return { pulincorInventory, handleChangePulincorNav };
};

export default usePulincorNavHandler;