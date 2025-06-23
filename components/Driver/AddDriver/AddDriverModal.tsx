import React, { useState } from 'react';
import { View } from 'react-native';
import FloatingButton from '../../General/FloatingButton';
import DriverModal from './DriverModal';

// @ts-ignore
export default function AddDriverModal(){
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={{ flex: 1 }}>
            <FloatingButton
                onPress={() => setModalVisible(true)}
                title=""
                iconType="Ionicons"
                iconName="person-add-outline"
                backgroundColor="#10B981"
            />

            <DriverModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </View>
    );
}
