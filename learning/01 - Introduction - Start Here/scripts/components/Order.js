/*
 Order
 */

import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import h from '../helpers';

class Order extends React.Component {

    renderOrder(key) {
        let fish = this.props.fishes[key];
        let count = this.props.order[key];
        let removeButton = <button onClick={this.props.removeFromOrder.bind(null, key)}>&times;</button>;

        if (!fish) {
            return <li key={key}>Sorry, fish no longer available!{removeButton}</li>
        }

        return (
            <li key={key}>
                <span>
                    <CSSTransitionGroup className="count" component="span" transitionName="count"
                                        transitionEnterTimeout={250} transitionLeaveTimeout={250}>
                        <span key={count}>{count}</span>
                    </CSSTransitionGroup>
                    lbs&nbsp;{fish.name}&nbsp;{removeButton}
                </span>
                <span className="price">{h.formatPrice(count * fish.price)}</span>
            </li>
        )
    }

    render() {
        let orderIds = Object.keys(this.props.order);
        let total = orderIds.reduce((prevTotal, key) => {
            let fish = this.props.fishes[key];
            let count = this.props.order[key];
            let isAvailable = fish && fish.status === 'available';

            if (fish && isAvailable) {
                return prevTotal + (count * parseInt(fish.price) || 0 )
            }

            return prevTotal;
        }, 0);

        return (
            <div className="order-wrap">
                <h2 className="order-title">Your Order</h2>
                <CSSTransitionGroup
                    className="order"
                    component="ul"
                    transitionName="order"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    {orderIds.map(this.renderOrder.bind(this))}
                    <li className="total">
                        <stront>Total</stront>
                        {h.formatPrice(total)}
                    </li>
                </CSSTransitionGroup>
            </div>
        )
    }
}

Order.propTypes = {
    fishes: React.PropTypes.object.isRequired,
    order: React.PropTypes.object.isRequired,
    removeFromOrder: React.PropTypes.func.isRequired
};

export default Order;

