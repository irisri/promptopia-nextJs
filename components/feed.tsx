"use client";

import { useState, useEffect, ChangeEvent, useRef } from "react";

import { PromptCartList, DatabasePromptProps } from "./promptCartList";

export const Feed = () => {
  const [allPosts, setAllPosts] = useState<DatabasePromptProps[]>([]);

  const [searchText, setSearchText] = useState("");
  const timeOutId = useRef<NodeJS.Timeout | null>(null);
  const [searchedResults, setSearchedResults] = useState<DatabasePromptProps[]>(
    []
  );

  const filterPrompts = (searchtext: string) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (timeOutId && timeOutId.current) {
      clearTimeout(timeOutId.current);
    }
    setSearchText(e.target.value);

    // debounce method
    timeOutId.current = setTimeout(() => {
      const searchResult = filterPrompts(e.target.value);
      setSearchedResults(searchResult);
    }, 500);
  };

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setAllPosts(data);
    };

    fetchPost();
  }, []);

  useEffect(() => {
    return () => {
      if (timeOutId && timeOutId.current) {
        clearTimeout(timeOutId.current);
      }
    };
  }, []);

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

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
        <PromptCartList
          data={searchText ? searchedResults : allPosts}
          handleTagClick={handleTagClick}
        />
      ) : null}
    </div>
  );
};
