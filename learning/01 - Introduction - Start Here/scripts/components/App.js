/*
 App
 */

import React from 'react';
import Catalyst from 'react-catalyst';
import Fish from './Fish';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import reactMixin from 'react-mixin';
import autobind from 'autobind-decorator';

// Firebase
import Rebase from 're-base';

const base = Rebase.createClass('https://test-b069a.firebaseio.com/');

@autobind
class App extends React.Component {

    constructor() {
        super();

        this.state = {
            fishes: {},
            order: {}
        }
    }

    componentDidMount() {
        base.syncState(`${this.props.params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });

        let localStorageRef = localStorage.getItem(`store-${this.props.params.storeId}`);

        if (localStorageRef) {
            this.setState({
                order: JSON.parse(localStorageRef)
            });
        }
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem(`store-${this.props.params.storeId}`, JSON.stringify(nextState.order));
    }

    addToOrder(key) {
        this.state.order[key] = this.state.order[key] + 1 || 1;
        this.setState({ order: this.state.order });
    }

    addFish(fish) {
        let timestamp = (new Date()).getTime();

        // Обновляем state
        this.state.fishes[`fish-${timestamp}`] = fish;

        // Устанавливаем state
        this.setState({ fishes : this.state.fishes });
    }

    removeFish(key) {
        if (confirm('Are u sure, you want to remove this fish?!')) {
            this.state.fishes[key] = null;

            this.setState({
                fishes : this.state.fishes
            })
        }
    }

    removeFromOrder(key) {
        delete this.state.order[key];
        this.setState({
            order: this.state.order
        })
    }

    loadSamples() {
        this.setState({
            fishes: require('../sample-fishes')
        });
    }

    renderFish(key) {
        return <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                    <ul className="list-of-fishes">
                        {Object.keys(this.state.fishes).map(this.renderFish)}
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder}/>
                <Inventory addFish={this.addFish} loadSamples={this.loadSamples} fishes={this.state.fishes} linkState={this.linkState.bind(this)} removeFish={this.removeFish}/>
            </div>
        )
    }
}

reactMixin.onClass(App, Catalyst.LinkedStateMixin);

export default App;