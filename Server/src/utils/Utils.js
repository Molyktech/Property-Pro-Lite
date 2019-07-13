export default class Util {
    constructor() {
        this.statusCode = null;
        this.type = null;
        this.data = null;
        this.message = null;
        this.error = null;

    }

    static setSuccess(statusCode, message, data) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.type = 'success';
    }

    static setError(statusCode, error) {
        this.statusCode = statusCode;
        this.error = error;

        this.type = 'error';
    }

    static send(res) {
        const result = {
            status: this.type,
            message: this.message,
            data: this.data,
        };

        if (this.type === 'success') {
            return res.status(this.statusCode).json(result);
        }
        return res.status(this.statusCode).json({
            status: this.type,
            error: this.error,
        });
    }
}