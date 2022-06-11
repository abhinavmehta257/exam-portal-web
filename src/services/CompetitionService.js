import Axios from '../helper/axios';
import { BASE_URL } from '../helper/common';

const axios = new Axios();

export default class CompetitionService {
    static async deletePromoCode(promoId = '') {
        const option = {
            url: `${BASE_URL}/competition/promo/${promoId}`,
        };
        console.log(option)
        return axios.delete(option);
    }

    static async updateResult(competitionId, resultOut) {
        const option = {
            url: `${BASE_URL}/competition/result/${competitionId}`,
            data: {
                resultOut
            }
        };
        return axios.patch(option);
    }
}