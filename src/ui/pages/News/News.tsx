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
        <span>??????????????????</span>
        <select value={selectedCategory} onChange={(e) => handleCategory(e.target.value)} name="category" id="category">
          <option value=""></option>
          <option value="Radio">Radio</option>
          <option value="Mix">Mix</option>
        </select>
      </div>
      <div>
        <span>??????????</span>
        <select value={selectedAuthor} onChange={(e) => handleAuthor(e.target.value)} name="author" id="author">
          <option value=""></option>
          <option value="Mark">Mark</option>
          <option value="Gordon">Gordon</option>
          <option value="Max">Max</option>
        </select>
      </div>
      <div>
        <span>????????????????????</span>
        <select value={selectedSort} onChange={(e) => handleSort(e.target.value)} name="sort" id="sort">
          <option value="asc">??????????????????????</option>
          <option value="desc">????????????????</option>
        </select>
      </div>
    </StyledNewsFilterContainer>
    <StyledNewsList>
      {news.map(x =>
        <StyledNewsListItem key={x.id}>
          <div>??????????: {x.author}</div>
          <div>??????????????????: {x.category}</div>
          <div>????????: {x.date}</div>
        </StyledNewsListItem>)}
    </StyledNewsList>
    <Paggination handlePaggination={handlePaggination} current={page && page !== "" ? Number(page) : 1} />
  </div>);
}

const Paggination: React.FC<{ handlePaggination: (x: number) => void, current: number }> = observer(({ handlePaggination, current }) => {
  const { store } = useAppContext();
  const maxItem = 4;
  const countPages = Math.floor(store.news.getCount / maxItem);

  return (
    <StyledPagginatorContainer>
      {Array.from(Array(countPages).keys()).map(x => <button className={`${x + 1 === current ? 'selected' : ''}`} onClick={() => handlePaggination(x + 1)}>{x + 1}</button>)}
    </StyledPagginatorContainer>);
});

export default observer(NewsPage);