import axios from 'axios';

interface UFResponse {
  sigla: string;
}

interface CitiesResponse {
  nome: string;
}

class ServiceIBGEAPI {
  protected baseURL: string;

  constructor () {
    this.baseURL = 'https://servicodados.ibge.gov.br/api/v1/localidades';
  }

  async searchUF(): Promise<UFResponse[]> {
    return await axios.get(`${this.baseURL}/estados`)
      .then(response => {
        return response.data
      }).catch(error =>{
        throw error;
      })
  }

  async searchCityUF(uf: string): Promise<CitiesResponse[]> {
    return await axios.get(`${this.baseURL}/estados/${uf}/municipios`)
    .then(response => {
      return response.data
    }).catch(error =>{
      throw error;
    });
  }
};

export default new ServiceIBGEAPI();
