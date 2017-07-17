// provide common restful api methods
import $ from 'jquery';

class Base {
  index = () => {
    return $.ajax({
      url: this.url,
      type: 'GET'
    });
  };

  show = (id) => {
    return $.ajax({
      url: `${this.url}/${id}`,
      type: 'GET'
    });
  };

  newItem = () => {
    return $.ajax({
      url: `${this.url}/new`,
      type: 'GET'
    });
  };

  create = (item) => {
    return $.ajax({
      url: this.url,
      type: 'POST',
      data: item
    });
  };

  update = (item) => {
    return $.ajax({
      url: `${this.url}/${item.id}`,
      type: 'PUT',
      data: item
    });
  };

}

export default Base;
