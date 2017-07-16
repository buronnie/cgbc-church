import { apiUrl } from '../config/api.js';
import Base from './base';

class Offer extends Base {
  constructor() {
    super();
    this.resource = 'offers';
    this.url = `${apiUrl}/v1/${this.resource}`;
  }
}

export default new Offer();
