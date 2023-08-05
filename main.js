import { promises as fs } from "fs";

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  //Obtener todos los productos
  async getProducts() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.log("No se puede leer el archivo", error);
      return [];
    }
  }

  //Obtener productos por Id
  async getProductById(id) {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      const products = JSON.parse(data);
      const product = products.find((prod) => prod.id === id);

      if (product) {
        console.log(product);
      } else {
        console.log("Producto no encontrado");
      }
    } catch (error) {
      console.log("No se puede leer el archivo", error);
    }
  }

  //Agregar un producto
  async addProduct(product) {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      const products = JSON.parse(data);
      const prodCode = products.find((prod) => prod.code === product.code);
      const prodId = products.find((prod) => prod.id === product.id);

      if (prodCode || prodId) {
        console.log("Producto existente");
      } else {
        products.push(product);
        await fs.writeFile(this.path, JSON.stringify(products));
      }
    } catch (error) {
      console.log("No se puede leer el archivo", error);
    }
  }

  //Actualizar un producto
  async updateProduct(id, product) {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      const products = JSON.parse(data);
      const index = products.findIndex((prod) => prod.id === id);

      if (index != -1) {
        products[index].tittle = product.titte;
        products[index].description = product.description;
        products[index].price = product.price;
        products[index].image = product.image;
        products[index].code = product.code;
        products[index].stock = product.stock;
        await fs.writeFile(this.path, JSON.stringify(products));
      } else {
        console.log("No existe el producto");
      }
    } catch (error) {
      console.log("No se puede leer el archivo, error");
    }
  }

  //Eliminar un producto
  async deleteProduct(id) {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      const products = JSON.parse(data);
      const product = products.find((prod) => prod.id === id);

      if (product) {
        await fs.writeFile(
          this.path,
          JSON.stringify(products.filter((prod) => prod.id != id))
        );
        return;
      } else {
        console.log("No existe el producto");
      }
    } catch (error) {
      console.log("No se puede leer el archivo,error", error);
    }
  }
}

class Product {
  constructor(title, description, price, image, code, id) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.image = image;
    this.code = code;
    this.id = Product.idIncrement(2);
  }
  static idIncrement() {
    if (this.idIncrement) {
      this.idIncrement++;
    } else {
      this.idIncrement = 1;
    }
    return this.idIncrement;
  }
}

const filePath = new ProductManager("./products.json");

const perfume = new ProductManager(
  "212 Vip - Carolina Herrera",
  "Un perfume oriental-amaderado con notas frescas y dulces, diseñado para destacar con un toque de exclusividad",
  48000,
  "./img/212CH",
  101,
  2
);
