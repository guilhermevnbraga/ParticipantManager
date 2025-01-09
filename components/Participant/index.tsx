import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

export function Participant({ name, participantRemove }: { name: string, participantRemove: any }) {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>{name}</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={(e) => participantRemove(e, name)}
            >
                <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
        </View>
    );
}
