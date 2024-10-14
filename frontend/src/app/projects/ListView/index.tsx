// import React from "react";
// import { Loader2 } from "lucide-react";
// import Header from "@/components/Header";
// import TaskCard from "@/components/TaskCard";
// import { Task, useGetTasksQuery } from "@/state/api";

// type Props = {
//   id: string;
//   setIsModalNewTaskOpen: (isOpen: boolean) => void;
// };

// const ListView = ({ id, setIsModalNewTaskOpen }: Props) => {
//   const {
//     data: tasks,
//     error,
//     isLoading,
//   } = useGetTasksQuery({ projectId: Number(id) });

//   if (isLoading)
//     return (
//       <div className="flex h-[calc(100vh-200px)] items-center justify-center">
//         <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
//       </div>
//     );

//   if (error) return <div>An error occured while fething tasks</div>;

//   return (
//     <div className="px-4 pb-8 xl:px-6">
//       <div className="pt-5">
//         <Header
//           name="List"
//           buttonComponent={
//             <button
//               className="flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
//               onClick={() => setIsModalNewTaskOpen(true)}
//             >
//               Add Task
//             </button>
//           }
//           isSmallText
//         />
//       </div>
//       <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
//         {tasks?.map((task: Task) => <TaskCard key={task.id} task={task} />)}
//       </div>
//     </div>
//   );
// };

// export default ListView;

import React from "react";
import { Loader2 } from "lucide-react";
import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";
import { Task, useGetTasksQuery } from "@/state/api";

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const ListView = ({ id, setIsModalNewTaskOpen }: Props) => {
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({ projectId: Number(id) });

  if (isLoading)
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );

  if (error) return <div className="text-red-500 font-semibold text-center py-4">An error occurred while fetching tasks</div>;

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <Header
            name="List"
            buttonComponent={
              <button
                className="flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                onClick={() => setIsModalNewTaskOpen(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Task
              </button>
            }
            isSmallText
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks?.map((task: Task) => <TaskCard key={task.id} task={task} />)}
        </div>
      </div>
    </div>
  );
};

export default ListView;