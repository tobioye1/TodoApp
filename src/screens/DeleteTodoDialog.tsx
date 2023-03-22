import { View, Text, Modal, TextInput, Button, StyleSheet } from 'react-native'

type DeleteDialogProps = {
    todoId: string,
    isVisible: boolean,
    onDelete(todoId: string): void
    onCancel(): void
}

const DeleteTodoDialog = (props: DeleteDialogProps) => {
    return (
        <Modal
            visible={props.isVisible}
            transparent={true}>
            <View style={styles.centeredView}>
                <View style={styles.modalView} >
                    <Text style={styles.title}>Delete Todo Item</Text>
                    <Text style={styles.subtitle}>Are you sure you want to delete this item?</Text>
                    <View style={styles.buttonRowContainer}>
                        <View style={styles.button}>
                            <Button title="yes" onPress={props.onDelete.bind(this, props.todoId)} />
                        </View>

                        <View style={styles.button}>
                            <Button
                                title="No"
                                color="grey"
                                onPress={props.onCancel.bind(this)} />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export default DeleteTodoDialog

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10
    },
    subtitle: {
        fontSize: 15,
        marginBottom: 10
    },
    textInput: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 10
    },
    button: {
        flex: 1,
        paddingEnd: 10
    },
    buttonRowContainer: {
        justifyContent: 'space-between',
        marginTop: 10,
        flexDirection: 'row',
    },
    centeredView: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 30,
        elevation: 5
    }
})