import { useMemo, useState, useEffect } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { categories, productsByCategory, type Product } from "../data/catalog";
import ProductCard from "../components/ProductCard";
import FilterSheet from "../components/FilterSheet";
import { CheckIcon } from "../components/icons";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating";

export default function Category() {
  const { slug = "" } = useParams();
  const [searchParams] = useSearchParams();
  const category = categories.find((c) => c.slug === slug);

  const all = useMemo(() => productsByCategory(slug), [slug]);

  const [types, setTypes] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>("featured");
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    const t = searchParams.get("type");
    setTypes(t ? [t] : []);
  }, [slug, searchParams]);

  const query = searchParams.get("q")?.toLowerCase() ?? "";

  const toggle = <T,>(value: T, list: T[], set: (v: T[]) => void) =>
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const clearAll = () => {
    setTypes([]);
  };

  const filtered = useMemo(() => {
    let list: Product[] = all.filter((p) => {
      const okType = !types.length || types.includes(p.subcategory);
      const okQuery = !query || p.name.toLowerCase().includes(query);
      return okType && okQuery;
    });
    list = [...list];
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    if (sort === "featured")
      list.sort((a, b) => Number(b.bestseller) - Number(a.bestseller));
    return list;
  }, [all, types, query, sort]);

  const countBy = (predicate: (p: Product) => boolean) =>
    all.filter(predicate).length;

  const filterPanel = category ? (
    <>
      <div className="filter-group">
        <h3>Type</h3>
        {category.subcategories.map((t) => (
          <label className="check" key={t}>
            <input
              type="checkbox"
              checked={types.includes(t)}
              onChange={() => toggle(t, types, setTypes)}
            />
            <span className="box">
              <CheckIcon />
            </span>
            {t}
            <span className="count">{countBy((p) => p.subcategory === t)}</span>
          </label>
        ))}
      </div>
      <button className="btn-clear filters-desktop-only" onClick={clearAll}>
        (clear)
      </button>
    </>
  ) : null;

  if (!category) {
    return (
      <div className="container empty-state">
        <h2 className="hand-title">Craft not found</h2>
        <Link to="/" className="btn btn--green">Back home</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="catalog-head">
        <div className="crumbs">
          <Link to="/">Home</Link> / {category.name}
        </div>
        <h1>{category.name}</h1>
        <p>{category.blurb}</p>
      </div>

      <div className="catalog-layout">
        <aside className="filters">
          <h2>Filters</h2>
          {filterPanel}
        </aside>

        <section>
          <div className="catalog-toolbar">
            <span className="count">
              {filtered.length} kit{filtered.length === 1 ? "" : "s"}
              {query && <> for “{query}”</>}
            </span>
            <div className="catalog-toolbar-actions">
              <button
                className="btn btn--filter"
                onClick={() => setFilterOpen(true)}
              >
                Filter{types.length > 0 && ` (${types.length})`}
              </button>
              <select
                className="sort-select"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                aria-label="Sort"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="rating">Top rated</option>
              </select>
            </div>
          </div>

          {types.length > 0 && (
            <div className="filter-chips">
              {types.map((t) => (
                <button
                  key={t}
                  className="filter-chip"
                  onClick={() => toggle(t, types, setTypes)}
                >
                  {t} ×
                </button>
              ))}
              <button className="filter-chip filter-chip--clear" onClick={clearAll}>
                Clear all
              </button>
            </div>
          )}

          <div className="product-grid">
            {filtered.length ? (
              filtered.map((p) => <ProductCard key={p.id} product={p} />)
            ) : (
              <div className="empty-state">
                <h2 className="hand-title">Nothing here yet</h2>
                <p>Try clearing a filter or two.</p>
                <button className="btn btn--green" onClick={clearAll}>
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>
      </div>

      <FilterSheet
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={() => setFilterOpen(false)}
        onClear={clearAll}
        activeCount={types.length}
      >
        {filterPanel}
      </FilterSheet>
    </div>
  );
}
