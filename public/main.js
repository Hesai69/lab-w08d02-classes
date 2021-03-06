console.log('🐱');

class Kitten {
  constructor(cat) {
    this._attributes = cat;
  }
  meow() {
    console.log(this._attributes.name + ' says meow');
  }
  get(attribute) {
    return this._attributes[attribute];
  }
  set(attribute, value) {
    this._attributes[attribute] = value;
  }
  save() {
    $.ajax({
      method: 'PUT',
      url: '/kittens/' + this._attributes._id,
      data: {kitten: this._attributes}
    })
    .then(response => {
      console.log(response);
    })
  }
  remove() {
    $.ajax({
      method: 'DELETE',
      url: '/kittens/' + this._attributes._id,
    })
    .then(response => {
      console.log(response);
    })
  }
  static create(kitten) {
    $.ajax({
      method: 'POST',
      url: '/kittens',
      data: {kitten: kitten}
    })
    .then(response => {
      Kitten.fetch();
      console.log(response)
    })
  }
  static fetch() {
    $.ajax({
      method: 'GET',
      url: '/kittens',
    })
    .then(response => {
      console.log(response)
      Kitten.allKittens = [];
      response.forEach(function(kitten) {
        var cat = new Kitten(kitten)
        Kitten.allKittens.push(cat)
      })
    })
  }
  static all() {
    if (Kitten.allKittens) {
      return Kitten.allKittens;
    } else {
      return Kitten.allKittens = [];
    }
  }
  static first() {
    return Kitten.allKittens[0];
  }
  static last() {
    return Kitten.allKittens[Kitten.allKittens.length - 1];
  }
  static meow() {
    Kitten.allKittens.forEach(function(kitten){
      kitten.meow()
    })
  }
}



const kitten = new Kitten({name: 'tiny', _id: '589111409726576f13a68419'})


console.log(kitten)
