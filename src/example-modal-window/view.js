export default (derivedState, {updateProperties})=>{
    const {incident}=derivedState.properties;
    
    if( typeof incident ==='string')
    {
        updateProperties({incident: JSON.parse(incident)});
        
    }

    return (
    
        <now-modal headerLabel={incident.short_description} size='lg' opened='true'>
        {(incident.short_description)?
            <div className="grid-modal">
                <now-label-value-stacked className="item1" items={[{label:"Number",value:{type:"string",value:incident.number}}]}></now-label-value-stacked>
                <now-label-value-stacked className="item2" items={[{label:"State",value:{type:"string",value:incident.state}}]}></now-label-value-stacked>
                <now-label-value-stacked className="item3" items={[{label:"Assignment group",value:{type:"string",value:incident.assignment_group.display_value}}]}></now-label-value-stacked>
                <now-label-value-stacked className="item4" items={[{label:"Assigned to",value:{type:"string",value:incident.assigned_to.display_value}}]}></now-label-value-stacked>
            </div>:null
        }
        </now-modal>
        
        
    );
};