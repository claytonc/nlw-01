import axios from 'axios';

interface ItemResponse {
  id: number;
  title: string;
  image_url: string;
}

interface PointResponse {
  point: {
    image: string;
    image_url: string;
    name: string;
    email:string;
    whatsapp: string;
    city: string;
    uf: string;
  };
  items: {
    title: string;
  }[];
}

interface PointsResponse {
  id: number;
  name: string;
  image: string;
  image_url: string;
  latitude: number;
  longitude: number;
}


class EcoletaServiceAPI {
  private baseURL: string;
  constructor() {
    this.baseURL = "https://192.168.1.128:3333"
  }

  async searchItems(): Promise<ItemResponse[]> {
    return await axios({
        method: 'get',
        baseURL: this.baseURL,
        url: '/items',
      })
      .then(response => {
        return response.data
      }).catch(error =>{
        throw error;
      })
  }

  async searchPoint( id: number): Promise<PointResponse> {
    return await axios({
        method: 'get',
        baseURL: this.baseURL,
        url: `/points/${id}`,
      })
      .then(response => {
        return response.data
      }).catch(error =>{
        throw error;
      })
  }

  async searchPoints(city: string, uf: string, items: number[] ): Promise<PointsResponse[]> {
    return await axios({
        method: 'get',
        baseURL: this.baseURL,
        url: '/points',
        params: { city, uf, items }
      })
      .then(response => {
        return response.data
      }).catch(error =>{
        throw error;
      })
  }

  async insertPoint( data: FormData ): Promise<any> {
    return await axios({
        method: 'post',
        baseURL: this.baseURL,
        url: '/points',
        data: data
      })
      .then(response => {
        console.log(response.data);
      }).catch(error =>{
        console.log(error);
      })
  }

}


export default new EcoletaServiceAPI();
