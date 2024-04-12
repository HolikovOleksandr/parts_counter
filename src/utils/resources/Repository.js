import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const API = process.env.ENDPOINT;

export class Repository {
  static postEmployeeData = async (employee) => {
    await axios
      .post(API, { data: { employee } })
      .catch((err) => console.log(err));
  };

  static findAllEmployes = async () => {
    return await axios.get(API).catch((err) => console.log(err));
  };

  static findEmployeeById = async (id) => {
    return await axios
      .get(`${API}/search_or?id=${id}`)
      .then((res) => res.data[0])
      .catch((err) => console.log(err));
  };

  static getAllDetails = async () => {
    return await axios
      .get(`${API}/keys`)
      .then((res) => res.data.slice(3))
      .catch((err) => console.log(err));
  };

  static addDetailsToDb = async (id, part, amount) => {
    try {
      const data = await this.findEmployeeById(id);
      data[part] = Number(data[part]) + amount;

      await axios.patch(`${API}/id/${id}`, { data });
    } catch (error) {
      console.error(error);
    }
  };

  static showDetailsAmoint = async (employeeId) => {
    try {
      const { id, name, phone, ...details } = await this.findEmployeeById(
        employeeId
      );
      const detailsData = { ...details };
      return detailsData;
    } catch (error) {
      console.error(error);
    }
  };
}
