// PLP — App composition

const { useMemo } = React;

const PAGE_SIZE = 9;

const PLPApp = () => {
  const [filters, setFilters] = useState({
    sub: new Set(),
    fit: new Set(),
    deco: new Set(),
    colour: new Set(),
    features: new Set(),
    sizes: new Set(),
    price: [PRICE_MIN, PRICE_MAX]
  });
  const [sort, setSort] = useState("Bestsellers");
  const [loaded, setLoaded] = useState(PAGE_SIZE);
  const [loadCount, setLoadCount] = useState(0);

  // Reset paginate when filters/sort change
  useEffect(() => { setLoaded(PAGE_SIZE); setLoadCount(0); }, [filters, sort]);

  // Sub-cat chips on the header mirror filters.sub for top-of-page interaction
  const setSubFilter = (next) => setFilters({ ...filters, sub: next });

  const filtered = useMemo(() => {
    const f = PRODUCTS.filter(p => passesFilters(p, filters));
    const sorted = [...f];
    switch (sort) {
      case "New in": sorted.sort((a,b) => (b.features.includes("New") ? 1 : 0) - (a.features.includes("New") ? 1 : 0)); break;
      case "Price: low to high": sorted.sort((a,b) => a.from - b.from); break;
      case "Price: high to low": sorted.sort((a,b) => b.from - a.from); break;
      case "Rating": sorted.sort((a,b) => b.rating - a.rating); break;
      case "Most reviewed": sorted.sort((a,b) => b.reviews - a.reviews); break;
      default: sorted.sort((a,b) => (b.badge === "bestseller" ? 1 : 0) - (a.badge === "bestseller" ? 1 : 0));
    }
    return sorted;
  }, [filters, sort]);

  const loadMore = () => {
    setLoaded(l => Math.min(l + PAGE_SIZE, filtered.length));
    setLoadCount(c => c + 1);
  };

  const clearAll = () => setFilters({
    sub: new Set(), fit: new Set(), deco: new Set(),
    colour: new Set(), features: new Set(), sizes: new Set(),
    price: [PRICE_MIN, PRICE_MAX]
  });

  return (
    <>
      <UtilityBar />
      <Nav />

      <PLPBreadcrumb trail={CATEGORY.breadcrumb} />

      <CategoryHeader
        meta={CATEGORY}
        activeSub={filters.sub}
        setActiveSub={setSubFilter}
      />

      <SortFilterBar
        count={filtered.length}
        total={PRODUCTS.length}
        filters={filters}
        setFilters={setFilters}
        sort={sort}
        setSort={setSort}
      />

      <main className="container" style={{
        display: "flex",
        gap: 32,
        paddingTop: 32,
        paddingBottom: 64,
        alignItems: "flex-start"
      }}>
        <FilterSidebar filters={filters} setFilters={setFilters} />

        <div style={{ flex: 1, minWidth: 0 }}>
          {filtered.length === 0 ? (
            <EmptyState onClear={clearAll} />
          ) : (
            <>
              <ProductGrid products={filtered} loaded={loaded} />
              <LoadMore loaded={loaded} total={filtered.length}
                        onLoadMore={loadMore} loadCount={loadCount} />
            </>
          )}
          <SEOBlock />
        </div>
      </main>

      <Footer />
    </>
  );
};

// Hook polyfill — useMemo is built into React, just reference via destructure here

ReactDOM.createRoot(document.getElementById("root")).render(<PLPApp />);
