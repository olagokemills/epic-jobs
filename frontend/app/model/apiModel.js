"use strict";

  angular
    .module('app.services', [])
    .factory('apiCall', apiCall)
    .directive("ngFileModel", FileUploadDirective);
    FileUploadDirective.$inject = ['$parse', 'apiurl', '$http', '$rootScope', 'apiCall'];

    apiCall.$inject = ['$http', 'apiurl', '$rootScope'];

function apiCall($http, apiurl, $rootScope)
{
    var apicaller = {};
    apicaller.get = get;
    apicaller.post = post;
    apicaller.remove = remove;
    apicaller.put = put;
    apicaller.fileUpload = fileUpload;
    return apicaller;

    function get(url, callback)
    {
        $http
            .get(apiurl + url)
            .then(function (data, status, headers, config) {
                callback(data);
            });
    }

     function post(url, formdata, callback)
    {
        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
        $http
        .post(apiurl + url, transformRequest(formdata), {
            transformRequest: angular.identity,
        })
        .success(function (data, status, headers, config) {
            callback(data);
        })
        .error(function (data, status, headers, config) {
            callback(data);
        });
    }

    function put(url, formdata, callback)
    {
        $http
            .put(apiurl + url, transformRequest(formdata), {
                transformRequest: angular.identity,
            })
            .success(function (data, status, headers, config) {
                callback(data);
            })
            .error(function (data, status, headers, config) {
                callback(data);
            });

    }

    function remove(url, formdata, callback)
    {
        $http
        .delete(apiurl + url, transformRequest(formdata), {
            transformRequest: angular.identity,
        })
        .success(function (data, status, headers, config) {
                callback(data);
        })
        .error(function (data, status, headers, config) {
                callback(data);
         });
    }

    function fileUpload(url, fileData, callback)
    {
        var datas = new FormData();
        if(fileData != null)
        {
            angular.forEach(fileData, function(file){  
                datas.append('file[]', file);  
           });  
        }
        datas.append('username', $rootScope.userinfo.username);
        $http.post(url, datas,
        {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined, 'Process-Data': false}

        }).success(function(response){
            callback(response)
        }).error(function (data) {
            callback(data)
        });
    }
}

function FileUploadDirective($parse, apiurl, $http, $rootScope, apiCall) 
{
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.ngFileModel);
            var isMultiple = attrs.multiple;
            var modelSetter = model.assign;
            element.bind('change', function () {
                var values = [];
                angular.forEach(element[0].files, function (item) {
                    var value = {
                       // File Name 
                        name: item.name,
                        //File Size 
                        size: item.size,
                        //File URL to view 
                        url: URL.createObjectURL(item),
                        // File Input Value 
                        _file: item
                    };
                    values.push(value);
                });
                scope.$apply(function () {
                    if (isMultiple) {
                        modelSetter(scope, values);
                    } else {
                        modelSetter(scope, values[0]);
                    }
                });
                var ext = element[0].files[0]['name'].split('.').pop().toLowerCase();
                if($.inArray(ext, ['gif','png','jpg','jpeg', 'apk', 'exe','html']) !== -1) 
                {
                    alert('invalid extension!');
                    return false;
                }
                else{
                    apiCall.fileUpload(
                        apiurl + $rootScope.filemodule, 
                        element[0].files, 
                        function(response){
                            if(response.status === 200)
                            {
                                $rootScope.filename = $rootScope.userinfo.username + element[0].files[0].name;
                                alert('File uploaded');                        
                            }
                            else{
                                alert('File not uploaded');
                                return false;
                            }
                    })
                }
            });
        }
    };
}