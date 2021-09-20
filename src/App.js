import React, { useEffect, useState } from "react";
import './App.css';
import Header from "./Components/Header";
import News from "./Components/News";
import { useDataLayerValue } from "./DataLayer"

function App() {
  const [news, setNews] = useState([]);
  const [{ newsType, search, newsCategory }, dispatch] = useDataLayerValue();

  useEffect(() => {
    if (search.length) {
      fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=4dce91392a3c48bf8a83c5c356592e4b`)
      .then(response => response.json())
      .then(data => {
        setNews(data.articles)
      })
    } else {
      fetch(`https://newsapi.org/v2/top-headlines?country=${newsType}&apiKey=4dce91392a3c48bf8a83c5c356592e4b`)
      .then(response => response.json())
      .then(data => {
        setNews(data.articles)
      })
    }
  }, [newsType, search])

  useEffect(() => {
    if (newsCategory === "top-headlines") {
      fetch(`https://newsapi.org/v2/everything?q=all&apiKey=4dce91392a3c48bf8a83c5c356592e4b`)
      .then(response => response.json())
      .then(data => {
        setNews(data.articles)
      })
    } else {
      fetch(`https://newsapi.org/v2/top-headlines?${newsType !== "all" && `country=${newsType}`}${newsCategory !== "top-headlines" && `&category=${newsCategory}`}&apiKey=4dce91392a3c48bf8a83c5c356592e4b`)
      .then(response => response.json())
      .then(data => {
        setNews(data.articles);
      })
    }
  }, [newsCategory])

  return (
    <div className="app">
      <Header />
        <div className="app__news">
          {
              news?.map(data => (
              <News 
                imgUrl={data.urlToImage}
                title={data.title}
                description={data.description}
                url={data.url}
                date={data.publishedAt}
              />
            ))
          }
          {
            news?.length === 0 && search !== "all" && <h1> No Results showing for {search.split('+').join(' ')} </h1>
          }
        </div>
        <div className="app__footer">
          &copy; 2021 Copyright All rights reserved
        </div>
    </div>
  );
}

export default App;