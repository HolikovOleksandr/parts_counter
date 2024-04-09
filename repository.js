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

  static finadAllEmployes = async () => {
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

  static getPartsArray = async () => {
    return await axios
      .get("https://sheetdb.io/api/v1/of491sgneuxt7/keys")
      .then((res) => res.data.slice(3))
      .catch((err) => console.log(err));
  };
}
