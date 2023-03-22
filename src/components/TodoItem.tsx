import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TodoData } from '../model/TodoData';
import Checkbox from 'expo-checkbox';
import { Swipeable } from 'react-native-gesture-handler';

type TodoItemProps = {
    todoData: TodoData,
    onItemClicked(todoId: string): void
    onDelete(todoId: string): void
    onCheck(todoId: string, isChecked: boolean): void
}

const TodoItem = (props: TodoItemProps) => {
    const { todoName, todoId, isDone, todoDate } = props.todoData

    return (
        <View>
            <View style={styles.itemContainer}>
                <TouchableOpacity style={styles.todoNameContainer} onPress={props.onItemClicked.bind(this, todoId)}>
                    <View>
                        <Text>{todoName}</Text>
                    </View>
                </TouchableOpacity>

                <Checkbox
                    style={{ marginEnd: 10 }}
                    disabled={false}
                    value={isDone}
                    onValueChange={(isChecked) => {
                        props.onCheck(props.todoData.todoId, isChecked)
                    }}
                />

                <TouchableOpacity onPress={props.onDelete.bind(this, todoId)}>
                    <Image source={require('../../assets/ic_delete_todo.png')} />
                </TouchableOpacity>
            </View>
            <View style={{
                marginTop: 2, flexDirection: 'row', alignItems: 'center'
            }}>
                <Image source={require('../../assets/ic_calendar.png')} />
                <Text style={{ marginStart: 3 }}>
                    {todoDate || "(Date not set)"}
                </Text>
            </View>
        </View>
    );
}

export default TodoItem

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline'
    },
    todoNameContainer: {
        borderColor: 'black',
        borderWidth: 1,
        flex: 1,
        marginEnd: 10,
        padding: 10,
        marginVertical: 10
    }
})