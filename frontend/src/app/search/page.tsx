"use client";

import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";
import TaskCard from "@/components/TaskCard";
import UserCard from "@/components/UserCard";
import { useSearchQuery } from "@/state/api";
import { debounce } from "lodash";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: searchResults,
    isLoading,
    isError,
  } = useSearchQuery(searchTerm, {
    skip: searchTerm.length < 3,
  });

  const handleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    500,
  );

  useEffect(() => {
    return handleSearch.cancel;
  }, [handleSearch.cancel]);

  return (
    <div className="p-8">
      <Header name="Search" />
      <div>
        <input
          type="text"
          placeholder="Search..."
          className="w-1/2 rounded border p-3 shadow"
          onChange={handleSearch}
        />
      </div>
      <div className="p-5">
        {isLoading && (
          <div className="flex h-[calc(100vh-200px)] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        )}

        {isError && (
          <div className="py-4 text-center font-semibold text-red-500">
            An error occurred while fetching search results.
          </div>
        )}

        {!isLoading && !isError && searchResults && (
          <div>
            {searchResults.tasks && searchResults.tasks?.length > 0 && (
              <h2 className="mb-4 mt-8 text-xl font-bold">Tasks</h2>
            )}
            {searchResults.tasks?.map((task) => (
              <div key={task.id} className="mb-6">
                <TaskCard task={task} />
              </div>
            ))}

            {searchResults.projects && searchResults.projects.length > 0 && (
              <h2 className="mb-4 mt-8 text-2xl font-bold">Projects</h2>
            )}

            {searchResults.projects?.map((project) => (
              <div key={project.id} className="mb-6">
                <ProjectCard project={project} />
              </div>
            ))}

            {searchResults.users && searchResults.users.length > 0 && (
              <h2 className="mb-4 mt-8 text-xl font-bold">Users</h2>
            )}
            {searchResults.users?.map((user) => (
              <div key={user.userId} className="mb-6">
                <UserCard user={user} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
