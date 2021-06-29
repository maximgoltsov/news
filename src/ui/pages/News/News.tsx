import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useAppContext } from "../../../app-context";
import { newsUrl } from "../../../constants/routes";
import { StyledNewsFilterContainer, StyledNewsList, StyledNewsListItem, StyledPagginatorContainer } from "./styled";

const NewsPage: React.FC = () => {
  const { api, store } = useAppContext();

  const history = useHistory();
  const search = useLocation().search;
  const category = new URLSearchParams(search).get('category');
  const order = new URLSearchParams(search).get('order');

  const { author, page } = useParams<{ author: string, page: string }>();

  const [selectedSort, setSelectedSort] = useState<string>(order ?? "asc");
  const [selectedCategory, setSelectedCategory] = useState<string>(category ?? "");
  const [selectedAuthor, setSelectedAuthor] = useState<string>(author ?? "");
  const [loading, setLoading] = useState<boolean>(false);

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

  const handleSort = (value: string) => {
    setSelectedSort(value);
    history.push(getPath(selectedAuthor, page, selectedCategory, value));
  }

  const handlePaggination = (value: number) => {
    history.push(getPath(selectedAuthor, String(value), selectedCategory, order));
  }

  const news = store.news.all;

  return (<div>
    <StyledNewsFilterContainer>
      <div>
        <span>Категория</span>
        <select value={selectedCategory} onChange={(e) => handleCategory(e.target.value)} name="category" id="category">
          <option value=""></option>
          <option value="Radio">Radio</option>
          <option value="Mix">Mix</option>
        </select>
      </div>
      <div>
        <span>Автор</span>
        <select value={selectedAuthor} onChange={(e) => handleAuthor(e.target.value)} name="author" id="author">
          <option value=""></option>
          <option value="Mark">Mark</option>
          <option value="Gordon">Gordon</option>
          <option value="Max">Max</option>
        </select>
      </div>
      <div>
        <span>Сортировка</span>
        <select value={selectedSort} onChange={(e) => handleSort(e.target.value)} name="sort" id="sort">
          <option value="asc">Возрастание</option>
          <option value="desc">Убывание</option>
        </select>
      </div>
    </StyledNewsFilterContainer>
    <StyledNewsList>
      {news.map(x =>
        <StyledNewsListItem key={x.id}>
          <div>Автор: {x.author}</div>
          <div>Категория: {x.category}</div>
          <div>Дата: {x.date}</div>
        </StyledNewsListItem>)}
    </StyledNewsList>
    <StyledPagginatorContainer>
      {[1, 2, 3].map(x => <button onClick={() => handlePaggination(x)}>{x}</button>)}
    </StyledPagginatorContainer>
  </div>);
}

export default observer(NewsPage);