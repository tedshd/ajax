[![GitHub release](https://img.shields.io/github/release/tedshd/ajax.svg)](https://github.com/tedshd/ajax)

[![GitHub tag](https://img.shields.io/github/tag/tedshd/ajax.svg)](https://github.com/tedshd/ajax)

# ajax
A pure javascript libary handle ajax behaivor

## Usage

```javascript
ajax({
    method: 'POST',
    url: 'json.php',
    data: {
        user: 'TED'
    },
    response: 'json',
    success: function (data) {
        console.log(data);
    },
    error: function(status, data) {
        // status = http status
        // do something
    }
});
// or
var ajaxData = new ajax({
    method: 'POST',
    url: 'json.php',
    data: {
        user: 'TED'
    },
    response: 'json',
    success: function (data) {
        console.log(data);
    },
    error: function(status, data) {
        // status = http status
        // do something
    }
});
```

And some example in `index.html`

## Feature

* Handle CORS with cookie(withCredentials) (IE 10+)

* Handle IE8 CORS(XDomainRequest)

* Handle response XML format

* Not handle IE8 IE9 CORS with cookie(Native browser not support)

* Support set header

    * If you want to check ajax in server side

    * you can use code like `xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');`

* Support Browser

    * Chrome

    * Firefox

    * Safari

    * IE8+

    * Microsoft Edge

## Arguments

It is json type object

|key|type|required|value|description|example|
|---|---|---|---|---|---|
|method|string|required|'POST', 'GET', 'DELETE', 'PUT', 'OPTION', 'PATH'| http request method|'GET'|
|url|string|required|'url'|url you request|'json.php'|
|data|object|no|{user: 'ted', age: '12'}|the arguments want request|{user: 'ted', age: '12'}|
|body|string|no|'form', 'json'|request body format, default is form  & form is use x-www-form-urlencoded, json use json|'json'|
|withCredentials|boolean|no|true, false|cross domain request with cookie, use it|true|
|setRequestHeader|object|no|{'X-Requested-With': 'XMLHttpRequest'}|ajax with custom header|{'X-Requested-With': 'XMLHttpRequest','X-Token': 'HAHA'}|
|response|string|no|'json', 'xml'|response type is JSON or XML, default no set is JSON|'xml'|
|success|function|required|function(data) {console.log(data);}|handle response success|function(data) {console.log(data);}|
|error|function|required|function(data) {console.log(data);}|handle response error|function(data) {console.log(data);}|
