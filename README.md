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
    error: function(data) {
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
    error: function(data) {
        // do something
    }
});
```

## Arguments

It is json type object

|key|type|required|value|description|example|
|---|---|---|---|---|---|
|method|string|required|'POST', 'GET', 'DELETE', 'PUT', 'OPTION', 'PATH'| http request method|'GET'|
|url|string|required|'url'|url you request|'json.php'|
|data|object|no|{user: 'ted', age: '12'}|the arguments want request|{user: 'ted', age: '12'}|
|withCredentials|boolean|no|true, false|cross domain request with cookie, use it|true|
|response|string|no|'json', 'xml'|response type is JSON or XML, default no set is JSON|'xml'|
|success|function|required|function(data) {console.log(data);}|handle response success|function(data) {console.log(data);}|
|error|function|required|function(data) {console.log(data);}|handle response error|function(data) {console.log(data);}|
