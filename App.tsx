import { StyleSheet, Text, FlatList, Button, View, StatusBar } from 'react-native';
import { useState } from 'react';
import TodoItem from './src/components/TodoItem';
import TodoEntryDialog from './src/screens/TodoEntryDialog';
import { TodoData } from './src/model/TodoData';
import DeleteTodoDialog from './src/screens/DeleteTodoDialog';

export default function App() {

  const [selectedTodoItem, setSelectedTodoItem] = useState<TodoData>();
  const [selectedTodoId, setSelectedTodoId] = useState('');
  const [isDialogVisible, setDialogVisibility] = useState(false);
  const [isDeleteDialogVisible, setDeleteDialogVisibility] = useState(false);
  const [todoList, setTodoList] = useState<TodoData[]>([]);

  const addGoalModalHandler = () => {
    setSelectedTodoItem(undefined)
    setDialogVisibility(!isDialogVisible)
  }

  const cancelDeleteModalHandler = () => {
    setDeleteDialogVisibility(!isDeleteDialogVisible)
  }

  const onDeleteTodoClicked = (todoId: string) => {
    setSelectedTodoId(todoId)
    setDeleteDialogVisibility(!isDeleteDialogVisible)
  }

  const onAddTodoHandler = (todoName: string, todoDate: string) => {
    setTodoList(todos => [
      ...todos,
      {
        todoId: Date.now().toString(),
        todoName: todoName,
        todoDate: todoDate,
        isDone: false
      }
    ].sort((a, b) => Number(a.isDone) - Number(b.isDone)))

    setDialogVisibility(!isDialogVisible)
  }

  const onUpdateTodoNameHandler = (todoName: string, todoDate: string, todoId: string) => {
    const itemIndex = todoList.findIndex(item => item.todoId == todoId)
    if (itemIndex != -1) {
      const newTodoList = todoList.map(item => item.todoId == todoId ? { ...item, todoName: todoName, todoDate: todoDate } : item)
      setTodoList(newTodoList)
      addGoalModalHandler()
    }
  }

  const onToggleCheckHandler = (todoId: string, isChecked: boolean) => {
    const itemIndex = todoList.findIndex(item => item.todoId == todoId)
    if (itemIndex != -1) {
      const newTodoList = todoList.map(item => item.todoId == todoId ? { ...item, isDone: isChecked } : item)
      setTodoList(newTodoList.sort((a, b) => Number(a.isDone) - Number(b.isDone)))
    }
  }

  const onTodoItemClicked = (todoId: string) => {
    let todoItem = todoList.find(item => item.todoId == todoId)
    if (todoItem != null) {
      setSelectedTodoItem(todoItem)
      setDialogVisibility(!isDialogVisible)
    }
  }

  const deleteTodoHandler = (todoId: string) => {
    setDeleteDialogVisibility(!isDeleteDialogVisible)
    setTodoList(todoList.filter(todo => todo.todoId !== todoId))
  }

  return (
    <View style={styles.container}>
      <StatusBar />
      {todoList.length > 0 ? <Button title="Add New Goal" onPress={addGoalModalHandler} />
        :
        <View style={styles.emptyState}>
          <Text style={{ alignSelf: 'center', marginBottom: 10 }}>No todo items</Text>
          <Button title="Add New Goal" onPress={addGoalModalHandler} />
        </View>}

      <TodoEntryDialog
        optionalTodoData={selectedTodoItem}
        isVisible={isDialogVisible}
        onUpdateTodo={onUpdateTodoNameHandler}
        onCancel={addGoalModalHandler}
        onAddTodo={onAddTodoHandler} />
      <DeleteTodoDialog
        todoId={selectedTodoId}
        isVisible={isDeleteDialogVisible}
        onDelete={deleteTodoHandler}
        onCancel={cancelDeleteModalHandler}
      />
      {todoList.length > 0 &&
        <FlatList
          keyExtractor={(item, _) => item.todoId}
          data={todoList}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          renderItem={(item) => (
            <TodoItem
              todoData={item.item}
              onItemClicked={onTodoItemClicked}
              onDelete={onDeleteTodoClicked}
              onCheck={onToggleCheckHandler}
            />
          )}
        />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',

  }
});