"use client";

import { useState, useEffect, ChangeEvent } from "react";

import { Text, TextPreset } from "./text";
import { PromptCartList, DatabasePromptProps } from "./promptCartList";

export const Feed = () => {
  const [allPosts, setAllPosts] = useState<DatabasePromptProps[]>([]);

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState<DatabasePromptProps[]>(
    []
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    // clearTimeout(searchTimeout);
    // setSearchText(e.target.value);
    // // debounce method
    // setSearchTimeout(
    //   setTimeout(() => {
    //     const searchResult = filterPrompts(e.target.value);
    //     setSearchedResults(searchResult);
    //   }, 500)
    // );
  };

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setAllPosts(data);
    };

    fetchPost();
  }, []);

  return (
    <div>
      <form>
        <input
          required
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input mt-16"
        />
      </form>

      {allPosts.length > 0 ? (
        <PromptCartList data={allPosts} handleTagClick={() => {}} />
      ) : null}
    </div>
  );
};
