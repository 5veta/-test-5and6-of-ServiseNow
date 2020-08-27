import {createCustomElement, actionTypes} from '@servicenow/ui-core';
const {COMPONENT_BOOTSTRAPPED}=actionTypes;
import {modalWindowRender, fetchIncidentsEffect, fetchIncidentsSuccess, fetchIncidentsError, deleteUserEffect, dropdownHendler, successDeletedIncident} from '../actions-hendlers';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import '../../node_modules/@servicenow/now-template-card';
import '../../node_modules/@servicenow/now-loader';
import view from './view';
import '../example-filter-panel/exapmle-filter-panel';
import '../example-modal-window/example-modal-window';
import styles from '../styles.scss';


createCustomElement('x-526323-list-with-actions', {
	actionHandlers: {
		[COMPONENT_BOOTSTRAPPED]: (coeffects) => {
		  const {dispatch} = coeffects;
		  dispatch('FETCH_INCIDENTS');
		},
		'FETCH_INCIDENTS':fetchIncidentsEffect,
		'INCIDENTS_FETCH_SUCCESS':fetchIncidentsSuccess,
		'INCIDENTS_FETCH_ERROR':fetchIncidentsError,
		'NOW_DROPDOWN_PANEL#ITEM_CLICKED': dropdownHendler,
		'DELETE_INCIDENT': deleteUserEffect,
		'INCIDENT_DELETED_SUCCESS': successDeletedIncident,
		'INCIDENT_DELETED_ERROR': fetchIncidentsError,
		'OPENED_MODAL': modalWindowRender,
	},
	
	renderer: {type: snabbdom},
	view,
	initialState:{
		incidents:[],
		filters:{
			state: "",
			assignment_group: ""
		}
		
	},
	styles
});

