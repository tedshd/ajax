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
        if (setting.method === 'GET' && data) {
            url = url + '?' + formUrlEncode(data);
        }

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

        // handle IE8 IE9 CORS
        if (navigator.userAgent.search('MSIE 8') > 0 || navigator.userAgent.search('MSIE 9') > 0) {
            var host = location.host,
                matchUrl = url.replace('https://', '').replace('http://', '');
                matchUrl = matchUrl.slice(0, matchUrl.indexOf('/'));
            if (url.indexOf('//') === 0 || matchUrl !== host) {
                var xdr = new XDomainRequest();
                xdr.open(method, url);
                xdr.onprogress = function () {
                    console.log('progress');
                };
                xdr.ontimeout = function () {
                    console.log('timeout');
                };
                xdr.onerror = function () {
                    console.log('error');
                };
                xdr.onload = function() {
                    console.log('onload');
                    success(JSON.parse(xdr.responseText));
                };
                console.log(formUrlEncode(data));
                setTimeout(function () {
                    xdr.send();
                }, 0);

                return;
            }
        }

        xhr = new XMLHttpRequest();
        xhr.open(method, url);
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
    }

    window.ajax = ajax;
})();
