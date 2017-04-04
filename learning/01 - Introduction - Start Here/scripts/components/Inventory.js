/*
 Inventory
 */
import React from 'react';
import AddFishForm from './AddFishForm';
import * as firebase from "firebase";


firebase.initializeApp({
    apiKey: "AIzaSyDFUdWyLmLkPhkXZ9YNMXpbdjhqmGHrkjk",
    authDomain: "test-b069a.firebaseapp.com",
    databaseURL: "https://test-b069a.firebaseio.com",
    storageBucket: "test-b069a.appspot.com"
});

class Inventory extends React.Component {

    constructor() {
        super();

        this.state = {
            uid: ''
        }
    }

    authenticate(provider) {
        console.log('Trying to auth with ' + provider);
        let providerMain = new firebase.auth.GithubAuthProvider();

        firebase.auth().signInWithPopup(providerMain).then(function(result) {
            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            let token = result.credential.accessToken;
            // The signed-in user info.
            let user = result.user;
            // ...
            console.log(result)
        }).catch(function(error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            // The email of the user's account used.
            let email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            let credential = error.credential;
            // ...

        });
    }

    renderLogin() {
        return (
            <nav className="login">
                <h2>Inventory</h2>
                <p>Sign in to manage your store's inventory</p>
                <button className="github" onClick={this.authenticate.bind(this, 'github')}>Log in with Github</button>
                <button className="facebook" onClick={this.authenticate.bind(this, 'facebook')}>Log in with Facebook</button>
                <button className="twitter" onClick={this.authenticate.bind(this, 'twitter')}>Log in with Twitter</button>
            </nav>
        )
    }

    renderInventory(key) {

        let linkState = this.props.linkState;

        return (
            <div className="fish-edit" key={key}>
                <input type="text" valueLink={linkState(`fishes.${key}.name`)}/>
                <input type="text" valueLink={linkState(`fishes.${key}.price`)}/>
                <select valueLink={linkState(`fishes.${key}.status`)}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold out!</option>
                </select>
                <textarea type="text" valueLink={linkState(`fishes.${key}.desc`)}></textarea>
                <input type="text" valueLink={linkState(`fishes.${key}.image`)}/>
                <button onClick={this.props.removeFish.bind(null, key)}>Remove Fish!</button>
            </div>
        )
    }

    render() {

        if (!this.state.uid) {
            return (
                <div>{this.renderLogin()}</div>
            )
        }

        if (this.state.uid !== this.state.owner) {
            return (
                <div>
                    <p>Sorry, u aren't the owner of this store</p>
                </div>
            )
        }

        return (
            <div>
                <h2>Inventory</h2>
                {Object.keys(this.props.fishes).map(this.renderInventory.bind(this))}
                <AddFishForm {...this.props} />
                <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
            </div>
        )
    }
}

Inventory.propTypes = {
    addFish: React.PropTypes.func.isRequired,
    loadSamples: React.PropTypes.func.isRequired,
    fishes: React.PropTypes.object.isRequired,
    linkState: React.PropTypes.func.isRequired,
    removeFish: React.PropTypes.func.isRequired
};

export default Inventory;