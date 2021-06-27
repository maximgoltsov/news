import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useAppContext } from "../../../app-context";
import { newsUrl } from "../../../constants/routes";

const NewsPage: React.FC = () => {
  const { api, store } = useAppContext();
  const history = useHistory();

  const { author, page } = useParams<{ author: string, page: string }>();

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedAuthor, setSelectedAuthor] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const search = useLocation().search;
  const category = new URLSearchParams(search).get('category');
  const order = new URLSearchParams(search).get('order');

  const getPath = (curAurhor: string, curPage: string, curCategory: string, curSort: string | null) => {
    let authorV = curAurhor !== "" ? `${curAurhor}/` : "";
    let pageV = curPage ?? 1;
    let categoryV = curCategory !== "" ? `category=${curCategory}&` : '';
    let sortV = `sort=${curSort ?? "asc"}`;

    return `${newsUrl}/${authorV}page${pageV}?${categoryV}${sortV}`;
  }

  useEffect(() => {
    try {
      setLoading(true);
      api.news.getAll({ category: category ?? "", author, order: order ?? "asc", page });
    } finally {
      setLoading(false);
    }
  }, [category, order, author, page])

  const handleCategory = (value: string) => {
    setSelectedCategory(value);
    history.push(getPath(selectedAuthor, page, value, order));
  }

  const handleAuthor = (value: string) => {
    setSelectedAuthor(value);
    history.push(getPath(value, page, selectedCategory, order));
  }

  const handlePaggination = (value: number) => {
    history.push(getPath(selectedAuthor, String(value), selectedCategory, order));
  }

  const news = store.news.all;

  return (<div>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div>
        <select value={selectedCategory} onChange={(e) => handleCategory(e.target.value)} name="category" id="category">
          <option value=""></option>
          <option value="Radio">Radio</option>
          <option value="Mix">Mix</option>
        </select>
      </div>
      <div>
        <select value={selectedAuthor} onChange={(e) => handleAuthor(e.target.value)} name="author" id="author">
          <option value=""></option>
          <option value="Mark">Mark</option>
          <option value="Gordon">Gordon</option>
          <option value="Max">Max</option>
        </select>
      </div>
    </div>
    <div style={{ textAlign: "left" }}>
      {news.map(x => (<div key={x.id}>{`${x.id} ${x.author} ${x.category}`}</div>))}
    </div>
    <div style={{ textAlign: "left" }}>
      <button onClick={() => handlePaggination(1)}>1</button>
      <button onClick={() => handlePaggination(2)}>2</button>
      <button onClick={() => handlePaggination(3)}>3</button>
    </div>
  </div>);
}

export default observer(NewsPage);