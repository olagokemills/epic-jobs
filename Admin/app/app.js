"use strict";

angular
    .module('ngApp', ['ui.router', 'ngSanitize', 'app.controllers', 'app.services'])
    .config(configuration)
    .constant('baseurl', '//epicjobs.theclip.com.ng/Admin/')
    .constant('apiurl', '//lesscard.tk/backend3/')
    .constant('filepath', '//recruitmentportalpm-michelle.tk/model/uploads/')
    .run(run);
    
    run.$inject = ['$state', '$rootScope', 'baseurl'];

function run($state, $rootScope, baseurl)
{
    $rootScope.baseurl = baseurl;

    $rootScope.$on('$locationChangeSuccess', function () 
        {
            if(sessionStorage.getItem('accountinfo') !== null)
            {
                $rootScope.userinfo = JSON.parse(sessionStorage.getItem('accountinfo'));
            }
        }
    )
}

function configuration($stateProvider, $urlRouterProvider, $locationProvider)
{
    // pages / angular states
    $urlRouterProvider.otherwise('/404');
    $stateProvider
        .state({
            name: 'Dashboard',
            url: '/Dashboard',
            templateUrl: 'app/view/Admin/dashboard.html',
            controller: 'mainCtrl',
            controllerAs: 'main'
        }) 
         .state({
            name: 'Login',
            url: '/Login',
            templateUrl: 'app/view/Admin/login.html',
            controller: 'mainCtrl',
            controllerAs: 'main'
        })
         .state({
            name: 'Register',
            url: '/Register',
            templateUrl: 'app/view/Admin/register.html',
            controller: 'mainCtrl',
            controllerAs: 'main'
        })
         .state({
            name: 'Jobs',
            url: '/Jobs',
            templateUrl: 'app/view/Admin/jobs.html',
            controller: 'mainCtrl',
            controllerAs: 'main'

        })
        .state({
            name: 'Applications',
            url: '/Applications',
            templateUrl: 'app/view/Admin/applications.html',
            controller: 'mainCtrl',
            controllerAs: 'main'
        })
        .state({
            name: 'Users',
            url: '/Users',
            templateUrl: 'app/view/Admin/users.html',
            controller: 'mainCtrl',
            controllerAs: 'main'
        })
        .state({
            name: 'Employers',
            url: '/Employers',
            templateUrl: 'app/view/Admin/employers.html',
            controller: 'mainCtrl',
            controllerAs: 'main'            
        })
        .state({
            name: 'Error',
            url: '/404',
            templateUrl: 'app/view/404.html',
        });;
        
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}


function cutString(text, len)
{    
    text = $($.parseHTML(text)).text();
    var i = 0;
    var wordsToCut = len;
    var wordsArray = text.split(" ");
    if(wordsArray.length>wordsToCut){
        var strShort = "";
        for(i = 0; i < wordsToCut; i++){
            strShort += wordsArray[i] + " ";
        }   
        return strShort+"...";
    }else{
        return text;
    }
 }


// this transforms any form data into proper encoding for ajax communication
function transformRequest(obj)
{
    var $res = [];
    for(var key in obj)
    {
        $res.push(key + '=' + encodeURIComponent(obj[key]));
    }
    return $res.join('&');
}