import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

import TodoEntry from './todo-entry';
import TodoOverview from './todo-overview';
import TodoFooter from './todo-footer';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../constants';
import {getStore,addStore} from '../stores/store-store';

@observer
export default class TodoApp extends React.Component {
	render() {
        let todoStore = getStore('todo-store');
        let viewStore = getStore('view-store');
		return (
			<div>
				<header className="header">
					<h1>todos</h1>
					<TodoEntry todoStore={todoStore} />
				</header>
				<TodoOverview todoStore={todoStore} viewStore={viewStore} />
				<TodoFooter todoStore={todoStore} viewStore={viewStore} />
			</div>
		);
	}

	componentDidMount() {
	}
}

TodoApp.propTypes = {
	 
};