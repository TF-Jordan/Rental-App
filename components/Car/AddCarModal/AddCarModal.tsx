import React, { useState } from 'react';
import { View } from 'react-native';
import FloatingButton from '../../General/FloatingButton';
import VehicleModal from './VehicleModal';


// @ts-ignore
export default function AddCarModal  ()  {
    const [modalVisible, setModalVisible] = useState(false);

    // @ts-ignore
    return (
        <View style={{ flex: 1 }}>
            <FloatingButton
                onPress={() => setModalVisible(true)}
                title=""
                iconType="Ionicons"
                iconName="car-outline"
                backgroundColor="#E6804AFF"
            />

            <VehicleModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </View>
    );
}
