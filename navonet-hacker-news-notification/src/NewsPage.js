import { useState, useEffect } from "react";
import axios from "axios";

const NewsPage = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // <-- Fix typo here

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => { // <-- Add missing parentheses here
      try {
        const { data } = await axios.get(
          "https://hn.algolia.com/api/v1/search?"
        );
        console.log(data);
        setArticles(data.hits); // <-- Store the fetched articles in state
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false); // <-- Set isLoading to false when done fetching
      }
    };
    fetchData(); // <-- Remove trailing comma here
  }, []);

  return (
    <div className="container">
      <h1>Hacker News</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {articles.map((article) => (
            <li key={article.objectID}>
              <a href={article.url}>{article.title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewsPage;
