import SecretData from '@/classes/secret_data'
import { DateTime } from 'luxon'

export default class Secret {
  constructor({secretId = '', vaultId = '', teamId = '', createdAt, updatedAt, vaultVersion, data} = {}) {
    this.secretId = secretId
    this.vaultId = vaultId
    this.teamId = teamId
    this.vaultVersion = vaultVersion
    this._createdAt = createdAt
    this._updatedAt = updatedAt
    this.data = new SecretData()
    if(data) {
      if(data instanceof SecretData) {
        this.data = data
      } else {
        this.data.fromJson( data )
      }
    }
  }
  get fullId() {
    return `${this.teamId}.${this.vaultId}.${this.secretId}`
  }
  get createdAt() {
    return DateTime.fromISO(this._createdAt)
  }
  get updatedAt() {
    return DateTime.fromISO(this._updatedAt)
  }
  cloneAsObject() {
    return {
      secretId: this.secretId,
      vaultId: this.vautId,
      teamId: this.teamId,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      vaultVersion: this.vaultVersion,
      data: this.data.cloneAsObject()
    }
  }
}
