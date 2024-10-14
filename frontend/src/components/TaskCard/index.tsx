// import { Task } from "@/state/api";
// import { format } from "date-fns";
// import Image from "next/image";
// import React from "react";

// type Props = {
//   task: Task;
// };

// const TaskCard = ({ task }: Props) => {
//   return (
//     <div className="mb-3 rounded bg-white p-4 shadow dark:bg-dark-secondary dark:text-white">
//       {task.attachments && task.attachments.length > 0 && (
//         <div>
//           <strong>Attachments:</strong>
//           <div className="flex flex-wrap">
//             {task.attachments && task.attachments.length > 0 && (
//               <Image
//                 src={`/${task.attachments[0].fileURL}`}
//                 alt={task.attachments[0].fileName}
//                 width={400}
//                 height={200}
//                 className="rounded-md"
//               />
//             )}
//           </div>
//         </div>
//       )}
//       <p>
//         <strong>ID:</strong> {task.id}
//       </p>
//       <p>
//         <strong>Title:</strong> {task.title}
//       </p>
//       <p>
//         <strong>Description:</strong>{" "}
//         {task.description || "No description provided"}
//       </p>
//       <p>
//         <strong>Status:</strong> {task.status}
//       </p>
//       <p>
//         <strong>Priority:</strong> {task.priority}
//       </p>
//       <p>
//         <strong>Tags:</strong> {task.tags || "No tags"}
//       </p>
//       <p>
//         <strong>Start Date:</strong>{" "}
//         {task.startDate ? format(new Date(task.startDate), "P") : "Not set"}
//       </p>
//       <p>
//         <strong>Due Date:</strong>{" "}
//         {task.dueDate ? format(new Date(task.dueDate), "P") : "Not set"}
//       </p>
//       <p>
//         <strong>Author:</strong>{" "}
//         {task.author ? task.author.username : "Unknown"}
//       </p>
//       <p>
//         <strong>Assignee:</strong>{" "}
//         {task.assignee ? task.assignee.username : "Unassigned"}
//       </p>
//     </div>
//   );
// };

// export default TaskCard;

import { Task, Priority } from "@/state/api";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";

type Props = {
  task: Task;
};

const TaskCard = ({ task }: Props) => {
  const priorityColors: Record<Priority, string> = {
    Low: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    High: "bg-red-100 text-red-800",
    Urgent: "bg-purple-100 text-purple-800",
    [Priority.Backlog]: ""
  };

  const getPriorityColor = (priority: Priority | undefined) => {
    return priority ? priorityColors[priority] : "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
      {task.attachments && task.attachments.length > 0 && (
        <div className="relative h-48 w-full">
          <Image
            src={`/${task.attachments[0].fileURL}`}
            alt={task.attachments[0].fileName}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
          {task.priority && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
          )}
        </div>
        <p className="text-gray-600 mb-4">{task.description || "No description provided"}</p>
        <div className="space-y-2 text-sm text-gray-500">
          <p><span className="font-medium">Status:</span> {task.status}</p>
          <p><span className="font-medium">Tags:</span> {task.tags || "No tags"}</p>
          <p><span className="font-medium">Start Date:</span> {task.startDate ? format(new Date(task.startDate), "PP") : "Not set"}</p>
          <p><span className="font-medium">Due Date:</span> {task.dueDate ? format(new Date(task.dueDate), "PP") : "Not set"}</p>
          <p><span className="font-medium">Author:</span> {task.author ? task.author.username : "Unknown"}</p>
          <p><span className="font-medium">Assignee:</span> {task.assignee ? task.assignee.username : "Unassigned"}</p>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;