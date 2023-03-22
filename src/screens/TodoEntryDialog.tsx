import { useEffect, useState } from 'react'
import { View, Text, Modal, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native'
import { TodoData } from '../model/TodoData'
import CalendarPicker from 'react-native-calendar-picker';
import { Moment } from 'moment';

type TodoEntryProps = {
    optionalTodoData?: TodoData,
    isVisible: boolean,
    onCancel(): void
    onAddTodo(text: string, date?: string): void
    onUpdateTodo(text: string, todoId: string, date?: string): void
}

const TodoEntryDialog = (props: TodoEntryProps) => {
    const [enteredTodo, setEnteredTodo] = useState('');
    const [buttonText, setButtonText] = useState('');
    const [calendarVisibilty, setCalendarVisibility] = useState(false);
    const [dateSelected, setDateSelected] = useState('');

    useEffect(() => {
        if (props.optionalTodoData != null) {
            setEnteredTodo(props.optionalTodoData.todoName)
            setDateSelected(props.optionalTodoData.todoDate || '')
            setButtonText("Update Todo")
        } else {
            setButtonText("Add Todo")
        }
    }, [props])

    const textInputHandler = (text: string) => {
        setEnteredTodo(text)
    }

    const addTodoHandler = () => {
        if (enteredTodo.length === 0)
            return;

        if (props.optionalTodoData != null) {
            props.onUpdateTodo(enteredTodo, dateSelected, props.optionalTodoData.todoId)
            setEnteredTodo('');
            setDateSelected('')
            setButtonText('Add Todo')
        } else {
            props.onAddTodo(enteredTodo, dateSelected);
            setEnteredTodo('');
            setDateSelected('')
        }
    }

    const dateSelectedHandler = (date: Moment) => {
        setDateSelected(date.format('MMM DD YYYY'))
    }

    const cancelHandler = () => {
        setEnteredTodo('');
        setDateSelected('')
        props.onCancel()
    }

    return (
        <Modal
            visible={props.isVisible}
            transparent={true}>
            {calendarVisibilty &&
                <View style={{ flex: 1, backgroundColor: "white" }}>
                    <CalendarPicker
                        onDateChange={(date) => {
                            dateSelectedHandler(date)
                            setCalendarVisibility(false)
                        }} />
                    <View style={{ padding: 20 }}>
                        <Button
                            title='close calendar'
                            onPress={() => setCalendarVisibility(false)}
                        />
                    </View>
                </View>
            }
            {!calendarVisibilty && <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.title}>Enter Todo Name</Text>

                    <TextInput
                        placeholder="Enter a todo"
                        style={styles.textInput}
                        onChangeText={textInputHandler}
                        value={enteredTodo} />

                    <Text style={{ marginTop: 10, marginBottom: 3 }}>Select completion date</Text>

                    <TouchableOpacity onPress={() => setCalendarVisibility(true)}>
                        <TextInput
                            placeholder="Completion date"
                            style={styles.textInput}
                            editable={false}
                            onKeyPress={() => setCalendarVisibility(true)}
                            value={dateSelected} />
                    </TouchableOpacity>

                    <View style={styles.button}>
                        <Button title={buttonText} onPress={addTodoHandler} />
                    </View>

                    <View style={styles.button}>
                        <Button
                            title="Cancel"
                            color="grey"
                            onPress={cancelHandler} />
                    </View>
                </View>
            </View>}
        </Modal>
    );
}

export default TodoEntryDialog

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10
    },
    textInput: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 10
    },
    button: {
        marginTop: 10
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