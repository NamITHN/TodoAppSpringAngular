package com.nguyenchinhhiep.getapi.repository;

import com.nguyenchinhhiep.getapi.model.TodoItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoItemRepository extends JpaRepository<TodoItem, Long> {

    void deleteAllByTodoIdIsIn(List<Long> listId);
}
