import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get('window');

// PulincorAppearance
export const appearence = StyleSheet.create({

    route: {
        width: '100%',
        height: '100%',
        backgroundColor: '#73068C'
    },

    panel: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        zIndex: 10
    }

});

// PulincorMenu
export const panel = StyleSheet.create({

    container: {
        alignSelf: 'center',
        width: '100%',
        backgroundColor: '#963FDE',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 12,
        paddingBottom: 30
    },

    navIcon: {
        width: 28,
        height: 28,
        resizeMode: 'contain',
        marginBottom: 8
    },

    navText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '600',
    },

    navBtn: {
        width: '20%',
        height: 68,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center'
    }

});


//PulincorHeadTitle
export const head = StyleSheet.create({
    
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: height * 0.08,
        padding: 16,
        borderBottomWidth: 0.3,
        borderBottomColor: 'rgba(255, 255, 255, 0.5)',
        marginBottom: 13
    },

    backIcon: {
        width: 17,
        height: 22,
        resizeMode: 'contain'
    }

});

// decor
export const decor = StyleSheet.create({

    empty: {
        width: '100%',
        height: 170,
        resizeMode: 'contain',
        marginBottom: 35
    },

    emptyText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'center',
    },

    toolsContainer: {
        position: 'absolute',
        right: 16,
        bottom: height > 700 ? height * 0.15 : height * 0.17,
        alignItems: 'center',
        zIndex: 10
    },

    toolBtn: {
        width: 66,
        height: 66,
        resizeMode: 'contain',
        zIndex: 10
    }

});


// PulincorArrivalsCreate & PulincorSalesCreate
export const createForm = StyleSheet.create({

    label: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 4
    },

    input: {
        width: '100%',
        borderRadius: 12,
        backgroundColor: '#9A00CE',
        padding: 16,
        marginBottom: 16,
        color: '#fff',
        fontSize: 14,
        fontWeight: '600'
    },

    coverContainer: {
        width: '100%',
        height: 180,
        borderRadius: 16,
        backgroundColor: '#9A00CE',
        overflow: 'hidden',
        marginBottom: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },

    addIcon: {
        width: 36,
        height: 36,
        resizeMode: 'contain'
    },

    cover: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 16
    },

    categoryBtn: {
        borderRadius: 100,
        backgroundColor: '#9A00CE',
        marginRight: 5,
        paddingVertical: 8,
        paddingHorizontal: 22
    },

    categoryBtnText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '400'
    },

    quantityBtn: {
        width: 29,
        height: 29,
        resizeMode: 'contain'
    },

    quantityText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '400'
    },

    doneBtn: {
        width: '100%',
        borderRadius: 16,
        backgroundColor: '#F301F3',
        padding: 18,
        alignItems: 'center',
        justifyContent: 'center'
    },

    doneBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700'
    }

});


// PulincorArrivalsCreate & PulincorSalesCreate
export const card = StyleSheet.create({

    card: {
        width: '100%',
        height: 160,
        padding: 16,
        borderRadius: 20,
        backgroundColor: '#9A07CB',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 5
    },

    cover: {
        width: '38%',
        height: '100%',
        borderRadius: 16,
        resizeMode: 'cover'
    },

    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 8
    },

    quantity: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '400',
        marginBottom: 32
    },

    readBtn: {
        borderRadius: 16,
        backgroundColor: '#F301F3',
        paddingVertical: 8,
        paddingHorizontal: 19,
        alignItems: 'center',
        justifyContent: 'center'
    },

    readBtnText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '400'
    },

    statusBox: {
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 100,
        backgroundColor: '#670488',
        marginBottom: 4
    },

    status: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '400',
        textAlign: 'center',
    }

});


export const filter = StyleSheet.create({

    container: {
        zIndex: 12,
        backgroundColor: '#670489',
        width: '100%',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingHorizontal: 16,
        paddingTop: 7,
        paddingBottom: 40,
        position: 'absolute',
        bottom: 0
    },

    btn: {
        width: 41,
        height: 1,
        backgroundColor: '#fff',
        alignSelf: 'center',
        borderRadius: 20,
        marginBottom: 7,
        padding: 2
    },

    title: {
        color: '#fff',
        fontSize: 25,
        fontWeight: '600',
        marginBottom: 16
    }

});


// PulincorArrivalDetails & PulincorSaleDetails
export const details = StyleSheet.create({

    deleteBtn: {
        position: 'absolute',
        top: height * 0.085,
        right: 20
    },

    editBtn: {
        position: 'absolute',
        bottom: height * 0.05,
        right: 20
    },

    deleteIcon: {
        width: 18,
        height: 18,
        resizeMode: 'contain'
    },

    label: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '300',
        marginBottom: 2
    },

    value: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12
    },

    cover: {
        width: '100%',
        height: height * 0.3,
        resizeMode: 'cover',
        borderRadius: 32,
        marginBottom: 12
    },

    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '800',
        marginBottom: 12
    }

});

// PulincorStatistics
export const statistics = StyleSheet.create({

    card: {
        width: '100%',
        padding: 16,
        borderRadius: 20,
        backgroundColor: '#9A07CB',
        alignItems: 'flex-start',
        marginBottom: 10
    },

    label: {
        color: '#fff',
        fontWeight: '400'
    },

    topItems: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 20
    }

});

// PulincorSettings
export const settings = StyleSheet.create({

    title: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '400',
        lineHeight: 21,
        marginBottom: 5
    },

    notifIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
        marginRight: 15
    },


});

// PulincorGame
export const game = StyleSheet.create({

    welcome: {
        width: '100%',
        flexGrow: 1,
        alignItems: 'center',
        paddingHorizontal: 16,
        justifyContent: 'center',
    },

    title: {
        color: '#fff',
        fontSize: 45,
        fontWeight: '800',
        marginBottom: height * 0.04
    },

    decor: {
        width: 204,
        height: height * 0.3,
        resizeMode: 'contain',
        marginBottom: 16
    },

    scoreTitle: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '400',
        marginBottom: 11,
        lineHeight: 13
    },

    scoreText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 20
    }

})