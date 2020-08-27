import {createHttpEffect} from '@servicenow/ui-effect-http';
import {fetchFilterData} from './fetchMethods';

//fetch initial data
export const fetchIncidentsEffect = createHttpEffect('api/now/table/incident?sysparm_display_value=true&sysparm_fields=number%2Csys_id%2Cshort_description%2Cstate%2Cassignment_group%2Cassigned_to%2Csys_updated_on', 
{
	method: 'GET',
	headers: {
		'Host': 'https://dev72521.service-now.com/',
		'Accept':'application/json',
		'Content-Type': 'application/json',
	},
	successActionType: 'INCIDENTS_FETCH_SUCCESS',
	errorActionType: 'INCIDENTS_FETCH_ERROR'
});

export const fetchIncidentsSuccess=(coeffects)=>{
	coeffects.action.stopPropagation();
	const {action, updateState}=coeffects;
	const {result}=action.payload;
	
	updateState({incidents:result});
};

export const fetchIncidentsError=(coeffects)=>{
	const {error, details}=coeffects.action.payload;
	console.log('Error in event handler: ', {error, details});
};
//-------------------------------------------------------------------------------------

export const dropdownHendler=async({action, dispatch, state, updateState, updateProperties})=>{
	
	
	const id=action.payload.item.id.split('-');
	if(id[0]==='delete'){
		dispatch('DELETE_INCIDENT', {sys_id: id[1]});
	}
	else if(id[0]==='open'){
		dispatch('OPENED_MODAL', {sys_id: id[1]});
	}
	else if(id[0]==='state'){
		let url=Object.entries(state.filters).reduce((acc, cv)=>{return acc+=(cv[0]===id[0]&&id[1])?`${id[0]}%3D${id[1]}^`:(cv[1]&&cv[0]!==id[0])?`${cv.join('%3D')}^`:"";}, "api/now/table/incident?sysparm_display_value=true&sysparm_fields=number%2Csys_id%2Cshort_description%2Cstate%2Cassignment_group%2Cassigned_to%2Csys_updated_on&sysparm_query=");

		let data=await fetchFilterData(url);
		updateState({incidents: data, filters: {...state.filters, state: id[1]||""}});
	}
	else if(id[0]==='assignment_group'){
		let url=Object.entries(state.filters).reduce((acc, cv)=>{return acc+=(cv[0]===id[0]&&id[1])?`${id[0]}%3D${id[1]}^`:(cv[1]&&cv[0]!==id[0])?`${cv.join('%3D')}^`:"";}, "api/now/table/incident?sysparm_display_value=true&sysparm_fields=number%2Csys_id%2Cshort_description%2Cstate%2Cassignment_group%2Cassigned_to%2Csys_updated_on&sysparm_query=");

		let data=await fetchFilterData(url);
		updateState({incidents: data, filters: {...state.filters, assignment_group: id[1]||""}});
		
	}
};



//delete incident
export const deleteUserEffect=createHttpEffect('api/now/table/incident/:sys_id',{
	method:'DELETE',
	headers: {
		'Host': 'https://dev72521.service-now.com/',
		'Accept':'application/json',
		'Content-Type': 'application/json',
	},
	successActionType: 'INCIDENT_DELETED_SUCCESS',
	pathParams:['sys_id'],
	dataParam:'sys_id'
});

export const successDeletedIncident=({action, state, updateState})=>{
	updateState({incidents: state.incidents.filter(v=>v.sys_id!==action.meta.request.data)});
}
//--------------------------------------------------------------------------------------------------

//show modal window
export const modalWindowRender=(coeffects)=>{
	let incident=coeffects.state.incidents.filter(v=>v.sys_id===coeffects.action.payload.sys_id)[0];
	let elem=document.createElement('example-modal-window');
	elem.setAttribute('incident', JSON.stringify(incident));
	document.body.appendChild(elem);
};