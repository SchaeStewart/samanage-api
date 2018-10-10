#!/usr/bin/env node

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
    get(resourceName, { id, parameters = {} }) {
        return axios.get(`/${resourceName}${id ? '/' + id : null}.${this.contentType}${this.createQueryString(parameters)}`);
    }

    /**
     * Updates a specified resource
     * @param {string} resourceName - Name of the Samange resource. EX 'hardware' 'users'
     * @param {string} id - The id of the resource
     * @param {object} data - An object containing the fields to be update. EX { user: { email: 'NewEmail@domain.com' } }
     * @returns {Promise}
     */
    update(resourceName, id, data) {
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

    attachments() {
        return {
            create: this.create.bind(this, 'attachments'),
        };
    }

    audit() {
        return {
            get: this.get.bind(this, 'audits')
        };
    }

    catalogItems() {
        return {
            create: this.create.bind(this, 'catalog_items'),
            get: this.get.bind(this, 'catalog_items'),
            update: this.update.bind(this, 'catalog_items'),
        };
    }

    categories () {
        return {
            create: this.create.bind(this, 'categories'),
            get: this.get.bind(this, 'categories'),
            update: this.update.bind(this, 'categories'),
            delete: this.delete.bind(this, 'categories')
        };
    }

    changes() {
        return {
            create: this.create.bind(this, 'changes'),
            get: this.create.bind(this, 'changes'),
            update: this.update.bind(this, 'changes'),
            delete: this.delete.bind(this, 'changes')
        };
    }

    comments() {
        throw 'error, feature not implemented';
    }

    configurationItems() {
        return {
            create: this.create.bind(this, 'configuration_items'),
            get: this.create.bind(this, 'configuration_items'),
            update: this.update.bind(this, 'configuration_items'),
            delete: this.delete.bind(this, 'configuration_items')
        };
    }


    contracts() {
        return {
            create: this.create.bind(this, 'contracts'),
            get: this.create.bind(this, 'contracts'),
            update: this.update.bind(this, 'contracts'),
            delete:  () => { throw 'delete is not a function for contracts'; }
        };
    }

    departments() {
        return {
            create: this.create.bind(this, 'departments'),
            get: this.create.bind(this, 'departments'),
            update: this.update.bind(this, 'departments'),
            delete: this.delete.bind(this, 'departments')
        };
    }

    groups() {
        return {
            create: this.create.bind(this, 'groups'),
            get: this.create.bind(this, 'groups'),
            update: this.update.bind(this, 'groups'),
            delete: this.delete.bind(this, 'groups')
        };
    }

    hardware() {
        return {
            create: this.create.bind(this, 'hardwares'),
            get: this.create.bind(this, 'hardwares'),
            update: this.update.bind(this, 'hardwares'),
            delete: this.delete.bind(this, 'hardwares')
        };
    }

    incidents() {
        return {
            create: this.create.bind(this, 'incidents'),
            get: this.create.bind(this, 'incidents'),
            update: this.update.bind(this, 'incidents'),
            delete: this.delete.bind(this, 'incidents')
        };
    }

    items() {
        throw 'error feature not implemented';
    }

    memberships() {
        return {
            create: this.create.bind(this, 'memberships'),
            get: this.create.bind(this, 'memberships'),
            update: this.update.bind(this, 'memberships'),
            delete: this.delete.bind(this, 'memberships')
        };
    }

    mobiles() {
        return {
            create: this.create.bind(this, 'mobiles'),
            get: this.create.bind(this, 'mobiles'),
            update: this.update.bind(this, 'mobiles'),
            delete: this.delete.bind(this, 'mobiles')
        };
    }

    otherAssets() {
        return {
            create: this.create.bind(this, 'other_assets'),
            get: this.create.bind(this, 'other_assets'),
            update: this.update.bind(this, 'other_assets'),
            delete: this.delete.bind(this, 'other_assets')
        };
    }

    printers() {
        return {
            get: this.create.bind(this, 'printers'),
        };
    }

    problems() {
        return {
            create: this.create.bind(this, 'problems'),
            get: this.create.bind(this, 'problems'),
            update: this.update.bind(this, 'problems'),
            delete: this.delete.bind(this, 'problems')
        };
    }

    purchaes() {
        throw 'error purchaes not implemented';
    }

    purchaseOrders() {
        return {
            create: this.create.bind(this, 'purchase_orders'),
            get: this.create.bind(this, 'purchase_orders'),
            update: this.update.bind(this, 'purchase_orders'),
            delete: this.delete.bind(this, 'purchase_orders')
        };
    }

    releases() {
        return {
            create: this.create.bind(this, 'releases'),
            get: this.create.bind(this, 'releases'),
            update: this.update.bind(this, 'releases'),
            delete: this.delete.bind(this, 'releases')
        };
    }

    risks() {
        return {
            get: this.create.bind(this, 'risks'),
            getForHardware: (hardwareId) => this.get(`hardwares/${hardwareId}/risks.${this.contentType}`)
        };
    }

    roles() {
        return {
            create: this.create.bind(this, 'role'),
            get: this.create.bind(this, 'role'),
        };
    }

    serviceRequests() {
        throw 'error feature not implemented';
    }

    sites() {
        return {
            create: this.create.bind(this, 'sites'),
            get: this.get.bind(this, 'sites'),
            update: this.update.bind(this, 'sites'),
            delete: this.delete.bind(this, 'sites'),
        };
    }

    software() {
        return {
            get: this.get.bind(this, 'softwares'),
        };
    }

    solutions() {
        return {
            create: this.create.bind(this, 'solutions'),
            get: this.get.bind(this, 'solutions'),
            update: this.update.bind(this, 'solutions'),
            delete: this.delete.bind(this, 'solutions'),
        };
    }

    tasks() {
        throw 'error feature not implemented';
    }

    timeTracks() {
        throw 'error feature not implemented';
    }

    users() {
        return {
            create: this.create.bind(this, 'users'),
            get: this.get.bind(this, 'users'),
            update: this.update.bind(this, 'users'),
            delete: this.delete.bind(this, 'users'),
        };
    }

    vendor() {
        return {
            get: this.get.bind(this, 'vendors')
        };
    }

    warranties() {
        throw 'error feature not implemented';
    }
}

const api = new Samanage(process.env.SAMANAGE_KEY);
api.comments().create();
// .then(res => console.log(res.data))
// .catch((error) => console.log(error, 'error'));