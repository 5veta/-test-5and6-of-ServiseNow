import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from '../styles.scss';
import '@servicenow/now-modal';
import view from './view';


createCustomElement('example-modal-window', {
	renderer: {type: snabbdom},
	view,
	properties:{
		incident: {}
	},
	styles
});