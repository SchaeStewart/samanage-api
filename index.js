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
        this.users = {
            create: (data) => {
                this.create('user', data);
            },
            get: (params) => {
                return this.get('users', params);
            },
            update: (id, data) => {
                return this.put('users', id, { user: data });
            },
            delete: (id) => {
                return this.delete('users', id);
            },
        };
        this.attachments = {};
        this.audit = {
            get: (params = {}) => {
                return this.get('audits', params);
            }
        };
        this.catalogItems = {
            get: (params = {}) => {
                return this.get('catalog_items', params);
            },
            create: (data) => {
                return this.create('catalog_items', data);
            },
            update: (id, data) => {
                return this.put('catalog_items', id, data);
            },
            delete: (id) => {
                return this.delete('catalog_items', id);
            }
        };
        this.categories = {
            get: (params) => {
                return this.get('categories', params);
            },
            create: (data) => {
                return this.create('categories', data);
            },
            update: (id, data) => {
                return this.put('categories', id, data);
            },
            delete: (id) => {
                return this.delete('categories', id);
            }
        };
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

}

// function SamanageAPI(key, version = '2.1', contentType = 'json') {
//   if (key === '' || typeof key !== 'string') throw 'An API Key is required'
//   axios.defaults.baseURL = 'https://api.samanage.com'
//   axios.defaults.headers.common['X-Samanage-Authorization'] = `Bearer ${key}`
//   axios.defaults.headers.common['Accept'] = `application/vnd.samanage.v${version}+${contentType}`
//   axios.defaults.headers.common['Content-Type'] = `application/${contentType}`
//   this.contentType = contentType
// }
//
// SamanageAPI.prototype.create = function (resourceName, data) {
//   return axios.post(`${resourceName}.json`, data)
// }
//
// SamanageAPI.prototype.createQueryString = function (parameters) {
//   return Object.keys(parameters)
//     .map(key => (`${key}=${parameters[key]}`))
//     .reduce((previous, current) => (`${previous}${current}&`), '?')
//     .slice(0, -1) // Removes dangling '&'
// }
//
// SamanageAPI.prototype.get = function (resourceName, parameters) {
//   console.log(this.contentType)
//   return axios.get(`/${resourceName}.${this.contentType}${this.createQueryString(parameters)}`)
// }
//
// SamanageAPI.prototype.delete = function (resourceName, id) {
//   return axios.delete(`/${resourceName}/${id}.${this.contentType}`)
// }
//
// SamanageAPI.prototype.create = function (resourceName, data) {
//   return axios.post(`${resourceName}.json`, data)
// }
//
// SamanageAPI.prototype.Users = {}
//
// SamanageAPI.prototype.Users.get = function (params) {
//   return this.get('users', params)
// }

module.exports = { Samanage };
