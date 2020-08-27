export default (state)=>{
    const {filters}=state;
    console.log(JSON.stringify(filters))

    return(
        <div id="filter-panel"> 
            <label >Filter by:
                {Object.entries(filters).map(filter=>
                    <now-dropdown items={filter[1]} selectedItems={[filter[0]]} size="md" variant="secondary" select="single"></now-dropdown>
                )}
            </label>
        </div>
    );
};