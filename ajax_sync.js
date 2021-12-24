/**
 *
 * @authors Ted Shiu (ted@gmail.com)
 * @date    2016-04-11 14:44:03
 * source https://github.com/tedshd/ajaxSync
 */

(function() {
    function ajaxSync(option) {
        function isEmpty(obj) {
            for (var x in obj) {
                if (obj.hasOwnProperty(x)) {
                    return false;
                }
            }
           return true;
        }
        var setting, method, url, data, xhr;
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
        data = setting.data || '';
        if (setting.method === 'GET' && data && !isEmpty(data)) {
            url = url + '?' + formUrlEncode(data);
        }

        function formUrlEncode(obj) {
            if (!obj) {
                return '';
            }
            var urlData = '';
            for (var x in obj) {
                urlData = urlData + x + '=' + encodeURIComponent(obj[x]) + '&';
            }
            urlData = urlData.substr(0, (urlData.length - 1));
            return urlData;
        }

        return new Promise((resolve, reject) => {
            xhr = new XMLHttpRequest();
            xhr.open(method, url);
            if (setting.setRequestHeader) {
                for (var key in setting.setRequestHeader) {
                    xhr.setRequestHeader(key, setting.setRequestHeader[key]);
                }
            }
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
                        resolve(response);
                    } else {
                        reject({
                            status: xhr.status,
                            message: JSON.parse(xhr.responseText)
                        });
                    }
                }
            };
        });
    }

    window.ajaxSync = ajaxSync;
})();
