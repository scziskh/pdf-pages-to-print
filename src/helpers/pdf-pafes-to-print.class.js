export class PdfPagesToPrint {
  #pdf;
  #params;

  constructor(pdf, params) {
    this.#pdf = pdf;
    this.#params = params;
  }

  async getFileName() {
    return await this.#pdf.getTitle();
  }

  async getPagesCount() {
    const result = await this.#pdf.getPageCount();
    return await Promise.resolve(result);
  }

  // get sheets count
  async getSheetsCount() {
    const pages = await this.getPagesCount();
    const sides = Number(this.#params.sides);
    const result = Math.ceil(pages / sides);

    return result;
  }

  // get perforation count
  async getPerforationCount() {
    const result = this.#params.perforation ? await this.getSheetsCount() : 0;
    console.log({ result });
    return Number(result);
  }

  // get binding (staples, folder, none)
  async getBinding() {
    if (this.#params.binding !== `none`) {
      return this.#params.binding;
    }
    return;
  }
}
