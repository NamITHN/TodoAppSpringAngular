package com.nguyenchinhhiep.getapi.controller;

import com.nguyenchinhhiep.getapi.model.TodoItem;
import com.nguyenchinhhiep.getapi.service.impl.TodoItemServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("todo")
public class TodoItemController {

    @Autowired
    TodoItemServiceImpl todoItemService;

    @PostMapping()
    public TodoItem createTodoItem(@RequestBody TodoItem todoItem) {
        return todoItemService.save(todoItem);
    }

    @GetMapping()
    public List<TodoItem> findAll() {
        return todoItemService.findAll();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long todoItemId) {
        todoItemService.delete(todoItemId);
    }

    @DeleteMapping("multiple")
    public void delete(@RequestParam("listId") String listId) {
        List<String> stringList = new ArrayList<>(Arrays.asList(listId.split(",")));
        List<Long> idList = stringList.stream()
                .map(Long::valueOf).collect(Collectors.toList());
        todoItemService.deleteList(idList);
    }

    @DeleteMapping("all")
    public void delete() {
        todoItemService.deleteAll();
    }

    @PutMapping("/{id}")
    public TodoItem update(@PathVariable("id") Long todoItemId, @RequestBody TodoItem todoItem) {
        return todoItemService.update(todoItemId, todoItem);
    }
}
