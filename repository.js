import axios from "axios";

export class Repository {
  static postEmployeeData = async (employeeData) => {
    await axios
      .post("https://sheetdb.io/api/v1/of491sgneuxt7", {
        data: { ...employeeData },
      })
      .then((res) => console.log("POST EMPLOYEE =>", res.status))
      .catch((err) => console.log(err));
  };

  static findAllEmployes = async () => {
    return await axios
      .get("https://sheetdb.io/api/v1/of491sgneuxt7/")
      .catch((err) => console.log(err));
  };

  static findEmployeeById = async (id) => {
    return await axios
      .get(`https://sheetdb.io/api/v1/of491sgneuxt7/search_or?Id=${id}`)
      .then((res) => res.data[0])
      .catch((err) => console.log(err));
  };

  static getAllParts = async () => {
    return await axios
      .get("https://sheetdb.io/api/v1/of491sgneuxt7/keys")
      .then((res) => res.data.slice(3))
      .catch((err) => console.log(err));
  };

  static addParts = async (id, part, amount) => {
    const uri = `https://sheetdb.io/api/v1/of491sgneuxt7/Id/${id}`;

    try {
      const data = await this.findEmployeeById(id);
      data[part] = (Number(data[part]) || 0) + Number(amount);

      await axios.patch(uri, { data });

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
}
