import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import view from './view';
import styles from '../styles.scss';

createCustomElement('example-filter-panel', {
	renderer: {type: snabbdom},
    view,
    initialState:{
        filters:{
            state: [{"id":"state","label":"State"},{"id":"state-7","label":"Close"},{"id":"state-1","label":"New"},{"id":"state-2","label":"In progress"},{"id":"state-3","label":"On Hold"}],
            assignment_group: [{"id":"assignment_group","label":"Assignment Group"},{"id":"assignment_group-d625dccec0a8016700a222a0f7900d06","label":"Service Desc"},{"id":"assignment_group-8a5055c9c61122780043563ef53438e3","label":"Hardware"},{"id":"assignment_group-287ebd7da9fe198100f92cc8d1d2154e","label":"Network"},{"id":"assignment_group-8a4dde73c6112278017a6a4baf547aa7","label":"Software"},{"id":"assignment_group-36c741fa731313005754660c4cf6a70d", "label":"Openspace"}]
        }
    },
	styles
});