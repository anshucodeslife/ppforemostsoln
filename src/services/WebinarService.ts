import interceptor from "../interceptor";

export const WebinarService = {

    async getWebinarRegistrations(): Promise<any> {
        try {
            const response = await interceptor.get('/webinarregistrations', {
                withCredentials: true
            });
            return response.data;
        } catch (error: any) {

        }
    },

    async addPayment(id: number): Promise<any> {
        try {
            const response = await interceptor.patch(`/addpayment?id=${id}`, {
                withCredentials: true
            });
            return response.data;
        } catch (error: any) {

        }
    }

};