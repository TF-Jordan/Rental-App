import React, { useState } from 'react';
import { View } from 'react-native';
import FloatingButton from '../../General/FloatingButton';
import PersonnelModal from './PersonnelModal';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


// @ts-ignore
export default function AddPersonnalModal()  {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={{ flex: 1 }}>
            <FloatingButton
                onPress={() => setModalVisible(true)}
                title=""
                iconType="FontAwesome6"
                iconName="person-circle-plus"
                backgroundColor="#10B981"
            />

            <PersonnelModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </View>
    );
}
