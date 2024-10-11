import React from "react";
import { EllipsisVertical, Loader2, Plus } from "lucide-react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider, useDrag, useDrop } from "react-dnd";

import { Task as TaskType } from "@/state/api";
import { useGetTasksQuery, useUpdateTaskStatusMutation } from "@/state/api";

type BoardProps = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

type TaskProps = {
  task: TaskType;
};

type TaskColumnProps = {
  status: string;
  tasks: TaskType[];
  moveTask: (taskId: number, toStatus: string) => void;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const taskStatus = ["To Do", "Work In Progress", "Under Review", "Completed"];

const BoardView = ({ id, setIsModalNewTaskOpen }: BoardProps) => {
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({
    projectId: Number(id),
  });
  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  const moveTask = (taskId: number, toStatus: string) => {
    updateTaskStatus({ taskId, status: toStatus });
  };

  if (isLoading)
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );

  if (error) return <div>An error occured while fething tasks</div>;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="">
        {taskStatus.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasks || []}
            moveTask={moveTask}
            setIsModalNewTaskOpen={setIsModalNewTaskOpen}
          />
        ))}
      </div>
    </DndProvider>
  );
};

const TaskColumn = ({
    status,
    tasks,
    moveTask,
    setIsModalNewTaskOpen,
  }: TaskColumnProps) => {
    const [{ isOver }, drop] = useDrop(() => ({
      accept: "task",
      drop: (item: { id: number }) => moveTask(item.id, status),
      collect: (monitor: any) => ({
        isOver: !!monitor.isOver(),
      }),
    }));
  
    const tasksCount = tasks.filter((task) => task.status === status).length;
  
    const statusColor: any = {
      "To Do": "#2563EB",
      "Work In Progress": "#059669",
      "Under Review": "#D97706",
      Completed: "#000000",
    };
  
    return (
      <div
        ref={(instance) => {
          drop(instance);
        }}
        className={`sl:py-4 rounded-lg py-2 xl:px-2 ${isOver ? "bg-blue-100 dark:bg-neutral-950" : ""}`}
      >
        <div className="mb-3 flex w-full">
          <div
            className={`w-2 !bg-[${statusColor[status]}] rounded-s-lg`}
            style={{ backgroundColor: statusColor[status] }}
          />
          <div className="flex w-full items-center justify-between rounded-e-lg bg-white px-5 py-4 dark:bg-dark-secondary">
            <h3 className="flex items-center text-lg font-semibold dark:text-white">
              {status}{" "}
              <span
                className="ml-2 inline-block rounded-full bg-gray-200 p-1 text-center text-sm leading-none dark:bg-dark-tertiary"
                style={{ width: "1.5rem", height: "1.5rem" }}
              >
                {tasksCount}
              </span>
            </h3>
            <div className="flex items-center gap-1">
              <button className="flex h-6 w-5 items-center justify-center dark:text-neutral-500">
                <EllipsisVertical size={26} />
              </button>
              <button
                className="flex h-6 w-6 items-center justify-center rounded bg-gray-200 dark:bg-dark-tertiary dark:text-white"
                onClick={() => setIsModalNewTaskOpen(true)}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>
  
        {/* {tasks
          .filter((task) => task.status === status)
          .map((task) => (
            <Task key={task.id} task={task} />
          ))} */}
      </div>
    );
  };

export default BoardView;
