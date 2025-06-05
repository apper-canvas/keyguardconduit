import appSettingsData from '../mockData/appSettings.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let settings = { ...appSettingsData }

const appSettingsService = {
  async getAll() {
    await delay(200)
    return { ...settings }
  },

  async getById(id) {
    await delay(150)
    return { ...settings }
  },

  async create(settingsData) {
    await delay(300)
    settings = {
      ...settings,
      ...settingsData
    }
    return { ...settings }
  },

  async update(id, updateData) {
    await delay(250)
    settings = {
      ...settings,
      ...updateData
    }
    return { ...settings }
  },

  async delete(id) {
    await delay(200)
    settings = {
      theme: 'dark',
      autoLockTimeout: 300,
      defaultTokenPeriod: 30,
      defaultTokenDigits: 6
    }
    return true
  }
}

export default appSettingsService