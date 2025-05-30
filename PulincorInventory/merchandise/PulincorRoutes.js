import PulincorAppearance from "../workers/PulincorAppearance";
import { PulincorWorkersImports } from "./PulincorImports";

export const WelcomeToPulincorRoute = () => {
    return (
        <PulincorAppearance inventory={<PulincorWorkersImports.WelcomeToPulincor />} />
    )
};

export const PulincorWarehouseRoute = () => {
    return (
        <PulincorAppearance inventory={<PulincorWorkersImports.PulincorWarehouse />} menu />
    )
};

export const PulincorArrivalsCreateRoute = ({ route }) => {
    const { object } = route.params || {};

    return (
        <PulincorAppearance inventory={<PulincorWorkersImports.PulincorArrivalsCreate object={object} />} />
    )
};

export const PulincorArrivalDetailsRoute = ({ route }) => {
    const { item } = route.params || {};

    return (
        <PulincorAppearance inventory={<PulincorWorkersImports.PulincorArrivalDetails item={item} />} />
    )
};

export const PulincorSalesRoute = () => {
    return (
        <PulincorAppearance inventory={<PulincorWorkersImports.PulincorSales />} menu />
    )
};

export const PulincorSalesCreateRoute = ({ route }) => {
    const { sale } = route.params || {};

    return (
        <PulincorAppearance inventory={<PulincorWorkersImports.PulincorSalesCreate sale={sale} />} />
    )
};

export const PulincorSaleDetailsRoute = ({ route }) => {
    const { item } = route.params || {};

    return (
        <PulincorAppearance inventory={<PulincorWorkersImports.PulincorSaleDetails item={item} />} />
    )
};

export const PulincorStatisticRoute = () => {
    return (
        <PulincorAppearance inventory={<PulincorWorkersImports.PulincorStatistic />} menu />
    )
};

export const PulincorGameRoute = () => {
    return (
        <PulincorAppearance inventory={<PulincorWorkersImports.PulincorGame />} menu />
    )
};

export const PulincorSettingsRoute = () => {
    return (
        <PulincorAppearance inventory={<PulincorWorkersImports.PulincorSettings />} menu />
    )
};