import api from '../utils/api';
import { firstUrlData, secondUrlData, thirdUrlData } from '../store';

// Get First Data
export const getFirstUrlData = async (name, date) => {
  try {
    const res = await api.get(`/f1?before=${date}&limit=20&name=${name}`);

    firstUrlData.set({
      name: res.Name,
      symbol: res.Symbol,
      date: res.Date,
      movingAverage: res["20 Moving Average"]
    });
  } catch (error) {
    console.log(error);
  }
}

// Get Second Data
export const getSecondUrlData = async (name) => {
  try {
    const res = await api.get(`/f2?name=${name}`);

    secondUrlData.set({
      movingAverage: res["50 moving average"],
      stock: res.Stock
    });
  } catch (error) {
    console.log(error);
  }
}

// Get Third Data
export const getThirdUrlData = async (name) => {
  try {
    const res = await api.get(`/f3?name=${name}`);

    thirdUrlData.set({
      buyConditions: res["Buy conditions"],
      decision: res.Decision
    });
  } catch (error) {
    console.log(error);
  }
}