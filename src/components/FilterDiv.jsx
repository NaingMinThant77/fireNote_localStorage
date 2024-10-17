import React from 'react';

const FilterDiv = ({ handleFilterChange, clearAllNotes, activeFilter }) => {
    return (
        <div>
            <div className="card">
                <div className="filter-div">
                    <span className={activeFilter === 'all' ? 'active' : ''} onClick={() => handleFilterChange('all')}>
                        All
                    </span>
                    <span className={activeFilter === 'pending' ? 'active' : ''} onClick={() => handleFilterChange('pending')}>
                        Pending
                    </span>
                    <span className={activeFilter === 'complete' ? 'active' : ''} onClick={() => handleFilterChange('complete')} >
                        Complete
                    </span>
                </div>
                <button className="clear-btn" onClick={clearAllNotes}>Clear All</button>
            </div>
        </div>
    );
};

export default FilterDiv;