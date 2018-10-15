#!/usr/bin/env node

import axios, { AxiosPromise, AxiosInstance } from 'axios'

interface Parameters {
  [key: string]: string
}
/**
 * An interface with the REST methods for interacting with the Samanage API
 *
 * @interface ResourceMethods
 */
interface ResourceMethods {
  /**
   * Get the specified endpoint
   * @param {Parameters} parameters - An object containing query parameters and or an id.
   *   If an id is present, it will be added to the resource URI. EG /hardwares/${ID}.json?param1=value
   * @returns {AxiosPromise}
   * @memberof EndpointOperations
   */
  get?(parameters: Parameters): AxiosPromise
  /**
   * Create a new resource
   * @param {object} data - An object with the information of your new item
   * @returns {AxiosPromise}
   * @memberof EndpointOperations
   */
  create?(data: object): AxiosPromise
  /**
   * Update the specified resource
   * @param {string} id - The id of the reosource to update
   * @param {object} data - The data for the updated resource
   * @returns {AxiosPromise}
   * @memberof EndpointOperations
   */
  update?(id: string, data: object): AxiosPromise
  /**
   * Delete the specified resource
   * @param {string} id - The id of the reosource to update
   * @returns {AxiosPromise}
   * @memberof EndpointOperations
   */
  delete?(id: string): AxiosPromise
}

/** Class for interacting with the Samanage API*/
export class Samanage {
  /**
   * @constructor
   * @param {string} key - Samanage API Key
   * @param {string} [version=2.1]- Samanage API version
   * @param {string} [contentType=json] - JSON or XML
   */
  contentType: string
  axios: AxiosInstance
  constructor(key: string, version = '2.1', contentType = 'json') {
    if (!key || typeof key !== 'string') throw 'An API Key is required'
    this.axios = axios.create({
      baseURL: 'https://api.samanage.com'
    })
    this.axios.defaults.headers.common[
      'X-Samanage-Authorization'
    ] = `Bearer ${key}`
    this.axios.defaults.headers.common[
      'Accept'
    ] = `application/vnd.samanage.v${version}+${contentType}`
    this.axios.defaults.headers.common[
      'Content-Type'
    ] = `application/${contentType}`
    this.contentType = contentType
  }
  /**
   * Creates a string of query parameters using an objects key/value pairs
   * @param {object} parameters
   * @returns {string}
   */
  createQueryString(parameters: Parameters): string {
    return Object.keys(parameters)
      .map(key => `${key} = ${parameters[key]}`)
      .reduce((previous, current) => `${previous} ${current}& `, '?')
      .slice(0, -1) // Removes dangling '&'
  }

  /**
   * Gets a specified resource.
   * @param {string} resourceName - Name of the Samange resource. EX 'hardware' 'users'
   * @param {object} parameters - Uses the objects' key/value pairs to create query parameters. EX { per_page: 10 } = ?per_page=10
   * @returns {AxiosPromise}
   */
  get(resourceName: string, parameters: Parameters = {}): AxiosPromise {
    let id = null
    if (parameters.id) {
      id = parameters.id
      delete parameters.id
    }
    console.log(parameters, 'params')
    console.log(id, 'id')
    return this.axios.get(
      `/${resourceName}${id ? '/' + id : ''}.${
        this.contentType
      }${this.createQueryString(parameters)} `
    )
  }

  /**
   * Updates a specified resource
   * @param {string} resourceName - Name of the Samange resource. EX 'hardware' 'users'
   * @param {string} id - The id of the resource
   * @param {object} data - An object containing the fields to be update. EX { user: { email: 'NewEmail@domain.com' } }
   * @returns {Promise}
   */
  update(resourceName: string, id: string, data: object) {
    return this.axios.put(`/${resourceName}/${id}.${this.contentType}`, data)
  }

  /**
   * Deletes a specified resource
   * @param {string} resourceName - Name of the Samange resource. EX 'hardware' 'users'
   * @param id
   * @param {string} id - The id of the resource
   * @returns {Promise}
   */
  delete(resourceName: string, id: string) {
    return this.axios.delete(`/${resourceName}/${id}.${this.contentType}`)
  }

  /**
   * Creates a specified resource
   * @param {string} resourceName - Name of the Samange resource. EX 'hardware' 'users'
   * @param {object} data - An object containing the resources fields. EX { user: { email: 'NewEmail@domain.com' } }
   * @returns {Promise}
   */
  create(resourceName: string, data: object) {
    return this.axios.post(`${resourceName}.json`, data)
  }

  /**
   * Returns a function that logs the error followed by your message
   * @private
   * @param {string} msg - The message to dispaly with the error
   * @returns {function(string)}
   * @memberof Samanage
   */
  private logError(msg: string) {
    return (error: string) => {
      // eslint-disable-next-line no-console
      console.log(error, msg)
    }
  }

  attachments: ResourceMethods = {
    create: this.create.bind(this, 'attachments')
  }

  audit: ResourceMethods = {
    get: this.get.bind(this, 'audits')
  }

  catalogItems: ResourceMethods = {
    create: this.create.bind(this, 'catalog_items'),
    get: this.get.bind(this, 'catalog_items'),
    update: this.update.bind(this, 'catalog_items')
  }

  categories: ResourceMethods = {
    create: this.create.bind(this, 'categories'),
    get: this.get.bind(this, 'categories'),
    update: this.update.bind(this, 'categories'),
    delete: this.delete.bind(this, 'categories')
  }

  changes: ResourceMethods = {
    create: this.create.bind(this, 'changes'),
    get: this.get.bind(this, 'changes'),
    update: this.update.bind(this, 'changes'),
    delete: this.delete.bind(this, 'changes')
  }

  comments(): never {
    throw 'error, feature not implemented'
  }

  configurationItems: ResourceMethods = {
    create: this.create.bind(this, 'configuration_items'),
    get: this.get.bind(this, 'configuration_items'),
    update: this.update.bind(this, 'configuration_items'),
    delete: this.delete.bind(this, 'configuration_items')
  }

  contracts: ResourceMethods = {
    create: this.create.bind(this, 'contracts'),
    get: this.get.bind(this, 'contracts'),
    update: this.update.bind(this, 'contracts'),
    delete: () => {
      throw 'delete is not a function for contracts'
    }
  }

  departments: ResourceMethods = {
    create: this.create.bind(this, 'departments'),
    get: this.get.bind(this, 'departments'),
    update: this.update.bind(this, 'departments'),
    delete: this.delete.bind(this, 'departments')
  }

  groups: ResourceMethods = {
    create: this.create.bind(this, 'groups'),
    get: this.get.bind(this, 'groups'),
    update: this.update.bind(this, 'groups'),
    delete: this.delete.bind(this, 'groups')
  }

  hardware: ResourceMethods = {
    create: this.create.bind(this, 'hardwares'),
    get: this.get.bind(this, 'hardwares'),
    update: this.update.bind(this, 'hardwares'),
    delete: this.delete.bind(this, 'hardwares')
  }

  incidents: ResourceMethods = {
    create: this.create.bind(this, 'incidents'),
    get: this.get.bind(this, 'incidents'),
    update: this.update.bind(this, 'incidents'),
    delete: this.delete.bind(this, 'incidents')
  }

  items(): never {
    throw 'error feature not implemented'
  }

  memberships: ResourceMethods = {
    create: this.create.bind(this, 'memberships'),
    get: this.get.bind(this, 'memberships'),
    update: this.update.bind(this, 'memberships'),
    delete: this.delete.bind(this, 'memberships')
  }

  mobiles: ResourceMethods = {
    create: this.create.bind(this, 'mobiles'),
    get: this.get.bind(this, 'mobiles'),
    update: this.update.bind(this, 'mobiles'),
    delete: this.delete.bind(this, 'mobiles')
  }

  otherAssets: ResourceMethods = {
    create: this.create.bind(this, 'other_assets'),
    get: this.get.bind(this, 'other_assets'),
    update: this.update.bind(this, 'other_assets'),
    delete: this.delete.bind(this, 'other_assets')
  }

  printers: ResourceMethods = {
    get: this.get.bind(this, 'printers')
  }

  problems: ResourceMethods = {
    create: this.create.bind(this, 'problems'),
    get: this.get.bind(this, 'problems'),
    update: this.update.bind(this, 'problems'),
    delete: this.delete.bind(this, 'problems')
  }

  purchae = () => {
    throw 'error purchaes not implemented'
  }

  purchaseOrders: ResourceMethods = {
    create: this.create.bind(this, 'purchase_orders'),
    get: this.get.bind(this, 'purchase_orders'),
    update: this.update.bind(this, 'purchase_orders'),
    delete: this.delete.bind(this, 'purchase_orders')
  }

  releases: ResourceMethods = {
    create: this.create.bind(this, 'releases'),
    get: this.get.bind(this, 'releases'),
    update: this.update.bind(this, 'releases'),
    delete: this.delete.bind(this, 'releases')
  }

  risks: ResourceMethods = {
    get: this.get.bind(this, 'risks')
    // getForHardware: (hardwareId: string) => this.get(`hardwares/${hardwareId}/risks.${this.contentType}`)
  }

  roles: ResourceMethods = {
    create: this.create.bind(this, 'role'),
    get: this.get.bind(this, 'role')
  }

  serviceRequests = () => {
    throw 'error feature not implemented'
  }

  sites: ResourceMethods = {
    create: this.create.bind(this, 'sites'),
    get: this.get.bind(this, 'sites'),
    update: this.update.bind(this, 'sites'),
    delete: this.delete.bind(this, 'sites')
  }

  software: ResourceMethods = {
    get: this.get.bind(this, 'softwares')
  }

  solutions: ResourceMethods = {
    create: this.create.bind(this, 'solutions'),
    get: this.get.bind(this, 'solutions'),
    update: this.update.bind(this, 'solutions'),
    delete: this.delete.bind(this, 'solutions')
  }

  tasks(): never {
    throw 'error feature not implemented'
  }

  timeTracks(): never {
    throw 'error feature not implemented'
  }

  users: ResourceMethods = {
    create: this.create.bind(this, 'users'),
    get: this.get.bind(this, 'users'),
    update: this.update.bind(this, 'users'),
    delete: this.delete.bind(this, 'users')
  }

  vendor: ResourceMethods = {
    get: this.get.bind(this, 'vendors')
  }

  warranties = () => {
    throw 'error feature not implemented'
  }
}
