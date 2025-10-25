import React, { useState } from "react";
import NewTask from "./NewTask";
import CompleteTask from "./CompleteTask";
import InProgressTask from "./InProgressTask";
import FailedTask from "./FailedTask";
import CreateTask from "./CreateTask";
import Modal from "../Common/Modal";

const TaskList = ({
  data,
  onCreateTask,
  onAddSubTask,
  onUpdateTaskStatus,
  showCreateButton = true,
  createModalOpen,
  onRequestCloseCreate,
  onRequestOpenCreate,
}) => {
  const tasks = Array.isArray(data?.tasks) ? data.tasks : [];
  const hasTasks = tasks.length > 0;
  const [internalCreatorOpen, setInternalCreatorOpen] = useState(false);
  const isControlled = typeof createModalOpen === "boolean";
  const isCreatorOpen = isControlled ? createModalOpen : internalCreatorOpen;

  const closeCreator = () => {
    if (isControlled) {
      onRequestCloseCreate?.();
    } else {
      setInternalCreatorOpen(false);
    }
  };

  const openCreator = () => {
    if (isControlled) {
      onRequestOpenCreate?.();
    } else {
      setInternalCreatorOpen(true);
    }
  };

  const toggleCreator = () => {
    if (isCreatorOpen) closeCreator();
    else openCreator();
  };

  const handleCreateTask = (payload) => {
    onCreateTask?.(payload);
    closeCreator();
  };
  return (
    <div className="mt-8 w-full">
      {onCreateTask && showCreateButton && (
        <div className="max-w-7xl mx-auto flex justify-end px-4">
          <button
            type="button"
            onClick={toggleCreator}
            className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            {isCreatorOpen ? "Close Task Form" : "Create New Task"}
          </button>
        </div>
      )}
      <div
        id="tasklist"
        className={`
        mt-4 w-full px-4 py-6

        /* center the scroller area and limit overall page width */
        max-w-7xl mx-auto

        /* mobile-first: stacked list */
        flex flex-col gap-4

        /* tablet+ : horizontal carousel, no wrap */
        sm:flex-row sm:flex-nowrap sm:items-start sm:gap-4

        /* always allow horizontal scrolling if cards overflow */
        overflow-x-auto

        /* smooth snap behavior on larger screens */
        sm:snap-x sm:snap-mandatory

        /* hide scrollbar (WebKit + Firefox) */
        [&::-webkit-scrollbar]:hidden [scrollbar-width:none]

        h-auto
      `}
    >
        {!hasTasks && (
          <div className="relative w-full sm:w-72 md:w-80 lg:w-72 flex-shrink-0 rounded-2xl border border-dashed border-white/20 bg-white/5 px-6 py-8 text-center text-sm text-white/70">
            No tasks to show right now.
          </div>
        )}

        {tasks.map((task, idx) => {
          const key =
            task.id ?? `${task.taskTitle ?? "task"}-${task.taskDate ?? idx}`;
          const taskRef = { id: task.id, index: idx };
          const handleSubTaskAdd =
            onAddSubTask && ((subTaskInput) => onAddSubTask(taskRef, subTaskInput));
          const handleStatusChange =
            onUpdateTaskStatus && ((nextStatus) => onUpdateTaskStatus(taskRef, nextStatus));

          if (task.completed) {
            return (
              <CompleteTask
                key={key}
                data={task}
                onAddSubTask={handleSubTaskAdd}
                onUpdateStatus={handleStatusChange}
              />
            );
          }

          if (task.failed) {
            return (
              <FailedTask
                key={key}
                data={task}
                onAddSubTask={handleSubTaskAdd}
                onUpdateStatus={handleStatusChange}
              />
            );
          }

          if (task.inProgress) {
            return (
              <InProgressTask
                key={key}
                data={task}
                onAddSubTask={handleSubTaskAdd}
                onUpdateStatus={handleStatusChange}
              />
            );
          }

          if (task.accepted) {
            return (
              <CompleteTask
                key={key}
                data={task}
                onAddSubTask={handleSubTaskAdd}
                onUpdateStatus={handleStatusChange}
              />
            );
          }

          if (task.newTask) {
            return (
              <NewTask
                key={key}
                data={task}
                onAddSubTask={handleSubTaskAdd}
                onUpdateStatus={handleStatusChange}
              />
            );
          }

          return null;
        })}
      </div>

        {onCreateTask && isCreatorOpen && (
          <Modal title="Create Task" onClose={closeCreator}>
            <CreateTask
              onCreateTask={handleCreateTask}
              onCancel={closeCreator}
              isModal
            />
          </Modal>
        )}
    </div>
  );
};

export default TaskList;
