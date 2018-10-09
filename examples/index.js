#!/usr/bin/env

const { Samanage } = require('../dist/')

const RESOURCE = process.argv[2]

console.log(Samanage);

;(async () => {
  const samanage = new Samanage(process.env.SAMANAGE_KEY)
  try {
    switch (RESOURCE) {
      case 'users':
        console.log(samanage)
        const users = await samanage.users().get({ per_page: 1 })
        console.log(users)
        break
      case 'audit':
        const audit = await samanage.audit.get()
        console.log(audit)
        break
      case 'catalogItems':
        const catalogItems = await samanage.catalogItems.get()
        console.log(catalogItems)
        break
      case 'categories':
        const categories = await samanage.categories.get()
        console.log(categories)
        break
      default:
        console.log(`${RESOURCE} not found, please try a different command`)
    }

  } catch (e) {
    console.log(e, 'error')
  }


})()


