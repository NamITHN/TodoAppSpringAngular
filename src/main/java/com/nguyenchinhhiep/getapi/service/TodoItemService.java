package com.nguyenchinhhiep.getapi.service;

import com.nguyenchinhhiep.getapi.model.TodoItem;

import java.util.List;

public interface TodoItemService {

    TodoItem save(TodoItem todoItem);

    List<TodoItem> findAll();

    void delete(Long todoItemId);
    void deleteAll();

    TodoItem update(Long todoItemId, TodoItem todoItem);

}
