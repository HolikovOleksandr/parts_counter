export class Employee {
  constructor(id, name, phone) {
    this.id = id;
    this.name = name;
    this.phone = phone;
  }

  toObject() {
    return {
      id: this.id,
      name: this.name,
      phone: this.phone,
    };
  }
}
