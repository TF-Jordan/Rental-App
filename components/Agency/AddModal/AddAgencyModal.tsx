import React, { useState } from 'react';
import { View } from 'react-native';
import FloatingButton from '../../General/FloatingButton';
import AgencyModal from './AgencyModal';

export default function AddAgencyModal()  {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={{ flex: 1 }}>
            <FloatingButton
                onPress={() => setModalVisible(true)}
                title=""
                iconType="MaterialIcons"
                iconName="business"
                backgroundColor="#10B981"
            />

            <AgencyModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </View>
    );
};