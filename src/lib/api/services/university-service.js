import { env } from '../../constants/env'
import { Client } from '../client'

export class UniversityService {
  
  static client = new Client(env.UNIVERSITY_API_URL)
  
  constructor() {}
  
  static async getAllPrograms(params) {
    
    return UniversityService.client.get('https://dev-university-service.uniadmire.com/api/programs', { params })
  }
  
  static async getAllProgramsNames(params) {
    return UniversityService.client.get('https://dev-university-service.uniadmire.com/api/programs/all-names', { params })
  }
  
  static getCountries() {
    return UniversityService.client.get('https://dev-university-service.uniadmire.com/api/universities/countries')
  }
  
  static async getUniversitiesIdsAndNames() {
    return UniversityService.client.get('https://dev-university-service.uniadmire.com/api/universities/ids-and-names')
  }
  
  static async getUniversitiesCount() {
    return UniversityService.client.get('https://dev-university-service.uniadmire.com/api/metadata/public/universities-count')
  }
}
