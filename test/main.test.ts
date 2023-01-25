const { main } = require("../src/main");

describe("Deve criar um pedido", () => {
  it("Com 3 produtos (com descrição, preço e quantidade) e calcular o valor total", () => {
    const products = [
      { sku: 0, description: "order n0", price: 13, amount: 2, discount: 0 },
      { sku: 1, description: "order n1", price: 13, amount: 2, discount: 0 },
      { sku: 2, description: "order n2", price: 100, amount: 2, discount: 0 },
    ];

    const order = main(products, "204.845.200-08");
    expect(order.total).toBe(126);
  });

  it("Com 3 produtos, associar um cupom de desconto e calcular o total (percentual sobre o total do pedido)", () => {
    const products = [
      { sku: 0, description: "order n0", price: 13, amount: 2, discount: 0 },
      { sku: 1, description: "order n1", price: 13, amount: 2, discount: 10 },
      { sku: 2, description: "order n2", price: 100, amount: 2, discount: 0 },
    ];

    const order = main(products, "204.845.200-08");
    expect(order.total).toBe(116);
  });
});

describe("Não deve criar um pedido com cpf inválido", () => {
  it("com cpf inválido", () => {
    const products = [
      { sku: 0, description: "order n0", price: 13, amount: 2, discount: 0 },
      { sku: 1, description: "order n1", price: 13, amount: 2, discount: 10 },
      { sku: 2, description: "order n2", price: 100, amount: 2, discount: 0 },
    ];

    expect(() => main(products, "204.845.300-08")).toThrow("CPF inválido");
  });
  it("com cpf vazio", () => {
    const products = [
      { sku: 0, description: "order n0", price: 13, amount: 2, discount: 0 },
      { sku: 1, description: "order n1", price: 13, amount: 2, discount: 10 },
      { sku: 2, description: "order n2", price: 100, amount: 2, discount: 0 },
    ];

    expect(() => main(products, "")).toThrow("CPF inválido");
  });
  it("com cpf null", () => {
    const products = [
      { sku: 0, description: "order n0", price: 13, amount: 2, discount: 0 },
      { sku: 1, description: "order n1", price: 13, amount: 2, discount: 10 },
      { sku: 2, description: "order n2", price: 100, amount: 2, discount: 0 },
    ];

    expect(() => main(products)).toThrow("CPF inválido");
  });
  it("com cpf incompleto", () => {
    const products = [
      { sku: 0, description: "order n0", price: 13, amount: 2, discount: 0 },
      { sku: 1, description: "order n1", price: 13, amount: 2, discount: 10 },
      { sku: 2, description: "order n2", price: 100, amount: 2, discount: 0 },
    ];

    expect(() => main(products, "204.845.")).toThrow("CPF inválido");
  });
});
