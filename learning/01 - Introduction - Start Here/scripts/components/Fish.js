/*
 * <Fish />
 * */
import React from 'react';
import h from '../helpers';


class Fish extends React.Component {

    onButtonClick() {
        let key = this.props.index;
        this.props.addToOrder(key);
    }

    render() {
        let details = this.props.details;
        let isAvailable = (details.status === 'available' ? true : false);
        let buttonText = (isAvailable ? 'Add To Order' : 'Sold Out!');
        return (
            <li className="menu-fish">
                <img src={details.image} alt={details.name}/>
                <h3 className="fish-name">
                    {details.name}
                    <span className="price">{h.formatPrice(details.price)}</span>
                </h3>
                <p>{details.desc}</p>
                <button disabled={!isAvailable} onClick={this.onButtonClick.bind(this)}>{buttonText}</button>
            </li>
        )
    }
}

export default Fish;