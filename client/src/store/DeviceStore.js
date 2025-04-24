import { makeAutoObservable } from "mobx";

export default class DeviceStore {
  constructor() {
    this._types = [
      { id: 1, name: "Холодильники" },
      { id: 2, name: "Смартфоны" },
    ];
    this._brands = [
      { id: 1, name: "Samsung" },
      { id: 2, name: "Apple" },
    ];
    this._devices = [
      {
        id: 1,
        name: "IPhone 12 PRO",
        price: 100000,
        rating: 5,
        img: `./img/iPhone.jpg`,
      },
      {
        id: 2,
        name: "Laptop Acer i5",
        price: 120000,
        rating: 5,
        img: `./img/laptop_i5.jpg`,
      },
      {
        id: 3,
        name: "Phone cover",
        price: 1000,
        rating: 5,
        img: `./img/phone_cover.jpg`,
      },
      {
        id: 4,
        name: "Fridge",
        price: 10000,
        rating: 5,
        img: `./img/fridge.jpg`,
      },
      {
        id: 5,
        name: "ulePhone",
        price: 17000,
        rating: 5,
        img: `./img/ulePhone.jpg`,
      },
    ];
    makeAutoObservable(this);
  }

  setTypes(types) {
    this._types = types;
  }
  setBrands(brands) {
    this._brands = brands;
  }

  setDevices(devices) {
    this._devices = devices;
  }

  get types() {
    return this._types;
  }

  get brands() {
    return this._brands;
  }

  get devices() {
    return this._devices;
  }
}
