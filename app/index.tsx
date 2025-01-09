import React from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StatusBar,
    Alert,
} from "react-native";
import { useState, useRef } from "react";
import { Participant } from "../components/Participant";
import styles from "./styles";
export default function Home() {
    function handlePartipantAdd(e: any) {
        e.preventDefault();

        if (participants.includes(participantName)) {
            return Alert.alert("Participante já adicionado!");
        }

        if (!participantName) {
            return Alert.alert("Informe o nome do participante!");
        }

        inputRef.current?.clear();

        setParticipants([...participants, participantName]);
    }

    function handleParticipantRemove(e: any, name: string) {
        e.preventDefault();

        Alert.alert("Remover", `Deseja remover ${name}?`, [
            {
                text: "Sim",
                onPress: () => {
                    setParticipants(
                        participants.filter(
                            (participant) => participant !== name
                        )
                    );
                    Alert.alert("Removido com sucesso!");
                },
            },
            {
                text: "Não",
                style: "cancel",
            },
        ]);
    }

    const [participants, setParticipants] = useState<string[]>([
        "Rodrigo",
        "João",
        "Maria",
    ]);
    const [participantName, setParticipantName] = useState<string>("");
    const inputRef = useRef<TextInput>(null);

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent={true}
            />
            <Text style={styles.eventName}>Nome do Evento</Text>

            <Text style={styles.eventDate}>
                Segunda, 23 de Dezembro de 2024
            </Text>

            <View style={styles.form}>
                <TextInput
                    ref={inputRef}
                    style={styles.input}
                    placeholder="Nome do participante"
                    placeholderTextColor="#6B6B6B"
                    onChangeText={(text) => setParticipantName(text)}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={handlePartipantAdd}
                >
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={participants}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <Participant
                        key={item}
                        name={item}
                        participantRemove={handleParticipantRemove}
                    />
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <Text style={styles.listEmptyText}>
                        Ninguém foi adicionado ainda.
                    </Text>
                )}
            />
        </View>
    );
}
