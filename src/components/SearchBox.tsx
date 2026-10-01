interface SearchBoxProps {
    query: string;
    onQueryChange: (value: string) => void;
}

function SearchBox({
                       query,
                       onQueryChange,
                   }: SearchBoxProps) {
    return (
        <section className="search-box">
            <label htmlFor="github-search">
                Search GitHub users
            </label>

            <input
                id="github-search"
                type="search"
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                placeholder="e.g. Sora1919"
                autoComplete="off"
            />
        </section>
    );
}

export default SearchBox;