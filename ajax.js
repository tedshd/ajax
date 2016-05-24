/**
 *
 * @authors Ted Shiu (ted@gmail.com)
 * @date    2016-04-11 14:44:03
 */

(function() {
    function ajax(option) {
        var setting, method, url, data, xhr, success;
        if (option) {
            setting = option;
        } else {
            return console.error('not set arguments');
        }
        if (setting.method) {
            method = setting.method;
        } else {
            return console.error('not set method');
        }
        if (setting.url) {
            url = setting.url;
        } else {
            return console.error('not set url');
        }
        if (setting.success) {
            success = setting.success;
        } else {
            return console.error('not set success callback');
        }
        data = setting.data || '';
        xhr = new XMLHttpRequest();
        if (setting.method === 'GET' && data) {
            url = url + '?' + formUrlEncode(data);
        }
        xhr.open(method, url, true);
        if (setting.withCredentials) {
            xhr.withCredentials = true;
        }
        if (setting.method !== 'GET') {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        xhr.send(formUrlEncode(data));
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var response;
                    switch (setting.response) {
                        case 'json':
                            response = JSON.parse(xhr.responseText);
                            break;
                        case 'xml':
                            response = xhr.responseXML;
                            break;
                        default:
                            response = JSON.parse(xhr.responseText);
                            break;
                    }
                    success(response);
                } else {
                    if (setting.error) {
                        setting.error(xhr.status);
                    } else {
                        return console.error('xhr.status', xhr.status);
                    }
                }
            }
        };
        function formUrlEncode(obj) {
            if (!obj) {
                return '';
            }
            var urlData = '';
            for (var x in obj) {
                urlData = urlData + x + '=' + obj[x] + '&';
            }
            urlData = urlData.substr(0, (urlData.length - 1));
            return urlData;
        }
    }
    window.ajax = ajax;
})();
