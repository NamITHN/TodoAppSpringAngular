package com.nguyenchinhhiep.getapi.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "todoItem")
@Getter
@Setter
public class TodoItem implements Serializable {

    /**
     *
     */
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "todoId")
    private long todoId;

    @Column(name = "todoTitle")
    private String todoTitle;

    @Column(name = "todoDescription")
    private String todoDescription;

    @Column(name = "todoTime")
    private String todoTime;

    public TodoItem() {
        super();
    }

    public TodoItem(long todoId, String todoTitle, String todoDescription, String todoTime) {
        super();
        this.todoId = todoId;
        this.todoTitle = todoTitle;
        this.todoDescription = todoDescription;
        this.todoTime = todoTime;
    }

}
