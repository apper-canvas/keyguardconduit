import accountsData from '../mockData/accounts.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let accounts = [...accountsData]

const accountService = {
  async getAll() {
    await delay(300)
    return [...accounts]
  },

  async getById(id) {
    await delay(200)
    const account = accounts.find(acc => acc.id === id)
    if (!account) {
      throw new Error('Account not found')
    }
    return { ...account }
  },

  async create(accountData) {
    await delay(400)
    const newAccount = {
      id: Date.now().toString(),
      ...accountData,
      issuer: accountData.serviceName,
      algorithm: accountData.algorithm || 'SHA1',
      digits: accountData.digits || 6,
      period: accountData.period || 30,
      iconUrl: '',
      createdAt: new Date().toISOString(),
      lastUsed: new Date().toISOString()
    }
    accounts.push(newAccount)
    return { ...newAccount }
  },

  async update(id, updateData) {
    await delay(350)
    const index = accounts.findIndex(acc => acc.id === id)
    if (index === -1) {
      throw new Error('Account not found')
    }
    
    accounts[index] = {
      ...accounts[index],
      ...updateData,
      lastUsed: new Date().toISOString()
    }
    return { ...accounts[index] }
  },

  async delete(id) {
    await delay(250)
    const index = accounts.findIndex(acc => acc.id === id)
    if (index === -1) {
      throw new Error('Account not found')
    }
    
    accounts.splice(index, 1)
    return true
  }
}

export default accountService