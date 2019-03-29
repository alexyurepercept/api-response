# API Response


## Install
```
npm install --save @repercept/api-response
```

## Getting Started


#### Success response
```
const APIResponse = require('@repercept/api-response')

let apiResp = new APIResponse()
APIResponse.data = {"status": "ok"}
apiResp.serialize() // {"item": {"status": "ok"}}

APIResponse.data = [{"id": 1}, {"id": 2}]
apiResp.serialize() // {"items": [{"id": 1}, {"id": 2}]}

```


#### Error response
```
const APIResponse = require('@repercept/api-response')

let apiResp = new APIResponse()
let err = new Error()
APIResponse.addError(err)
apiResp.serialize() // {"errors": [{code: "UNKNOWN", message: "detailed stack trace...."}]}

```

#### Add customized error

```
let apiResp = new APIResponse()
APIResponse.addError({code: "BAD_REQUEST", message: "bad request"})
apiResp.serialize() // {"errors": [{code: "BAD_REQUEST", message: "bad request"}]}
```

#### AWS API Gateway Response
```
const APIResponse = require('@repercept/api-response')

let apiResp = new APIResponse()
APIResponse.data = {"status": "ok"}
apiResp.apiGateway().serialize(200, {"accept": "appliation/json"})
// {statusCode: 200, body: "{\"status\": \"ok\"}", headers: {"accept": "appliation/json"}}

```

If you want to return html content
```
const APIResponse = require('@repercept/api-response')

let apiResp = new APIResponse()
APIResponse.data = "<html>"
apiResp.apiGateway().serialize(200, {"Content-Type": "text/html"})
// {statusCode: 200, body: "<html>", headers: {"accept": "appliation/json"}}

```

## API Reference

## Classes

<dl>
<dt><a href="#APIResponse">APIResponse</a></dt>
<dd><p>Class APIResponse constructor</p>
</dd>
<dt><a href="#APIGatewayResponse">APIGatewayResponse</a></dt>
<dd><p>Class APIGatewayResponse constructor</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#APIError">APIError</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#APISuccessListResponse">APISuccessListResponse</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#APISuccessResponse">APISuccessResponse</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#APIErrorResponse">APIErrorResponse</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="APIResponse"></a>

## APIResponse
Class APIResponse constructor

**Kind**: global class  

* [APIResponse](#APIResponse)
    * [.addError(err)](#APIResponse+addError) ⇒ [<code>APIResponse</code>](#APIResponse)
    * [.apiGateway()](#APIResponse+apiGateway) ⇒ [<code>APIGatewayResponse</code>](#APIGatewayResponse)
    * [.serialize()](#APIResponse+serialize) ⇒ [<code>APIErrorResponse</code>](#APIErrorResponse) \| [<code>APISuccessListResponse</code>](#APISuccessListResponse) \| [<code>APISuccessResponse</code>](#APISuccessResponse)

<a name="APIResponse+addError"></a>

### apiResponse.addError(err) ⇒ [<code>APIResponse</code>](#APIResponse)
Add an error object to the api response

**Kind**: instance method of [<code>APIResponse</code>](#APIResponse)  

| Param | Type | Description |
| --- | --- | --- |
| err | <code>Error</code> \| [<code>APIError</code>](#APIError) | The handcrafted error object or nodejs native Error object |

<a name="APIResponse+apiGateway"></a>

### apiResponse.apiGateway() ⇒ [<code>APIGatewayResponse</code>](#APIGatewayResponse)
returns an instance of APIGatewayResponse

**Kind**: instance method of [<code>APIResponse</code>](#APIResponse)  
<a name="APIResponse+serialize"></a>

### apiResponse.serialize() ⇒ [<code>APIErrorResponse</code>](#APIErrorResponse) \| [<code>APISuccessListResponse</code>](#APISuccessListResponse) \| [<code>APISuccessResponse</code>](#APISuccessResponse)
serialize the api response to a json object

**Kind**: instance method of [<code>APIResponse</code>](#APIResponse)  
<a name="APIGatewayResponse"></a>

## APIGatewayResponse
Class APIGatewayResponse constructor

**Kind**: global class  

* [APIGatewayResponse](#APIGatewayResponse)
    * [new APIGatewayResponse(apiResponse)](#new_APIGatewayResponse_new)
    * [.serialize(statusCode, headers)](#APIGatewayResponse+serialize)

<a name="new_APIGatewayResponse_new"></a>

### new APIGatewayResponse(apiResponse)

| Param | Type |
| --- | --- |
| apiResponse | [<code>APIResponse</code>](#APIResponse) | 

<a name="APIGatewayResponse+serialize"></a>

### apiGatewayResponse.serialize(statusCode, headers)
serialize the api response to a json object which will be used by AWS API Gateway

**Kind**: instance method of [<code>APIGatewayResponse</code>](#APIGatewayResponse)  

| Param | Type |
| --- | --- |
| statusCode | <code>number</code> | 
| headers | <code>Object</code> | 

<a name="APIError"></a>

## APIError : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| code | <code>string</code> | The code of the error |
| message | <code>string</code> | The description of the error |

<a name="APISuccessListResponse"></a>

## APISuccessListResponse : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| items | <code>Array</code> | A list of items to return |

<a name="APISuccessResponse"></a>

## APISuccessResponse : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| item | <code>Object</code> | An item to return |

<a name="APIErrorResponse"></a>

## APIErrorResponse : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| errors | <code>Array</code> | Contains a list of API Errors |

