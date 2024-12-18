function FilterBar({ onFilterChange, activeFilter }) {
    const filters = ['All', 'Paintings', 'Sculptures', 'Photography', 'Contemporary']
    
    return (
      <div className="filter-bar mb-4">
        <div className="filter-scroll">
          {filters.map(filter => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => onFilterChange(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    )
  }
  
  export default FilterBar