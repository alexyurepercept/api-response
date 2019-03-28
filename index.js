/**
 * @typedef {Object} APIError
 * @property {string} code The code of the error
 * @property {string} message The description of the error
 */

/**
 * @typedef {Object} APISuccessListResponse
 * @property {Array} items A list of items to return
 */

/**
 * @typedef {Object} APISuccessResponse
 * @property {Object} item An item to return
 */

/**
 * @typedef {Object} APIErrorResponse
 * @property {Array} errors Contains a list of API Errors
 */

/**
 * Class APIResponse constructor
 */
class APIResponse {
  constructor() {
    this.errors = [];
    this.data = {};
  }

  /**
   * Add an error object to the api response
   * @param {Error | APIError} err - The handcrafted error object or nodejs native Error object
   * @returns {APIResponse}
   */
  addError(err) {
    if (err instanceof Error) {
      this.errors.push({
        code: "UNKNOWN",
        message: err.stack
      });
    } else if (err) {
      this.errors.push(err);
    }

    return this;
  }

  /**
   * returns an instance of APIGatewayResponse
   * @returns {APIGatewayResponse}
   */
  apiGateway() {
    return new APIGatewayResponse(this);
  }

  /**
   * serialize the api response to a json object
   * @returns {APIErrorResponse|APISuccessListResponse|APISuccessResponse}
   */
  serialize() {
    if (this.errors.length > 0) {
      return {
        errors: this.errors
      };
    } else {
      if (Array.isArray(this.data)) {
        return {
          items: this.data
        };
      } else {
        return {
          item: this.data
        };
      }
    }
  }
}

/**
 * Class APIGatewayResponse constructor
 */
class APIGatewayResponse {
  /**
   *
   * @param {APIResponse} apiResponse
   */
  constructor(apiResponse) {
    this.apiResponse = apiResponse;
  }

  /**
   * serialize the api response to a json object which will be used by AWS API Gateway
   * @param {number} statusCode
   * @param {Object} headers
   */
  serialize(statusCode, headers) {
    return {
      statusCode: statusCode || 200,
      headers: headers || {},
      body: JSON.stringify(this.apiResponse.serialize())
    };
  }
}

module.exports = APIResponse;
