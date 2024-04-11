import axios from 'axios';

export class Repository {
  static postEmployeeData = async (employee) => {
    await axios
      .post('https://sheetdb.io/api/v1/of491sgneuxt7', { data: { employee } })
      .catch((err) => console.log(err));
  };

  static findAllEmployes = async () => {
    return await axios
      .get('https://sheetdb.io/api/v1/of491sgneuxt7/')
      .catch((err) => console.log(err));
  };

  static findEmployeeById = async (id) => {
    return await axios
      .get(`https://sheetdb.io/api/v1/of491sgneuxt7/search_or?id=${id}`)
      .then((res) => res.data[0])
      .catch((err) => console.log(err));
  };

  static getAllDetails = async () => {
    return await axios
      .get('https://sheetdb.io/api/v1/of491sgneuxt7/keys')
      .then((res) => res.data.slice(3))
      .catch((err) => console.log(err));
  };

  static addDetailsToDatabase = async (id, part, amount) => {
    const uri = `https://sheetdb.io/api/v1/of491sgneuxt7/id/${id}`;

    try {
      const data = await this.findEmployeeById(id);
      data[part] = Number(data[part]) + amount;

      await axios.patch(uri, { data });
    } catch (error) {
      console.error(error);
    }
  };
}
