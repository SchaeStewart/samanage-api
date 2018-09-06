#!/usr/bin/env

const axios = require('axios');

/** Class for interacting with the Samanage API*/
class Samanage {

    /**
     *
     * @param {string} key - Samanage API Key
     * @param {string} [version=2.1]- Samanage API version
     * @param {string} [contentType=json] - JSON or XML
     */
    constructor(key, version = '2.1', contentType = 'json') {
        if (key === '' || typeof key !== 'string') throw 'An API Key is required';
        axios.defaults.baseURL = 'https://api.samanage.com';
        axios.defaults.headers.common['X-Samanage-Authorization'] = `Bearer ${key}`;
        axios.defaults.headers.common['Accept'] = `application/vnd.samanage.v${version}+${contentType}`;
        axios.defaults.headers.common['Content-Type'] = `application/${contentType}`;
        this.contentType = contentType;
    }

    /**
     * Creates a string of query parameters using an objects key/value pairs
     * @param {object} parameters
     * @returns {string}
     */
    createQueryString(parameters) {
        return Object.keys(parameters)
            .map(key => (`${key}=${parameters[key]}`))
            .reduce((previous, current) => (`${previous}${current}&`), '?')
            .slice(0, -1); // Removes dangling '&'
    }

    /**
     * Gets a specified resource.
     * @param {string} resourceName - Name of the Samange resource. EX 'hardware' 'users'
     * @param {object} parameters - Uses the objects' key/value pairs to create query parameters. EX { per_page: 10 } = ?per_page=10
     * @returns {Promise}
     */
    get(resourceName, parameters = {}) {
        return axios.get(`/${resourceName}.${this.contentType}${this.createQueryString(parameters)}`);
    }

    /**
     * Updates a specified resource
     * @param {string} resourceName - Name of the Samange resource. EX 'hardware' 'users'
     * @param {string} id - The id of the resource
     * @param {object} data - An object containing the fields to be update. EX { user: { email: 'NewEmail@domain.com' } }
     * @returns {Promise}
     */
    put(resourceName, id, data) {
        return axios.put(`/${resourceName}/${id}.${this.contentType}`, data);
    }

    /**
     * Deletes a specified resource
     * @param {string} resourceName - Name of the Samange resource. EX 'hardware' 'users'
     * @param id
     * @param {string} id - The id of the resource
     * @returns {Promise}
     */
    delete(resourceName, id) {
        return axios.delete(`/${resourceName}/${id}.${this.contentType}`);
    }

    /**
     * Creates a specified resource
     * @param {string} resourceName - Name of the Samange resource. EX 'hardware' 'users'
     * @param {object} data - An object containing the resources fields. EX { user: { email: 'NewEmail@domain.com' } }
     * @returns {Promise}
     */
    create(resourceName, data) {
        return axios.post(`${resourceName}.json`, data);
    }

    logError(msg) {
        return (error) => {
            // eslint-disable-next-line no-console
            console.log(error, msg); 
        };
    }

    users() {
        // const get = (parameters = {}) => {
        //     return this.get('users', parameters)
        //         .catch(this.logError('failed to get user'));
        // };

        const get = this.get.apply('users');
        
        const create = (data) => {
            return this.create('users', data)
                .catch(this.logError('failed to create user'));
        };

        const remove = (id) => {
            return this.delete('users', id)
                .catch(this.logError('error deleting user'));
        };

        const update = this.update.apply('users');


        return { get, create, remove, update };
    }
}

// samanage.users.get(userId)
// samanage.users().get(userId)


// export get(params) {
// 
// }
// export users.get() ..
// 
// 
// handle api key initalizies