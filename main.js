class HashTable
{
  constructor(size) {
    this.items = new Array(size);
    for (let index = 0; index < size; index++) {
      this.items[index] = { head: null, tail: null };
    }
    this.size = size;
  }
  _hash(key) {
    if (typeof key === 'number') return parseInt(key) % this.size;
    let hash = 0;
    for (let i = 0; i < key.length; i++){
        hash = (hash + key.charCodeAt(i) * i) % this.size;
    }
    return hash;
  }
  add(key, value) {
    const index = this._hash(key);
    const item = this.items[index];
    const newNode = {
      key,
      value,
      next: null
    };

    if (!item.head) {
      item.head = newNode;
      item.tail = item.head;
    } else {
      item.tail = item.tail.next = newNode;
    }
  }
  remove(key) {
    const index = this._hash(key);
    const item = this.items[index];

    if (!item.head) return;
    
    if (item.head.key === key) {
      item.head = item.head.next;
    } else {
      let beforeNode = item.head;
      let deleteNode = beforeNode.next;
      
      while (deleteNode !== null && deleteNode.key !== key) {
        beforeNode = deleteNode;
        deleteNode = deleteNode.next;
      }

      if (deleteNode !== null) beforeNode.next = deleteNode.next;
    }
  }
  keys() {
    const keys = [];

    for (let item of this.items) {
      if (item.head !== null) {
        let iterNode = item.head;
        while (iterNode) {
          keys.push(iterNode.key);
          iterNode = iterNode.next;
        }
      }
    }
    return keys;
  }
  values() {
    const values = [];

    for (let item of this.items) {
      if (item.head !== null) {
        let iterNode = item.head;
        while (iterNode) {
          values.push(iterNode.value);
          iterNode = iterNode.next;
        }
      }
    }
    return values;
  }
}

const table = new HashTable(1);
