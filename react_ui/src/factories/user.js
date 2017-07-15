import { apiUrl } from '../config/api.js';
import Base from './base';

class User extends Base {
  constructor() {
    super();
    this.resource = 'users';
    this.url = `${apiUrl}/v1/${this.resource}`;
  }
}

export default new User();
